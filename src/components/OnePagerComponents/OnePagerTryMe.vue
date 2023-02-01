<template>
  <div class="my-16" >
    <div id="tryContainer"></div>
    <v-btn id="tryBtn" class="white--text show"
           elevation="24"
           rounded
           x-large
           color="#4a5c66"
           @click="setLevel">
           {{ $t("lvlSelect.quickStart") }}
    </v-btn>
    <v-btn id="tryBtnFAB" class="white--text hide"
           elevation="24"
           fab
           color="#4a5c66"
           @click="setLevel">
          <svg fill="#FFFFFF" class="ml-2" height="30px" width="30px" version="1.1" id="Capa_1" viewBox="0 0 210 210" xml:space="preserve">
          <path d="M179.07,105L30.93,210V0L179.07,105z"/>
         </svg>
    </v-btn>
  </div>
</template>

<script>
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export default {
  name: "OnePagerTryMe",
  data() {
    return {
      tryBtn: null, // reference to the try button element
      tryBtnFAB: null, // reference to the FAB try button element
      lastAccessibleLevel: null, // the last level the user is able to access
      accessibleLevels: [] // an array of levels that the user has accessed
    }
  },
  methods: {
    // sets the last accessible level and navigates to the GameView page with that level as a parameter
    setLevel() {
      // Get the last accessible level from local storage
      this.accessibleLevels = JSON.parse(localStorage.getItem("accessibleLevels")) || [];
      if (this.accessibleLevels.length > 0) {
        this.lastAccessibleLevel = this.accessibleLevels[this.accessibleLevels.length - 1];
      } else {
        this.lastAccessibleLevel = JSON.parse(localStorage.getItem("levels"))[0];
      }

      // Navigate to the GameView page with the last accessible level as a parameter
      this.$router.push({
        name: "GameView",
        params: {
          level: {
            ...this.lastAccessibleLevel
          }
        }
      });

      // Save the current level to local storage
      localStorage.setItem("currentLevel", JSON.stringify(this.lastAccessibleLevel));
    },
    // show the try button and move it to the correct position
    enter() {
      this.tryBtn = document.getElementById("tryBtn"); 
      this.tryBtnFAB = document.getElementById("tryBtnFAB"); 
      this.tryBtn.classList.add("show");
      this.tryBtn.classList.remove("hidden");
      this.tryBtnFAB.classList.add("hide");
      this.tryBtnFAB.classList.remove("show");

      gsap.to("#tryBtn", {
        scaleX: 1,
        duration: 0,
        y: 0,
        x: 0,
      });
    },
    // hide the try button and move it out of view
    leave() {
      gsap.to(this.tryBtn, {
        scaleX: 0.05,
        duration: 0.1,
        y: 950,
        x: 850,
      });
      setTimeout(() => this.toggleVisibleBtn(), 250);
    },
    // show the try button when the user scrolls back up
    enterback() {
      setTimeout(() => this.toggleVisibleBtn(), 10);
      gsap.to("#tryBtn", {
        scaleX: 1,
        duration: 0,
        y: 0,
        x: 0,
      });
    },
    // toggle the visibility of the try button and FAB try button
    toggleVisibleBtn() {
      this.tryBtn.classList.toggle("show");
      this.tryBtn.classList.toggle("hidden");
      this.tryBtnFAB.classList.toggle("hide");
      this.tryBtnFAB.classList.toggle("show");
    }
  },
  mounted() {
    // show the try button and set up the scrollTrigger animation
    this.enter();
    setTimeout(() => 
      gsap.to("#tryContainer", {
        duration: 2,
        scrollTrigger: {
          trigger: "#tryContainer",
          onEnter: this.enter,
          onLeave: this.leave,
          onEnterBack: this.enterback
        },
      })
    , 100);
  }
}

</script>

<style scoped>
/* CSS only for TryMeButton-Template */
#tryBtn{
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 2;
}
#tryBtnFAB{
  position: fixed;
  right: 4em;
  bottom: 6em;
  width: 6em;
  height: 6em;
  z-index: 2;
}
.button-FAB{
  position: fixed !important;
}
</style>