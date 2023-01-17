<template>
  <v-container>
    <div class="b/ackground-image"></div>
    <v-row>
      <v-col class="text-center my-8">
        <v-card
            height="8em" 
            elevation="24"
            outlined
            shaped
        ><div class="flex">
            <h2 id="warum" class="text-h1 text-md-h1 text-center my-4">
              Warum 
            </h2>
            <h2 id="draw" class="text-h1 text-md-h1 text-center my-4">
              DrawIT?
            </h2>
        </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
          v-for="(item, index) in items"
          :key="index"
          cols="1"
          xs="1" 
         
          sm="1" 
          md="1"
          class=""
      >79
        <v-card
            :id="'goal'+index"
            style="height: 25em"
            elevation="24"
            outlined
            shaped
            @mouseenter="hoverEnter($event)" @mouseleave="hoverLeave($event)"
        >
          <v-avatar size="100" class="ma-8">
            <v-img :src="item.link"></v-img>
          </v-avatar>
          <div class="title text-uppercase ma-4" v-text="item.title"></div>
          <p v-text="item.text" class="text-caption mx-6"></p>
        </v-card>
        <v-row no-gutters></v-row>
      </v-col>
    </v-row>
    <OnePagerTryMe />
    <v-row no-gutters>
    </v-row>
  </v-container>
</template>

<script src="https://unpkg.com/split-type"></script>
<script>
import OnePagerTryMe from "./OnePagerTryMe";
import gsap from "gsap";

export default {
  name: "OnePagerLearningGoals",
  components: {
    OnePagerTryMe
  },
  methods: {

    hoverEnter(obj) {
      let element = document.getElementById(obj.target.id); 
      gsap.fromTo(
        element,
        {
          scale: 1,
          y: 0,
          x: 0,
        },
        {
          duration: 0.2,
          scale: 1.05,
          y: 0,
          x: 0,
          opacity: 1,
        }
      );
    },
    hoverLeave(obj) {
      let element = document.getElementById(obj.target.id); 
      gsap.fromTo(
        element,
        {
          scale: 1.05,
          y: 0,
          x: 0,
        },
        {
          duration: 0.2,
          scale: 1,
          y: 0,
          x: 0,
          opacity: 1,
        }
      );
    },
  },
  data() {
    return {
      items: [
        {
          title: 'Spielerisches Vertiefen',
          text: 'Draw IT ermöglicht dir einen spaßigen Einstieg in die Programmierwelt. Dadurch wirst du zwar gefordert, allerdings nicht überfordet. Bunte Farben und Rätsel bringen dich immer wieder ins Grübeln!',
          link: require("../../assets/dice_httpswww.pngwing.comenfree-png-pvivu.png"),
        },
        {
          title: 'Übersichtlich',
          text: 'Programmierung kann (nicht nur) für Neulinge ziemlich monoton und kompliziert aussehen. Um das einzudämmen zeigen wir dir deine Codeeingaben auf der Stelle und geben dir ggf. Tipps und Hilfestellungen.',
          link: require("../../assets/nochaos_www.pngwing.comdefree-png-neyfo.png"),
        },
        {
          title: 'Schnell nutzbar',
          text: 'Draw IT ist auf einer vielzahl von Geräten nutzbar und es ist keine Installation nötig! Lediglich Internet solltest du haben.',
          link: require("../../assets/play-button-svgrepo-com (1).svg"),
        },
      ],
    }
},
mounted() {
  gsap.fromTo(
        '#warum',
        {
          scale: 1.5,
          opacity: 0,
          y: 0, 
          x: -400
        },
        {
          scale: 1,
          delay: 1,
          opacity: 1,
          duration: 1,
          ease: Elastic.easeOut.config(1, 0.3),
          y: 0,
          x: -15
        }
  );
  gsap.fromTo(
        '#draw',
        {
          scale: 1.5,
          opacity: 0,
          y: 0, 
          x: 400
        },
        {
          scale: 1,
          delay: 1,
          opacity: 1,
          duration: 1,
          ease: Elastic.easeOut.config(1, 0.3),
          y: 0,
          x: 15
        }
  );

  for(let i = 0; i < this.items.length; i++){
    let element = document.getElementById("goal"+i); 
    gsap.fromTo(
        element,
        {
          scale: 0,
          y: 0,
          x: 0,
        },
        {
          delay: (i/2)+1,
          duration: 2,
          scale: 1,
          y: 0,
          x: 0,
          opacity: 1,
        }
      );
  }
}
}

</script>

<style scoped>
.flex{
  display: flex;
  justify-content: center;
}
h2, p, *{
  color: #000000;
  position: relative;
  z-index: 1;
}
#text{
  text-shadow: 2px 2px 3px #828382;
  font-weight: 500;
}
</style>