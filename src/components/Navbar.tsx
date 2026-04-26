import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { assetUrl } from "../utils/assetUrl";
import Lenis from "lenis";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

type Smoother = {
  scrollTop: (value: number) => void;
  scrollTo: (target: string, smooth?: boolean, position?: string) => void;
  paused: (value: boolean) => void;
};

export let smoother: Smoother;

const Navbar = () => {
  const homeHref = `${assetUrl("")}#`;
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2, 
      lerp: 0.1,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Map the global 'smoother' object to Lenis methods
    smoother = {
      scrollTop: (value: number) => {
        lenis.scrollTo(value, { immediate: true });
      },
      scrollTo: (target: string, _smooth?: boolean, _position?: string) => {
        lenis.scrollTo(target);
      },
      paused: (val: boolean) => {
        if (val) lenis.stop();
        else lenis.start();
      },
    };

    // Initial state
    smoother.scrollTop(0);
    smoother.paused(false);

    const links = document.querySelectorAll(".header ul a");
    const clickHandlers: Array<{ element: HTMLAnchorElement; handler: (e: Event) => void }> = [];

    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      const clickHandler = (e: Event) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const target = e.currentTarget as HTMLAnchorElement;
          const section = target.getAttribute("data-href");
          if (!section) return;
          smoother.scrollTo(section);
        }
      };

      element.addEventListener("click", clickHandler);
      clickHandlers.push({ element, handler: clickHandler });
    });

    const onResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", onResize);

    return () => {
      clickHandlers.forEach(({ element, handler }) => {
        element.removeEventListener("click", handler);
      });
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href={homeHref} className="navbar-title" data-cursor="disable">
          AM
        </a>
        <a
          href="mailto:abirmondal8926@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          abirmondal8926@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>

          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
