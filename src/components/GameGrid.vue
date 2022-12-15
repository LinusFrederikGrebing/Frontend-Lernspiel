<template>
  <div>
    <v-container class="container">
      <v-row no-gutters v-for="y in 10" :key="y">
        <v-col no-gutters v-for="x in 10" :key="x">
          <transition appear @before-enter="beforeEnter" @enter="enter">
            <v-card elevation="4" :id="'x' + (x - 1) + 'y' + (y - 1)" @mouseover="getid($event)"></v-card>
          </transition>
        </v-col>
      </v-row>
    </v-container>
    <v-btn @click="levelAnomation()">Useless, but cool animation</v-btn>
  </div>
</template>

<script>
import gsap from "gsap";

export default {
  name: "GameGrid",
  data: () => {
    return {
      timeLine: null,
      i: 0,
    };
  },
  methods: {

    getid(obj) {
     
      let element = document.getElementById(obj.target.id); 
      let scale = element.getBoundingClientRect().width / element.offsetWidth;
        gsap.fromTo(
        element,
        {
          scale: 0.7,
          y: 0,
          x: 0,
          backgroundColor: 'rgba(128, 186, 36, 1)'
        },
        {
          backgroundColor: '#ffffff',
          duration: 0.5,
          scale: scale,
          y: 0,
          x: 40,
          opacity: 1,
        }
      );
    },

    beforeEnter(el) {
      el.style.opacity = "0";
      el.style.transform = "translateX(-100px)";
      el.style.transform = "translateY(-100px)";
    },

    enter(el) {
      gsap.fromTo(
        el,
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

    levelAnomation() {
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
            repeatDelay: 20,
          });
        }
      }
    },
  },
  mounted() {
    this.changeGrid();
  },
};
</script>
<style scoped>
.v-card {
  width: 4vw;
  height: 4vw;
}
.painted {
  background-color: rgba(128, 186, 36, 1) !important;
}
.v-col {
  flex-basis: 0;
  flex-grow: 0;
  /* max-width: 100%; */
}

.container {
  margin: auto;
}
</style>
