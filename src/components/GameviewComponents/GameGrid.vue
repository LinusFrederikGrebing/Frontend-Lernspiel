<template>
  <div class="mt-12 pb-4 pt-4 mb-12">
    <div class="grid-container">
    <v-row no-gutters v-for="y in gridSize" :key="y">
      <v-col no-gutters v-for="x in gridSize" :key="x">
        <transition appear @enter="enterGrid">
         <v-card class="grid-card" elevation="4" :id="'x' + (x - 1) + 'y' + idArray[y-1]" @mouseover="hoverAnimation($event)">
          </v-card>
         </transition>
       </v-col>
    </v-row>
  </div>
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
      gridSize: 10,
    };
  },
  methods: {
    increaseGridSize() {
        this.gridSize += 1
        let newVal = this.idArray[0] + 1 || 0;
        this.idArray.unshift(newVal);
        console.log(this.idArray);
    },
    decreaseGridSize() {
        this.gridSize -= 1
        this.idArray.shift();
    },
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
      for (let i = 0; i < this.gridSize; i++) {
        for (let j = 0; j < this.gridSize; j++) {
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
      for (let i = 0; i < this.gridSize; i++) {
        for (let j = 0; j < this.gridSize; j++) {
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
    if (this.$route.path !== '/GameViewFreeMode') {
      this.changeGrid();
    }
    document.documentElement.style.setProperty('--gridSize', this.gridSize);
  },
  watch: {
    gridSize: {
      immediate: true,
      handler(newValue) {
        document.documentElement.style.setProperty('--gridSize', newValue);
      }
    }
}

};
</script>
<style scoped>
/* CSS only for GameGrid-Template */
.grid-card {
  width: calc(37vw / var(--gridSize));
  height: calc(37vw / var(--gridSize));
}
.grid-container{
  width: 37vw;
  height: 37vw;
}
.col {
  flex-basis: 0 !important;
  flex-grow: 0 !important;
}
</style>
