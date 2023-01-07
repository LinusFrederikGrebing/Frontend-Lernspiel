<template>
  <div class="my-16 ">
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

export default {
  name: "OnePagerTryMe",
  methods: {
    lvlSelect(){
      this.$router.push({ path: '/LevelSelect' });
    }
  }
}

</script>

<style scoped>
div {
  width: 80%;
  margin: auto;
}

</style>