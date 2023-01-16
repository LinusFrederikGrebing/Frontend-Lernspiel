<template>
  <div class="sec">
    <v-parallax :height="height" :src="`${require(`@/assets/Hexagon4.svg`)}`">
      <div>

      
      <div class="learning_goals">
        <OnePagerWhy />
      </div>

      <div class="page_section lvl_select">
        <LevelSelect />
      </div>

      <div class="page_section tutorial">
        <OnePagerTutorialSection />
      </div>

      <div class="page_section goals">
        <OnePagerGoals />
      </div>

      <div class="page_section help_template d-xs-none">
        <HelpTemplateMobile class="d-xs-none" />
      </div>

      <div class="page_section help_template hidden-xs-only">
        <HelpTemplateDesktop class="hidden-xs-only"/>
      </div>
    </div>
    </v-parallax>
  </div>
</template>

<script>
import OnePagerIntroduction from "@/components/OnePagerComponents/OnePagerIntroduction";
import OnePagerTutorialSection from "@/components/OnePagerComponents/OnePagerTutorialSection";
import OnePagerTryMe from "@/components/OnePagerComponents/OnePagerTryMe";
import OnePagerGoals from "@/components/OnePagerComponents/OnePagerGoals";
import OnePagerWhy from "@/components/OnePagerComponents/OnePagerWhy";
import LevelSelect from "@/views/LevelSelect";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import HelpTemplateMobile from "@/components/HelpComponents/HelpTemplateMobile";
import HelpTemplateDesktop from "@/components/HelpComponents/HelpTemplateDesktop";

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
    OnePagerGoals
  },
  mounted() {
    gsap.from(".lvl_select", {
      duration: 0.5,
      opacity: 0,
      x: "-50em",
      ease: "linear",
      scrollTrigger: {
        trigger: ".lvl_select",
          start: "top 100%",
          end: "bottom 100%",
        toggleActions: "restart complete reverse reset",
      },
    });

    gsap.from(".help_template", {
      duration: 0.5,
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
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 5600
          case 'sm': return 5800
          case 'md': return 5800
          case 'lg': return 4900
          case 'xl': return 5000
        }
      },
    },
};
</script>
<style scoped>
.sec{
  background: rgba(255, 255, 255, 0.7)    /*  40% opaque green */ 
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
</style>