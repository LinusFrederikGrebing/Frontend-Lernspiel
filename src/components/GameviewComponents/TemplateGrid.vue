<template>
  <div>
    <div>
      <v-container>
        <v-row no-gutters>
          <v-col cols="col-10" md="10">
            <v-container class="mx-auto">
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
    enterRefreshButton(element) {
      gsap.fromTo(
        element,
        { y: -100, x: 0 },
        { delay: 3, duration: 1, y: 40, x: 0, opacity: 1 }
      );
    },
    rotate() {
      gsap.fromTo(
        "#refreshbtn",
        { rotate: 0, duration: 1 },
        { rotate: 360, duration: 1 }
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
  watch: {
    currentLevel(newVal, oldVal) {
      console.log("change test");
      eval(newVal.patternCode)
      Array.from(document.querySelectorAll(".painted")).forEach((el) => {
        if(this.color == null){
          el.style.backgroundColor = '#CC00CC';
        } else {
          el.style.backgroundColor = this.color;
        }
     
        console.log(el.id);
        });
    },
  }
};
</script>
<style scoped>
.v-card {
  width: 1.5vw;
  height: 1.5vw;
}

.col {
  flex-basis: 0 !important;
  flex-grow: 0 !important;
  /* max-width: 100%; */
}
</style>
