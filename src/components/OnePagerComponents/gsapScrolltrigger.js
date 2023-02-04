// scrollTrigger.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const lvlSelectScrollTrigger = () => {
  // Use GSAP library to animate the lvl_select element
  gsap.fromTo(
    "#lvl_select",
    {
      x: -1000,
      opacity: 0,
    },
    {
      opacity: 1,
      x: 0,
      scrollTrigger: {
        trigger: "#lvl_select",
        start: "top 100%",
        end: "bottom 0%",
        toggleActions: "play reset play reset ",
      },
    }
  );
};

export const helpScrollTrigger = () => {
  // Use GSAP library to animate the help_template element
  gsap.from("#help_template", {
    opacity: 0,
    x: "-50em",
    ease: "linear",
    scrollTrigger: {
      trigger: "#help_template",
      start: "top 90%",
      end: "bottom 50%",
      toggleActions: "restart complete reverse reset",
    },
  });
};

export const tutorialScrollTrigger = () => {
  gsap.fromTo(
    ".tutorial",
    {
      x: 1900,
    },
    {
      duration: 2,
      x: 0,
      scrollTrigger: {
        trigger: ".tutorial",
        start: "top 100%",
        end: "bottom 0%",
        toggleActions: "play reset play reset ",
      },
    }
  );
};

