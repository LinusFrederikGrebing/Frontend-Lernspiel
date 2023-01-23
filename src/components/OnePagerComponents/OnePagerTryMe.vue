<template>
  <div class="my-16">
    <div id="tryContainer"></div>
    <v-btn id="tryBtn" class="white--text show"
           elevation="24"
           rounded
           block
           x-large
           color="#4a5c66"
           @click="navigateToLevelSelect">
           Try Me
    </v-btn>
    <v-btn id="tryBtnFAB" class="white--text hide"
           elevation="24"
           fab
           color="#4a5c66"
          @click="navigateToLevelSelect">
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
      tryBtn: null,
      tryBtnFAB: null
    }
  },
  methods: {
    navigateToLevelSelect() {
      this.$router.push({ path: '/LevelSelect' });
    },
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
    leave() {
      gsap.to(this.tryBtn, {
        scaleX: 0.05,
        duration: 0.1,
        y: 950,
        x: 850,
      });
      setTimeout(() => this.toggleVisibleBtn(), 250);
    },
    enterback() {
      setTimeout(() => this.toggleVisibleBtn(), 10);
      gsap.to("#tryBtn", {
        scaleX: 1,
        duration: 0,
        y: 0,
        x: 0,
      });
    },
    leaveBack() {
      console.log("leaveBack");
    },
    toggleVisibleBtn() {
      this.tryBtn.classList.toggle("show");
      this.tryBtn.classList.toggle("hidden");
      this.tryBtnFAB.classList.toggle("hide");
      this.tryBtnFAB.classList.toggle("show");
    }
  },
  mounted() {
    this.enter();
    setTimeout(() => 
      gsap.to("#tryContainer", {
        duration: 2,
        scrollTrigger: {
          trigger: "#tryContainer",
          onEnter: this.enter,
          onLeave: this.leave,
          onEnterBack: this.enterback,
          onLeaveBack: this.leaveBack
        },
      })
    , 100);
  }
}

</script>

<style scoped>
div {
  width: 80%;
  margin: auto;
}

.hide {
  display: none;
}
.hidden {
  visibility: hidden;
}
.show {
  display: block;
}
#tryBtn{
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