<template>
  <div>
    <div>
      <v-container>  
        <v-row no-gutters>
          <v-col cols="col-10" md="10">
            <v-container class="">
              <v-row no-gutters v-for="y in 10" :key="y">
                <v-col no-gutters v-for="x in 10" :key="x">
                  <transition appear @enter="enterTemplateGrid">
                    <v-card class="template-card" :id="'vx' + (x - 1) + 'vy' + (y - 1)">
                      {{ "" }}
                    </v-card>
                  </transition>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";

export default {
  name: "GameGrid",
  props: {
    color: String,
  }, 
  data: () => ({
  }),
  methods: {
    enterTemplateGrid(element) {
      gsap.fromTo(
        element,
        { y: -20, x: +2000 },
        { delay: Math.random() + 3, duration: 3, y: 0, x: 0, opacity: 1 }
      );
    },
    paint(first, second) {
      console.log("paint");
      let element = document.getElementById("vx" + first + "vy" + second);
      element.style.backgroundColor = '#80ba24';
      element.classList.add("painted");
    },
  },
  mounted(){ 
    if(this.currentLevel !== null){
      eval(this.currentLevel.patternCode)
    }
  },
  computed: {
    currentLevel() {
      if (localStorage.getItem("currentLevel") !== null) {
        return JSON.parse(localStorage.getItem("currentLevel"));
      } 
    },
  },
};
</script>
<style scoped>

.template-card {
  width: 2em;
  height: 2em;
}

.col {
  flex-basis: 0 !important;
  flex-grow: 0 !important;
}
</style>