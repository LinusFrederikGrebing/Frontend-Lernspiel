<template>
  <div>
    <div>
      <v-container>
        <v-row no-gutters>
          <v-col cols="col-10" md="10">
            <v-container class="mx-auto">
              <v-row no-gutters v-for="y in 10" :key="y">
                <v-col no-gutters v-for="x in 10" :key="x">
                  <transition appear @before-enter="beforeEnter" @enter="enter">
                    <v-card :id="'vx' + (x - 1) + 'vy' + (y - 1)">
                      {{ "" }}
                    </v-card>
                  </transition>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-col cols="col-2" md="2">
            <transition
              appear
              @before-enter="beforeEnter"
              @enter="enterRefreshButton"
            >
              <v-btn
                icon
                id="refreshbtn"
                color="green"
                @click="resetPaintedFields"
              >
                <v-icon>mdi-cached</v-icon>
              </v-btn></transition
            >
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
    currentLevel: Object,
  },

  methods: {
    rotate() {
      gsap.fromTo(
        "#refreshbtn",
        { rotate: 0, duration: 1 },
        { rotate: 360, duration: 1 }
      );
    },
    paint(first, second) {
      let element = document.getElementById("vx" + first + "vy" + second);
      element.classList.add("painted");
    },
    resetPaintedFields() {
      this.rotate();
      Array.from(document.querySelectorAll(".painted")).forEach((el) => {
        if (!el.id.includes("v")) {
          el.classList.remove("painted");
        }
      });
    },
    beforeEnter(el) {
      el.style.opacity = "0";
      el.style.transform = "translateX(-100px)";
      el.style.transform = "translateY(-100px)";
    },

    enter(el) {
      gsap.fromTo(
        el,
        { y: -20, x: +2000 },
        { delay: Math.random() + 3, duration: 3, y: 0, x: 0, opacity: 1 }
      );
    },
    enterRefreshButton(el) {
      gsap.fromTo(
        el,
        { y: -100, x: 0 },
        { delay: 3, duration: 1, y: 40, x: 0, opacity: 1 }
      );
    },
  },
  mounted(){
    if(this.currentLevel !== null){
      eval(this.currentLevel.patternCode)
    }
  },
  watch: {
    currentLevel(newVal, oldVal) {
      eval(newVal.patternCode)
    },
  },
};
</script>
<style scoped>
.v-card {
  width: 1.5vw;
  height: 1.5vw;
}
.painted {
  background-color: rgba(128, 186, 36, 1);
}
.col {
  flex-basis: 0 !important;
  flex-grow: 0 !important;
  /* max-width: 100%; */
}

#x1y1 {
  background-color: red;
}
</style>
