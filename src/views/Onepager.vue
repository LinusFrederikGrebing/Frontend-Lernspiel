<template>
  <div class="sec">
    <v-parallax height="5500" :src="`${require(`@/assets/Hexagon3.svg`)}`">
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
    gsap.fromTo(
      ".lvl_select",
      {
        y: 0,
        x: -1900,
        opacity: 0,
      },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: ".lvl_select",
          start: "top 100%",
          end: "bottom 100%",
          scrub: true,
          id: "scrub",
        },
      }
    );

    gsap.from(".help_template", {
      duration: 0.5,
      opacity: 0,
      x: "+50vw",
      ease: "linear",
      scrollTrigger: {
        trigger: ".help_template",
        start: "top 75%",
        end: "bottom 25%",
        toggleActions: "restart complete reverse reset",
      },
    });
  },
};
</script>
<style scoped>
.sec{
  background: rgba(255, 255, 255, 0.7)    /*  40% opaque green */ 
}

.page_section {
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