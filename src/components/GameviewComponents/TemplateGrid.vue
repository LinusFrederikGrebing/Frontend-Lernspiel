<template>
  <div>
    <div>
      <v-container>
        <v-row no-gutters>
          <v-col cols="col-10" md="10">
            <v-container class="" id="template_grid"  @click="openOrCloseFullscreen()">
              <v-row no-gutters v-for="y in 10" :key="y">
                <v-col no-gutters v-for="x in 10" :key="x">
                  <transition appear @enter="enterTemplateGrid">
                    <v-card class="template-card" :id="'vx' + (x - 1)+ 'vy' + idArray[y-1]">
                      <p v-if="coordsVisible" class="coords-text">{{ x - 1 + "|" + idArray[y-1] }}</p>
                    </v-card>
                  </transition>
                 
                </v-col>
              </v-row> 
            </v-container>
          </v-col>
          <v-col cols="col-2" md="2">
            <transition
              appear
              @enter="enterTemplateGrid"
            >
              <v-btn
                class="coords-btn"
                @click="swapButtonText();coordsVisible = !coordsVisible;"
              >
              Koordinaten <br> {{btnText}} 
              </v-btn>
              </transition
            >
          </v-col>

        </v-row>
        <v-tooltip bottom color="success">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                color="success"
                dark
                v-bind="attrs"
                v-on="on"
                left
              >
             info
              </v-icon>
            </template>
            <span>
              <h4>Du hast das Level bereits gemeistert!</h4>
              <h5>Spiele es gerne erneut, um deine Fähigkeiten zu verbessern!</h5>
            </span>
          </v-tooltip>
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
    idArray: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    btnText: "anzeigen",
    coordsVisible: false,
    zoomedGrid: false
  }),
  methods: {
    swapButtonText() {
      if (this.btnText == "anzeigen") this.btnText = "verstecken";
      else this.btnText = "anzeigen";
    },
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
    openOrCloseFullscreen(){
      let element = document.getElementById("template_grid");
      if(this.zoomedGrid == false){
        element.classList.add("template_grid");
        gsap.to(
        '#template_grid',
        { scale: 2,
          x: -150,
          y: 200,
          backgroundColor: '#4a5c66',
        zIndex: 10 },
       );
       this.zoomedGrid = true
      } else {
        gsap.to(
        '#template_grid',
        { scale: 1,
          x: 0,
          y: 0,
          backgroundColor: 'transparent',
        zIndex: 10 },
       );
       element.classList.remove("template_grid");
       this.zoomedGrid = false
      }
 
    
    }
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
.coords-btn{
  margin-left: -1em;
  margin-bottom: -3em;
}

#template_grid{
  margin-left: -1em;
  width: 22em;
  padding: 1em;
  border-radius: 18px;
}
.template_grid{
  position: relative;
  z-index: 1;
}

.template-card {
  width: 2em;
  height: 2em;
}

.coords-text {
  text-align: center;
  font-size: 0.6vw;
}

.col {
  flex-basis: 0 !important;
  flex-grow: 0 !important;
}
</style>
