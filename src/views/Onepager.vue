<template>
  <div>
    <OnePagerLearningGoals />
      <!-- <OnePagerIntroduction /> -->
     <OnePagerTryMe />
     <OnePagerTutorialSection />
     <hr class="divider">
     <h1  class="header">Level-Auswahl:</h1>
     <hr class="divider">
     <LevelSelect />
     <OnePagerTutorialSection />
     <hr class="divider">
     <h1 class="header">Hilfen:</h1>
     <hr class="divider">
     <HelpTemplateNew />

  </div>
</template>

<script>
import OnePagerIntroduction from "@/components/OnePagerIntroduction";
import OnePagerTutorialSection from "@/components/OnePagerTutorialSection";
import OnePagerTryMe from "@/components/OnePagerTryMe";
import OnePagerLearningGoals from "@/components/OnePagerLearningGoals";
import HelpTemplateNew from "@/components/HelpTemplateNew";
import LevelSelect from "@/views/LevelSelect";

export default {
  name: "Onepager",
  components: {
    OnePagerTutorialSection,
    OnePagerTryMe,
    OnePagerIntroduction,
    OnePagerLearningGoals,
    HelpTemplateNew,
    LevelSelect
  },
}
</script>
<style scoped>
.header{
  margin: 1em 2em;
  color: black;
}
.divider {
  opacity: 1;
  border-radius: 100%;
  background-color: rgba(128, 186, 36, 1);
}
</style>