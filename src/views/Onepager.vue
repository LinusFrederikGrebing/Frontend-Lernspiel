<template>
  <div class="sec">
    <v-parallax :height="height" :src="`${require(`@/assets/Hexagon4.svg`)}`">
      <div id="start" class="pt-12">
        <OnePagerWhy />
      </div>
      <svg class="arrows">
					<path class="a1" d="M0 0 L30 30 L60 0"></path>
					<path class="a2" d="M0 15 L30 45 L60 15"></path>
					<path class="a3" d="M0 30 L30 60 L60 30"></path>
			</svg>
      <div id="lvl_select" class="pt-16 mt-16 mb-16" >
        <LevelSelect />
      </div>
      <div id="tutorial" class="pt-16 mt-16 mb-16">
        <OnePagerTutorialSection />
      </div>
      <div class="pt-16 mt-16 mb-16">
        <OnePagerGoals />
      </div>
      <div id="help_template" class="pt-8 mt-16">
        <div :class="[{'desktop_invisible' : $vuetify.breakpoint.mdAndDown}]">
            <HelpTemplateDesktop  />
        </div>
        <div :class="[{'desktop_invisible' : $vuetify.breakpoint.lgAndUp}]">
            <HelpTemplateMobile  />
        </div>
      </div>
    </v-parallax>
  </div>
</template>

<script>
import OnePagerIntroduction from "@/components/OnePagerComponents/OnePagerIntroduction";
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

gsap.registerPlugin(ScrollTrigger);
export default {
  name: "Onepager",
  components: {
    HelpTemplateMobile,
    HelpTemplateDesktop,
    OnePagerTutorialSection,
    OnePagerTryMe,
    OnePagerIntroduction,
    OnePagerWhy,
    LevelSelect,
    OnePagerGoals,
    levels: []
  },
 
  methods: {
  scrollToElement(elementId) {
    let element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  },
  checkRoute(section) {
    const elementIds = {
      help: 'help_template',
      lvl: 'lvl_select',
      tutorial: 'tutorial',
    };

    const elementId = elementIds[section] || 'start';
    setTimeout(() => {
      this.scrollToElement(elementId);
    }, 300);
  },
  },
  watch: {
    '$route': {
      immediate: true,
      deep: true,
      handler(route) {
        if (route.query.section) {
          this.checkRoute(route.query.section);
        }
      }
    }
  },
  mounted() {   
    
    if (localStorage.getItem("levels") !== null) {
      this.levels = JSON.parse(localStorage.getItem("levels"));
    } else {
      this.levels = Object.values(Object.values(levels)[0]);
    }
    localStorage.setItem(
        "levels", 
        JSON.stringify(this.levels)
    );
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
            toggleActions: "play reset play reset "
          },
        }
      );

    gsap.from(".help_template", {
      opacity: 0,
      x: "-50em",
      ease: "linear",
      scrollTrigger: {
        trigger: ".help_template",
        start: "top 90%",
        end: "bottom 50%",
        toggleActions: "restart complete reverse reset",
      },
    });
  },
  computed: {
      height () {
        console.log(this.$vuetify.breakpoint.name);
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 6850
          case 'sm': return 6550
          case 'md': return 6650
          case 'lg': return 5650
          case 'xl': return 5250
        }
      },
    },
};
</script>
<style scoped>
.arrows {
	width: 60px;
	position: relative;
	left: 50%;
	margin-left: -30px;
	bottom: 0px;
}

.arrows path {
	stroke: #80ba24;
	fill: transparent;
	stroke-width: 5px;	
	animation: arrow 2s infinite;
	-webkit-animation: arrow 2s infinite; 
}

@keyframes arrow
{
0% {opacity:0}
40% {opacity:1}
80% {opacity:0}
100% {opacity:0}
}

@-webkit-keyframes arrow
{
0% {opacity:0}
40% {opacity:1}
80% {opacity:0}
100% {opacity:0}
}

.arrows path.a1 {
	animation-delay:-2s;
	-webkit-animation-delay:-1s; 
}

.arrows path.a2 {
	animation-delay:-1s;
	-webkit-animation-delay:-0.5s; 
}

.arrows path.a3 {	
	animation-delay:0s;
	-webkit-animation-delay:0s; 
}

.sec{
  background: rgba(255, 255, 255, 0.7)   
}

.header {
  margin: 1em 2em;
  color: black;
}

.divider {
  opacity: 1;
  border-radius: 100%;
  background-color: rgba(128, 186, 36, 1);
}
.v-parallax__image {
  transform: none !important;
  width: 100% !important;
}
  .desktop_invisible {
    display: none !important;
  }
.container {
  max-width: 1900px;
}

</style>