<template>
  <div class="mb-10 mt-10">
    <h4 class="text-center">{{ $t("gameViewFreeMode.gridSize") }}</h4>
    <div class="d-flex align-center justify-center">
      <v-btn  width="55" height="50" icon @click="increaseGrid">
         <v-icon width="505" height="500" color="#80ba24">mdi-plus</v-icon>
      </v-btn>
      <div class="ml-8 mr-8">{{ gameSize }} x {{ gameSize }}</div>
       <v-btn  width="55" height="50" icon @click="decreaseGrid">
         <v-icon width="505" height="500" color="#80ba24">mdi-minus</v-icon>
      </v-btn>
    </div>
  </div>
</template>
  <script>
export default {
  name: "GameGridSize",
  components: {},
  props: { gameSize: Number },
  data: () => ({}),
  methods: {
    increaseGrid() {
      this.$emit("increaseGrid");
    },
    decreaseGrid() {
      this.$emit("decreaseGrid");
    },
  },
};
</script>
  <style scoped>
/* CSS only for GameGridSize-Template */
</style>
  