import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const characterRef = useRef<THREE.Object3D | null>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (canvasDiv.current) {
      let rect = canvasDiv.current.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.devicePixelRatio <= 1.5,
        powerPreference: "high-performance",
      });

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(container.width, container.height);

      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;

      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);

      camera.near = 0.1;
      camera.far = 1000;

      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();
      let tabActive = !document.hidden;

      const light = setLighting(scene);
      let progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      let isMounted = true;

      const resizeHandler = () => {
        if (characterRef.current) {
          handleResize(renderer, camera, canvasDiv, characterRef.current);
        }
      };

      loadCharacter().then((gltf) => {
        if (!isMounted) return;

        if (gltf) {
          const animations = setAnimations(gltf);
          hoverDivRef.current &&
            animations.hover(gltf, hoverDivRef.current);

          mixer = animations.mixer;

          let character = gltf.scene;
          characterRef.current = character;
          scene.add(character);

          headBone = character.getObjectByName("spine006") || null;
          screenLight =
            character.getObjectByName("screenlight") || null;

          progress.loaded().then(() => {
            // Reduced delay for a snappier feel
            setTimeout(() => {
              light.turnOnLights();
              animations.startIntro();
            }, 300);
          });

          window.addEventListener("resize", resizeHandler);
        }
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      // Optimized mouse move with requestAnimationFrame
      let mouseFrameId: number;
      const onMouseMove = (event: MouseEvent) => {
        if (mouseFrameId) cancelAnimationFrame(mouseFrameId);
        mouseFrameId = requestAnimationFrame(() => {
          handleMouseMove(event, (x, y) => (mouse = { x, y }));
        });
      };
      
      const onVisibilityChange = () => {
        tabActive = !document.hidden;
      };

      let debounce: number | undefined;
      let touchTarget: HTMLElement | null = null;
      
      const onTouchMove = (e: TouchEvent) => {
        if (mouseFrameId) cancelAnimationFrame(mouseFrameId);
        mouseFrameId = requestAnimationFrame(() => {
          handleTouchMove(e, (x, y) => (mouse = { x, y }));
        });
      };

      const onTouchStart = (event: TouchEvent) => {
        touchTarget = event.target as HTMLElement;
        debounce = setTimeout(() => {
          touchTarget?.addEventListener("touchmove", onTouchMove);
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("visibilitychange", onVisibilityChange);

      const landingDiv = document.getElementById("landingDiv");

      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }

      let frameId: number;

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        if (!tabActive) return;

        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );

          light.setPointLight(screenLight);
        }

        const delta = clock.getDelta();

        if (mixer) {
          mixer.update(delta);
        }

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        isMounted = false;

        cancelAnimationFrame(frameId);
        cancelAnimationFrame(mouseFrameId);
        clearTimeout(debounce);

        // Deeper cleanup for better performance
        scene.traverse((object: any) => {
          if (object.isMesh) {
            object.geometry.dispose();
            if (object.material.isMaterial) {
              cleanMaterial(object.material);
            } else {
              for (const material of object.material) {
                cleanMaterial(material);
              }
            }
          }
        });

        function cleanMaterial(material: any) {
          material.dispose();
          for (const key of Object.keys(material)) {
            if (material[key] && typeof material[key].dispose === "function") {
              material[key].dispose();
            }
          }
        }

        scene.clear();
        renderer.dispose();

        window.removeEventListener("resize", resizeHandler);

        if (canvasDiv.current) {
          canvasDiv.current.removeChild(renderer.domElement);
        }

        if (landingDiv) {
          document.removeEventListener("mousemove", onMouseMove);
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
        document.removeEventListener("visibilitychange", onVisibilityChange);
        touchTarget?.removeEventListener("touchmove", onTouchMove);
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
