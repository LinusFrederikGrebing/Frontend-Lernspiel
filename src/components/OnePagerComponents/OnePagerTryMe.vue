<template>
  <div id="tryBtn" class="my-16">
    <v-btn class="white--text"
           elevation="24"
           rounded
           block
           x-large
           color="#4a5c66"
    @click="lvlSelect">Try Me</v-btn>
  </div>
</template>

<script>
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export default {
  name: "OnePagerTryMe",
  methods: {
    lvlSelect(){
      this.$router.push({ path: '/LevelSelect' });
    }
  },
  mounted() {
  /*  gsap.to(
      "#tryBtn",
        {
          duration: 2,
          scrollTrigger: {
            trigger:  "#tryBtn",
            onEnter: this.tutorialAnimation,
            onLeave: this.resetPaintedFields,
            onEnterBack:  this.tutorialAnimation,
            onLeaveBack:  this.resetPaintedFields
          },
        }
      );*/
  }
  
}

</script>

<style scoped>
div {
  width: 80%;
  margin: auto;
}
</style>