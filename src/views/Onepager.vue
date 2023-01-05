<template>
  <div>
    <OnePagerLearningGoals />
      <!-- <OnePagerIntroduction /> -->
     <OnePagerTryMe />
     <OnePagerTutorialSection />
     <LevelSelect />
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