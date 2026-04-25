import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";
import { assetUrl } from "../../../utils/assetUrl";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(assetUrl("draco/"));
  loader.setDRACOLoader(dracoLoader);

  const applyCharacterTweaks = (gltf: GLTF) => {
    const character = gltf.scene;
    character.traverse((child: any) => {
      if (child.isMesh) {
        const mesh = child as THREE.Mesh;

        if (mesh.material) {
          if (mesh.name === "BODY.SHIRT") {
            const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
            newMat.color = new THREE.Color("#8B4513");
            mesh.material = newMat;
          } else if (mesh.name === "Pant") {
            const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
            newMat.color = new THREE.Color("#000000");
            mesh.material = newMat;
          }
        }

        child.castShadow = true;
        child.receiveShadow = true;
        mesh.frustumCulled = true;
      }
    });

    setCharTimeline(character, camera);
    setAllTimeline();
    character.getObjectByName("footR")?.position.setY(3.36);
    character.getObjectByName("footL")?.position.setY(3.36);
  };

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          assetUrl("models/character.enc?v=2"),
          "MyCharacter12"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        loader.load(
          blobUrl,
          async (gltf) => {
            await renderer.compileAsync(gltf.scene, camera, scene);
            applyCharacterTweaks(gltf);
            resolve(gltf);
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        console.warn("Encrypted character model load failed, using GLB fallback.", err);
        loader.load(
          assetUrl("models/character.glb?v=2"),
          async (gltf) => {
            await renderer.compileAsync(gltf.scene, camera, scene);
            applyCharacterTweaks(gltf);
            resolve(gltf);
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading fallback GLB model:", error);
            reject(error);
          }
        );
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
