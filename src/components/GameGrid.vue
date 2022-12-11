<template>
  <div>
    <v-container class="container">
      <v-row no-gutters v-for="y in 10" :key="y">
        <v-col no-gutters v-for="x in 10" :key="x"
          ><transition appear @before-enter="beforeEnter" @enter="enter">
            <v-card elevation="4" :id="'x' + (x - 1) + 'y' + (y - 1)"></v-card>
          </transition>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import gsap from "gsap";

export default {
  name: "GameGrid",
  methods: {
    beforeEnter(el) {
      el.style.opacity = "0";
      el.style.transform = "translateX(-100px)";
    },
    enter(el) {
      gsap.fromTo(
        el,
        {
          scale: 0.1,
          y: 0,
        },
        {
          duration: 5.5,
          scale: 1,
          y: 40,
          x: 0,
          opacity: 1,
          ease: "bounce.out",
        }
      );
    },
  },
};
</script>
<style scoped>
.v-card {
  width: 4vw;
  height: 4vw;
}
.painted {
  background-color: rgba(128, 186, 36, 1);
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
