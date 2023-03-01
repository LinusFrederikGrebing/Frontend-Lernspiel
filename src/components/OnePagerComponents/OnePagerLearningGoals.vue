<template>
  <v-container>
    <v-card elevation="24" outlined shaped height="5em" class="header">
      <h1 class="section_header font-weight-black">
        - {{ $t("navigation.learningGoals") }} -
      </h1>
    </v-card>
    <v-card elevation="10" outlined class="pb-16">
      <div
        :class="[{ flex_container: !$vuetify.breakpoint.lgAndDown }]"
        v-for="(item, index) in items"
        :key="index"
      >
        <div :class="[{ goalscontainer: !$vuetify.breakpoint.lgAndDown }]">
          <div
            :id="'section' + index"
            :class="[{ section: !$vuetify.breakpoint.lgAndDown }]"
          >
            <img
              class="mr-auto ml-auto d-block mt-8 rund item"
              :src="item.img"
              width="200px"
              alt=""
            />
            <v-card
              elevation="24"
              outlined
              shaped
              :class="[
                textClass,
                { left: index % 2 === 0 && !$vuetify.breakpoint.lgAndDown },
                { mobile_right: $vuetify.breakpoint.lgAndDown },
                { right: index % 2 !== 0 && !$vuetify.breakpoint.lgAndDown },
              ]"
            >
              <h2 v-text="item.title"></h2>
              <p v-text="item.text"></p>
            </v-card>
          </div>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import gsap from "gsap";

export default {
  name: "OnePagerLearninggGoals",
  data() {
    return {
      items: this.setItemContent(),
    }
  },
  // watch the language and reinitialize content items when language changes
  watch: {
    "$i18n.locale": {
      handler() {
        this.items = this.setItemContent();
      },
      deep: true,
    },
  },
  methods: {
    // All informations for the Learning-Goals based on the selected language
    setItemContent(){ 
        return [
            {
              title: this.$t("goals.programmingSkills"),
              text: this.$t("goals.programmingSkillsText"),
              img: require("@/assets/programmierung.png"),
            },
            {
              title: this.$t("goals.accuracy"),
              text: this.$t("goals.accuracyText"),
              img: require("@/assets/genauigkeit.png"),
            },
            {
              title: this.$t("goals.analyticalThinking"),
              text: this.$t("goals.analyticalThinkingText"),
              img: require("@/assets/analytischesdenken.png"),
            },
            {
              title: this.$t("goals.problemSolving"),
              text: this.$t("goals.problemSolvingText"),
              img: require("@/assets/problemlösung.png"),
            },
            {
              title: this.$t("goals.effectiveness"),
              text: this.$t("goals.effectivenessText"),
              img: require("@/assets/effektivicon.png"),
            },
          ];
     }
  },
  mounted() {
    // Loop through each item in the items array
    this.items.forEach((_, i) => {
      // Get the element by its id, which is section${i}
      const element = document.getElementById(`section${i}`);
      // Set the start position of the element based on the index.
      let start = i % 2 === 0 ? -500 : 500;
      gsap.fromTo(
        element,
        {
          y: 0,
          x: start,
          opacity: 0,
        },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            end: "bottom 95%",
            scrub: true,
            id: "scrub",
          },
        }
      );
    });
  },
  computed: {
    breakpoint() {
      // Return the current breakpoint from vuetify
      return this.$vuetify.breakpoint;
    },
    // Return a class based on the current breakpoint
    textClass() {
      if (this.breakpoint.lgAndDown) {
        return "text_xs";
      } else {
        return "text";
      }
    },
  },
};
</script>

<style scoped>
/* CSS only for LearningGoals-Template */
</style>
