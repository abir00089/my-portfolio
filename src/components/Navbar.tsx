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
    const isMobile = window.innerWidth <= 1024;
    let lenis: Lenis | null = null;

    if (!isMobile) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
      });

      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis?.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    }

    // Map the global 'smoother' object to Lenis or Native methods
    smoother = {
      scrollTop: (value: number) => {
        if (lenis) lenis.scrollTo(value, { immediate: true });
        else window.scrollTo(0, value);
      },
      scrollTo: (target: string, _smooth?: boolean, _position?: string) => {
        if (lenis) lenis.scrollTo(target);
        else {
          const el = document.querySelector(target);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
      },
      paused: (val: boolean) => {
        if (lenis) {
          if (val) lenis.stop();
          else lenis.start();
        }
      },
    };

    // Initial state
    if (!isMobile) {
      smoother.scrollTop(0);
      smoother.paused(true);
    }

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
