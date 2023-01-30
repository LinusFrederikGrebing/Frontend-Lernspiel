<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <v-card
          elevation="24"
          outlined
          shaped
        >
          <h2 class="text-center text-lg-h2 text-md-h3 text-sm-h4 my-4">
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
          :id="'goal' + index"
          min-height="25em"
          elevation="24"
          outlined
          shaped
          @mouseenter="hoverEnter($event)"
          @mouseleave="hoverLeave($event)"
          class=""
        >
          <v-avatar size="100" class="ma-8">
            <v-img :src="item.link"></v-img>
          </v-avatar>
          <div class="title text-uppercase ma-4" v-text="item.title"></div>
          <p v-text="item.text" class="text-body-2 mx-6"></p>
        </v-card>
      </v-col>
     </v-row>
    <OnePagerTryMe />
  </v-container>
</template>

<script>
import OnePagerTryMe from "./OnePagerTryMe";
import gsap from "gsap";

export default {
  name: "OnePagerWhy",
  components: {
    OnePagerTryMe
  },
  methods: {
    // It uses the gsap library to animate the targeted object by increasing its scale, y position, x position and opacity
      hoverEnter(obj) {
        gsap.to(obj.target, {duration: 0.2, scale: 1.05, y: 0, x: 0, opacity: 1});
      },
      hoverLeave(obj) {
        gsap.to(obj.target, {duration: 0.2, scale: 1, y: 0, x: 0, opacity: 1});
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
// function that triggers when the component is mounted on the page.
mounted() {
  // It uses the gsap library to animate each item in the "items" array by scaling it up and increasing its opacity with a delay, making them appear one after the other.
  this.items.forEach((_, i) => {
    const element = document.getElementById(`goal${i}`);
    gsap.fromTo(element, {
      scale: 0,
      opacity: 0,
    }, {
      delay: (i / 2) + 1,
      duration: 2,
      scale: 1,
      opacity: 1,
      ease: 'power3.out'
    });
});  
}
}

</script>

<style scoped>
/* CSS only for OnePagerWhy-Template */
</style>