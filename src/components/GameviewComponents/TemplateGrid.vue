<template>
  <div class="d-flex">
    <div id="template_grid">
      <div
        class="template-zoom-bg"
        id="template-zoom-bg-id"
        @click="openOrCloseFullscreen()"
      >
        <v-row no-gutters v-for="y in 10" :key="y">
          <v-col no-gutters v-for="x in 10" :key="x">
            <transition appear @enter="enterTemplateGrid">
              <v-card
                class="template-card"
                :id="'vx' + (x - 1) + 'vy' + idArray[y - 1]"
              >
                <p v-if="coordsVisible" class="coords-text">
                  {{ x - 1 + "," + idArray[y - 1] }}
                </p>
              </v-card>
            </transition>
          </v-col>
        </v-row>
      </div>
    </div>
    <transition appear @enter="enterTemplateGrid">
      <v-btn class="coords-btn" @click="swapButtonText()">
        Koordinaten <br />
        {{ btnText }}
      </v-btn>
    </transition>
  </div>
</template>

<script>
import gsap from "gsap";
import zoomBgImg from "../../assets/zoom-in-lupe.png";

export default {
  name: "GameGrid",
  props: {
    color: String,
  },
  data: () => ({
    idArray: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    btnText: "anzeigen",
    coordsVisible: false,
    zoomedGrid: false,
  }),
  methods: {
    showZoomOption() {
      // This function increases the opacity of the element with class "template-zoom-bg" to 0.75, and sets its background image to the value of the variable "zoomBgImg".
      // It also decreases the opacity of elements with class "template-card" to 0.5.
      gsap.to(".template-zoom-bg", {
        duration: 0,
        opacity: 0.75,
        backgroundImage: `url(${zoomBgImg})`,
      });
      gsap.to(".template-card", { opacity: 0.5 });
    },
    hideZoomOption() {
      // This function sets the opacity of the element with class "template-zoom-bg" to 1 and removes its background image.
      // It also sets the opacity of elements with class "template-card" to 1.
      gsap.to(".template-zoom-bg", { opacity: 1, backgroundImage: "" });
      gsap.to(".template-card", { opacity: 1 });
    },
    swapButtonText() {
      // This function swaps the value of the variable "btnText" between "anzeigen" and "verstecken"
      // and also toggles the value of "coordsVisible" between true and false.
      if (this.btnText == "anzeigen") this.btnText = "verstecken";
      else this.btnText = "anzeigen";
      this.coordsVisible = !this.coordsVisible;
    },
    enterTemplateGrid(element) {
      //This function uses gsap to animate the element passed as an argument with some properties.
      //It also adds a mouseover and mouseleave event listener to the element with id "template-zoom-bg-id" that triggers the "showZoomOption" and "hideZoomOption" functions respectively.
      let zoomBg = document.getElementById("template-zoom-bg-id");
      gsap.fromTo(
        element,
        { y: -20, x: +2000 },
        {
          delay: Math.random() + 3,
          duration: 3,
          y: 0,
          x: 0,
          opacity: 1,
          onComplete: () => {
            zoomBg.addEventListener("mouseover", this.showZoomOption);
            zoomBg.addEventListener("mouseleave", this.hideZoomOption);
          },
        }
      );
    },
    paint(first, second) {
      //This function changes the background color of an element of the template grid
      // and adds the class "painted" to it.
      let element = document.getElementById("vx" + first + "vy" + second);
      element.style.backgroundColor = "#80ba24";
      element.classList.add("painted");
    },

    // openOrCloseFullscreen() function is used to toggle between fullscreen and normal mode of the grid element. It toggles the class "template_grid" and changes the scale, x, y, background color and z-index of the grid element using gsap library.
    // It also handles the mouse events on the zoom background element to show and hide the zoom option.
    openOrCloseFullscreen() {
      let element = document.getElementById("template_grid");
      let zoomBg = document.getElementById("template-zoom-bg-id");
      if (this.zoomedGrid == false) {
        // Add template_grid class to element and animate it
        this.zoomIn(element, zoomBg);
      } else {
        // Remove template_grid class from element and animate it
        this.zoomOut(element, zoomBg);
      }
    },

    zoomIn(element, zoomBg) {
      element.classList.add("template_grid");
      gsap.to("#template_grid", {
        scale: 2,
        x: -20,
        y: 200,
        backgroundColor: "#4a5c66",
        zIndex: 10,
        onComplete: () => {
          document.body.addEventListener("click", this.openOrCloseFullscreen);
        },
      });
      this.zoomedGrid = true;
      zoomBg.removeEventListener("mouseover", this.showZoomOption);
      zoomBg.removeEventListener("mouseleave", this.hideZoomOption);
      this.hideZoomOption();
    },
    zoomOut(element, zoomBg) {
      element.classList.remove("template_grid");
      document.body.removeEventListener("click", this.openOrCloseFullscreen);
      gsap.to("#template_grid", {
        scale: 1,
        x: 0,
        y: 0,
        backgroundColor: "transparent",
        zIndex: 10,
        onComplete: () => {
          document.body.removeEventListener(
            "click",
            this.openOrCloseFullscreen
          );
        },
      });
      this.zoomedGrid = false;
      zoomBg.addEventListener("mouseover", this.showZoomOption);
      zoomBg.addEventListener("mouseleave", this.hideZoomOption);
    },
  },
  mounted() {
    // evaluates the patternCode stored in the current level if the currentlevel is not null.
    if (this.currentLevel !== null) {
      eval(this.currentLevel.patternCode);
    }
  },
  computed: {
    // Retrieves the current level from local storage and returns it as a parsed JSON object, or returns null if it does not exist in local storage.
    currentLevel() {
      if (localStorage.getItem("currentLevel") !== null) {
        return JSON.parse(localStorage.getItem("currentLevel"));
      }
    },
  },
};
</script>
<style scoped>
/* CSS only for TemplateGrid-Template */

.coords-btn {
  margin-right: -13em;
  margin-left: 1em;
  margin-top: 1em;
}
#template_grid {
  margin-left: -1em;
  padding: 1em;
  border-radius: 18px;
}
.template_grid {
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
  font-size: 0.8em;
}
</style>
