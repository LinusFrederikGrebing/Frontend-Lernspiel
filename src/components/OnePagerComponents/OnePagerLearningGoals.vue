<template>
  <v-container>
    <div class="b/ackground-image"></div>
    <v-row>
      <v-col class="text-center my-8">
       
        <h2 class="text-h2 text-md-h1 text-center my-4">
          Warum Draw IT?
        </h2>
        
      </v-col>
    </v-row>
    <v-row>
      <v-col
          v-for="(item, index) in items"
          :key="index"
          cols="12"
          md="4"
          class="text-center"
      >
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
          <p v-text="item.text" class="text-body-1 text-md-body-2 mx-6"></p>
        </v-card>
        <v-row no-gutters></v-row>
      </v-col>
    </v-row>
    <OnePagerTryMe />
    <v-row no-gutters>
    </v-row>
  </v-container>
</template>

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
  }
}
</script>

<style scoped>
h2, p, *{
  color: #49403c;
  position: relative;
  z-index: 1;
}
</style>