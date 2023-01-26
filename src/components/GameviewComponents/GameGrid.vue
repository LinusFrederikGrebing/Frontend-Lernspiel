<template>
  <div class="mt-16 pb-8 mb-16">
      <v-row class="test" no-gutters v-for="y in 10" :key="y">
        <v-col no-gutters v-for="x in 10" :key="x">
          <transition appear @enter="enterGrid">
            <v-card class="grid-card" elevation="4" :id="'x' + (x - 1) + 'y' + idArray[y-1]" @mouseover="hoverAnimation($event)">
            </v-card>
          </transition>
        </v-col>
      </v-row>
  </div>
</template>

<script>
import gsap from "gsap";

export default {
  name: "GameGrid",
  props: {
    color: String
  },
  data: () => {
    return {
      idArray: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    };
  },
  methods: {
    hoverAnimation(obj) {
      // It selects the element with the id that matches the id of the object passed in.
      let element = document.getElementById(obj.target.id); 
      // And calculates the scale of the element
      let scale = element.getBoundingClientRect().width / element.offsetWidth;
      // Sets the default-value of the color.
      let returnColor = '#ffffff';
      // If the element has the class "painted" it sets "returnColor" to the value of "this.color"
      if (element.classList.contains("painted")) returnColor = this.color;  
        gsap.fromTo(
        element,
        {
          y: 0,
          x: 0,
          backgroundColor: this.color
        },
        {
          backgroundColor: returnColor,
          duration: 0.5,
          scale: scale,
          y: 0,
          x: 40,
          opacity: 1,
        }
      );
    },
    // It uses the gsap library the GameGrid while entering the Game. The animation starts randomly
    enterGrid(element) {
      gsap.fromTo(
        element,
        {
          scale: 0.1,
          y: -2000,
          x: -2000,
        },
        {
          delay: Math.random(),
          duration: 3,
          scale: 1,
          y: 0,
          x: 40,
          opacity: 1,
        }
      );
    },
    // Animation if level resettet
    levelAnimation() {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          let element = document.getElementById("x" + i + "y" + j);
          gsap.to(element, {
            duration: 1,
            scale: 0.2,
            y: 60,
            yoyo: true,
            ease: "power1.inOut",
            delay: Math.random(),
            stagger: {
              amount: 1.5,
              grid: "auto",
              from: "center",
            },
            repeat: -1,
            repeatDelay: 3,
          });
        }
      }
    },
    // stagger-Animation of the GameGrid every 100sek
    changeGrid() { 
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          let element = document.getElementById("x" + i + "y" + j);
          gsap.to(element, {
            duration: 1,
            scale: 0.8,
            y: 0,
            yoyo: true,
            delay: 10 + Math.random(),
            stagger: {
              amount: 1.5,
              grid: "auto",
              from: "center",
            },
            repeat: -1,
            repeatDelay: 100,
          });
        }
      }
    },
  },
  mounted() {
    // start the stagger-Animation on mount
    this.changeGrid();
  },
};
</script>
<style scoped>
/* CSS only for GameGrid-Template */
.v-card {
  width: 3.7vw;
  height: 3.7vw;
}
.col {
  flex-basis: 0 !important;
  flex-grow: 0 !important;
}
</style>
