<template>
  <v-container>
    <v-card elevation="24" outlined shaped height="5em" class="header">
      <h1 class="section_header font-weight-black">- Lernziele -</h1>
    </v-card>
    <v-card elevation="10" outlined :height="height">
      <div :class="[{'flex_container' : !$vuetify.breakpoint.lgAndDown}]" v-for="(item, index) in items" :key="index">
        <div :class="[{'goalscontainer' : !$vuetify.breakpoint.lgAndDown}]" >
          <div :id="'section' + index" :class="[{'section' : !$vuetify.breakpoint.lgAndDown}]" class="">
            <img class="mr-auto ml-auto d-block mt-8 rund item" :src="item.img" width="200px" alt="" />
            <v-card
              elevation="24"
              outlined
              shaped
              :class="[textClass, { left: index % 2 === 0 && !$vuetify.breakpoint.lgAndDown}, {'mobile_right' : $vuetify.breakpoint.lgAndDown},
                { right: index % 2 !== 0 && !$vuetify.breakpoint.lgAndDown }]"
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
      // all informations for the Learning-Goals
      items: [
        {
          title: "Programmierskills",
          text: "Mit DrawIT kannst Du du Programmierungsskills in der Skriptsprache JavaScript vertiefen und Deine Programmierungskenntnisse erweitern!",
          img: require("../../assets/programmierung.png"),
        },
        {
          title: 'Genauigkeit',
          text: 'In der Programmierung sind nicht nur Programmierskills gefragt. Als Programmierer musst Du genau zuhören und Anforderungen präzise und Gewissenhaft umsetzen können. DrawIT gibt dir Aufgaben vor, die einer präzisen Bearbeitung bedarf!',
          img: require("../../assets/genauigkeit.png"),
        },
        {
          title: 'Analytisches Denkvermögen',
          text: 'Mit DrawIT kannst Du Deine Fähigkeit verbessern, Probleme zu erkennen, in einzelne Teilaspekte zu untergliedern und selbstständig Lösungswege zu finden!',
          img: require("../../assets/analytischesdenken.png"),
        },
        {
          title: 'Problemlösungskompetenz',
          text: 'DrawIT hilft Dir dabei, Deine Fähigkeiten zu steigern, komplexe Problemsituationen oder Schwierigkeiten wahrzunehmen, zu verstehen und anschließend zu lösen. Der einfachste Weg muss nicht immer der geforderte oder beste sein!',
          img: require("../../assets/problemlösung.png"),
        },
      ],
    };
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
      return this.$vuetify.breakpoint
    },
    // Return a class based on the current breakpoint
    textClass() {
      if (this.breakpoint.lgAndDown) {
        return "text_xs"
      } else {
        return "text"
      }
    },
    height () {
      // Return a height based on the current breakpoint
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 2100
          case 'sm': return 1700
          case 'md': return 1650
          case 'lg': return 1600
          case 'xl': return 1100
        }
      },  
  },      
};
</script>

<style scoped>
/* CSS only for LearningGoals-Template */
</style>
