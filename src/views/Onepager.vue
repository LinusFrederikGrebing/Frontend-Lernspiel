<template>
  <div>
    <v-parallax height="2850" :src="`${require(`@/assets/Hexagon3.svg`)}`">
      <div class="test">
        <OnePagerLearningGoals />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <LevelSelect />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />  
        <HelpTemplateNew />
      </div>
    </v-parallax>
  </div>
</template>

<script>
import OnePagerIntroduction from "@/components/OnePagerComponents/OnePagerIntroduction";
import OnePagerTutorialSection from "@/components/OnePagerComponents/OnePagerTutorialSection";
import OnePagerTryMe from "@/components/OnePagerComponents/OnePagerTryMe";
import OnePagerLearningGoals from "@/components/OnePagerComponents/OnePagerLearningGoals";
import HelpTemplateNew from "@/components/HelpComponents/HelpTemplateNew";
import LevelSelect from "@/views/LevelSelect";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default {
  name: "Onepager",
  components: {
    OnePagerTutorialSection,
    OnePagerTryMe,
    OnePagerIntroduction,
    OnePagerLearningGoals,
    HelpTemplateNew,
    LevelSelect,
  },
  mounted() {
    gsap.to(".events", { scrollTrigger: ".events", x: 0, duration: 3 });
  },
};
</script>
<style scoped>
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