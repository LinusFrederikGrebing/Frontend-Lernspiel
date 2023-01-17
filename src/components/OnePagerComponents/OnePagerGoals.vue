<template>
  <v-container class="content-section">
    <v-card elevation="24" outlined shaped height="5em" class="header">
      <h1 class="h1 font-weight-black">- Lernziele -</h1>
    </v-card>
    <v-card elevation="10" outlined :height="height">
      <div :class="[{'flex_container' : !$vuetify.breakpoint.lgAndDown}]" v-for="(item, index) in items" :key="index">
        <div :class="[{'seccontainer' : !$vuetify.breakpoint.lgAndDown}]" >
          <div :id="'section' + index" :class="[{'section' : !$vuetify.breakpoint.lgAndDown}]" class="">
            <img class="mr-auto ml-auto d-block mt-8 rund item" :src="item.img" width="200px" alt="" />
            <v-card
              elevation="24"
              outlined
              shaped
              :class="[
                { text_xs: $vuetify.breakpoint.lgAndDown},  { text: !$vuetify.breakpoint.lgAndDown},
                { left: index % 2 === 0 && !$vuetify.breakpoint.lgAndDown}, {'mobile_right' : $vuetify.breakpoint.lgAndDown},
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
  name: "OnePagerGoals",
  components: {

  },
  methods: {
  },
  data() {
    return {
      items: [
        {
          title: "Programmierskills",
          text: "Mit DrawIT kannst du du Programmierungsskills in der Skriptsprache JavaScript vertiefen und deine Programmierungskenntnisse erweitern!",
          img: require("../../assets/programmierung.png"),
        },
        {
          title: 'Genauigkeit',
          text: 'Es gibt mehrere eingefärbte Kästchen auf dem Kachelfeld. Dein Ziel ist es diese Form präzise nachzubauen.',
          img: require("../../assets/genauigkeit.png"),
        },
        {
          title: 'Analytisches Denkvermögen',
          text: 'Es sind "nur" einige Kästchen die ein Problem darstellen, aber es gibt einen Haufen Lösungen um an das Ziel zu gelangen!',
          img: require("../../assets/analytischesdenken.png"),
        },
        {
          title: 'Problemlösungskompetenz',
          text: 'Der einfachste Weg ist nicht immer der Beste! Gebe dich nicht mit einer simplen Lösung für ein Problem zufrieden.',
          img: require("../../assets/problemlösung.png"),
        },
      ],
    };
  },
  mounted() {
    let start = 0;
    for (let i = 0; i < this.items.length; i++) {
      let element = document.getElementById("section" + i);
      if (i % 2 === 0) {
        start = -500;
      } else {
        start = 500;
      }
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
    }
  },
  computed: {
      height () {
        console.log(this.$vuetify.breakpoint.name);
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
  .header {
    padding-bottom: 5em;
  }
  .sec {
    background: rgba(255, 255, 255, 0); /*  40% opaque green */
  }
  h1,
  p {
    color: black;
  }
  .seccontainer {
    text-align: center;
    margin-top: 1.5em;
  }

  .text {
    width: 40em;
    padding: 2em;
    position: absolute;
    top: 1em;
  }
  .text_xs {
    padding: 2em;
    top: 1em;
  }

  .section {
    display: inline-block;
    position: relative;
    width: 40em;
  }
  .left {
    right: 28em;
  }
  .right {
    right: -28em;
  }

  .mobile_right{
    right: 0em;
  }

  .item {
    background-color: #4a5c66;
    padding: 2em;
  }

  .rund {
    border-radius: 200px;
    -moz-border-radius: 200px;
    -webkit-border-radius: 200px;
  }

</style>