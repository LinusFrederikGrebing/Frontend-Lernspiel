<template>
  <div>
    <div>
      <v-container>
        <v-row no-gutters>
          <v-col cols="col-10" md="10">
            <v-container id="template_grid"  @click="openOrCloseFullscreen()">
              <div class="template-zoom-bg" id="template-zoom-bg-id">
              <v-row no-gutters v-for="y in 10" :key="y">
                <v-col no-gutters v-for="x in 10" :key="x">
                  <transition appear @enter="enterTemplateGrid">
                    <v-card class="template-card" :id="'vx' + (x - 1)+ 'vy' + idArray[y-1]">
                      <p v-if="coordsVisible" class="coords-text">{{ x - 1 + "|" + idArray[y-1] }}</p>
                    </v-card>
                  </transition>
                 
                </v-col>
              </v-row> 
            </div>
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
      </v-container>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import zoomBgImg from '../../assets/zoom-in-lupe.png';

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
    showZoomOption() {
        gsap.to(".template-zoom-bg", {duration: 0, opacity: 0.75, backgroundImage: `url(${zoomBgImg})`});
        gsap.to(".template-card", {opacity: 0.5});
    },
    hideZoomOption() {
        gsap.to(".template-zoom-bg", {opacity: 1, backgroundImage: ""});
        gsap.to(".template-card", {opacity: 1});
    },
    swapButtonText() {
      if (this.btnText == "anzeigen") this.btnText = "verstecken";
      else this.btnText = "anzeigen";
    },
    enterTemplateGrid(element) {
      let zoomBg = document.getElementById("template-zoom-bg-id");
      gsap.fromTo(
        element,
        { y: -20, x: +2000 },
        { delay: Math.random() + 3, duration: 3, y: 0, x: 0, opacity: 1, onComplete: () => {
            zoomBg.addEventListener('mouseover', this.showZoomOption);
            zoomBg.addEventListener('mouseleave', this.hideZoomOption);
          }  
        }
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
      let zoomBg = document.getElementById("template-zoom-bg-id");
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
       zoomBg.removeEventListener('mouseover', this.showZoomOption);
       zoomBg.removeEventListener('mouseleave', this.hideZoomOption);
       this.hideZoomOption();
      } else {
        gsap.to(
        '#template_grid',
        { scale: 1,
          x: 0,
          y: 0,
          backgroundColor: 'transparent',
        zIndex: 10 },
       )
       this.zoomedGrid = false
       zoomBg.addEventListener('mouseover', this.showZoomOption);
       zoomBg.addEventListener('mouseleave', this.hideZoomOption);
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

.template-zoom-bg {
  background-size: 75%;
  background-position: center;
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
