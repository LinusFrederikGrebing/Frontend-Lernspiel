<template>
  <v-container class="containerpadding">
    <div class="b/ackground-image" ></div>
    <v-row>
      <v-col class="text-center my-4">
        <v-card  
            elevation="24"
            outlined
            shaped
        >
            <h2 class=" text-center text-lg-h2  text-md-h3  text-sm-h4 my-4">
              Warum DrawIT?
            </h2>
         
    
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
          v-for="(item, index) in items"
          :key="index"
          cols="12"
          xs="12" 
          sm="12" 
          md="12"
          lg="4"
          xl="4"
          class="text-center"
      >
        <v-card
            :id="'goal'+index"
            style="min-height: 25em"
            elevation="24"
            outlined
            shaped
            @mouseenter="hoverEnter($event)" @mouseleave="hoverLeave($event)"
            class=""
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
  name: "OnePagerWhy",
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

.test{
  margin-top: 20em;
}
h2, p, *{
  color: #000000;
  z-index: 1;
}
</style>