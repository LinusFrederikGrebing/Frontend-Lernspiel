<template>
  <v-parallax
    class="no-padding"
    :height="height"
    :src="`${require(`@/assets/Hexagon4.svg`)}`"
  >
    <header id="start" class="pt-12">
      <OnePagerWhy />
    </header>
    <svg class="arrows">
      <path class="a1" d="M0 0 L30 30 L60 0"></path>
      <path class="a2" d="M0 15 L30 45 L60 15"></path>
      <path class="a3" d="M0 30 L30 60 L60 30"></path>
    </svg>
    <main>
      <div id="lvl_select" class="pt-16 mt-16 mb-16">
        <LevelSelect />
      </div>
      <div id="tutorial" class="pt-16 mt-16 mb-16">
        <div id="popupContainer" class="test">
          <img id="mouse-cursor-op" src="../assets/mouse-cursor.png" />
          <OnePagerTutorialSection />
        </div>
        <img id="alert-for-op-tutorial" src="../assets/successpopup.png" />
      </div>
      <div id="goals" class="pt-16 mt-16 mb-16">
        <OnePagerGoals />
      </div>
      <div id="help_template" class="pt-16 mt-16">
        <div :class="[{ desktop_invisible: $vuetify.breakpoint.mdAndDown }]">
          <HelpTemplateDesktop />
        </div>
        <div :class="[{ desktop_invisible: $vuetify.breakpoint.lgAndUp }]">
          <HelpTemplateMobile />
        </div>
      </div>
    </main>
  </v-parallax>
</template>

<script>
import OnePagerTutorialSection from "@/components/OnePagerComponents/OnePagerTutorialSection";
import OnePagerTryMe from "@/components/OnePagerComponents/OnePagerTryMe";
import OnePagerGoals from "@/components/OnePagerComponents/OnePagerLearningGoals";
import OnePagerWhy from "@/components/OnePagerComponents/OnePagerWhy";
import LevelSelect from "@/components/OnePagerComponents/LevelSelect";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import HelpTemplateMobile from "@/components/HelpComponents/HelpTemplateMobile";
import HelpTemplateDesktop from "@/components/HelpComponents/HelpTemplateDesktop";
import levels from "../../data/levels.json";

// Register the ScrollTrigger plugin for GSAP
gsap.registerPlugin(ScrollTrigger);
export default {
  name: "Onepager",
  // Declare the components used in this component
  components: {
    HelpTemplateMobile,
    HelpTemplateDesktop,
    OnePagerTutorialSection,
    OnePagerTryMe,
    OnePagerWhy,
    LevelSelect,
    OnePagerGoals,
  },
  // Initialize an empty array to store the levels
  data: () => ({
    levels: [],
  }),
  methods: {
    // Scroll to the element with the given id
    scrollToElement(elementId) {
      // Get the element by its id
      let element = document.getElementById(elementId);
      // If the element exists, scroll to it smoothly
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    // Check the route and scroll to the appropriate section
    checkRoute(section) {
      // Object containing the element ids for each section
      const elementIds = {
        help: "help_template",
        lvl: "lvl_select",
        tutorial: "tutorial",
        goals: "goals",
      };

      // Get the element id for the current section, or default to "start"
      const elementId = elementIds[section] || "start";
      // Scroll to the element after a delay of 300ms
      setTimeout(() => {
        this.scrollToElement(elementId);
      }, 600);
    },
  },
  // Watch for changes in the route and call the checkRoute method
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler(route) {
        if (route.query.section) {
          this.checkRoute(route.query.section);
        }
      },
    },
  },
  mounted() {
    // Check local storage for levels, otherwise set them to the default values
    if (localStorage.getItem("levels") !== null) {
      this.levels = JSON.parse(localStorage.getItem("levels"));
    } else {
      this.levels = Object.values(Object.values(levels)[0]);
    }
    // Store the levels in local storage
    localStorage.setItem("levels", JSON.stringify(this.levels));

    // Use GSAP library to animate the lvl_select element
    gsap.fromTo(
      "#lvl_select",
      {
        y: 0,
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
  },
  computed: {
    // Compute the height value based on the current breakpoint
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 7200;
        case "sm":
          return 7100;
        case "md":
          return 7000;
        case "lg":
          return 5900;
        case "xl":
          return 5340;
      }
    },
  },
};
</script>
<style scoped>
/* CSS only for OnePager-Template */
/* CSS for Arrow-Animation in OnePager */
.arrows {
  width: 60px;
  position: relative;
  left: 50%;
  margin-left: -30px;
  bottom: 20px;
}
.arrows path {
  stroke: #80ba24;
  fill: transparent;
  stroke-width: 5px;
  animation: arrow 2s infinite;
  -webkit-animation: arrow 2s infinite;
}
.test {
  filter: blur(5px) brightness(90%);
}
@keyframes arrow {
  0% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  80% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
@-webkit-keyframes arrow {
  0% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  80% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
.arrows path.a1 {
  animation-delay: -2s;
  -webkit-animation-delay: -1s;
}
.arrows path.a2 {
  animation-delay: -1s;
  -webkit-animation-delay: -0.5s;
}
.arrows path.a3 {
  animation-delay: 0s;
  -webkit-animation-delay: 0s;
}

#mouse-cursor-op {
  position: absolute;
  height: 3vh;
  width: 3vh;
  visibility: hidden;
  z-index: 20;
}

#alert-for-op-tutorial {
  position: absolute;
  height: auto;
  width: 30em;
  visibility: visible;
  z-index: 20;
  margin-top: -50em;
  border: 1em;
  border-width: 1em;
  border-color: black;
}
</style>