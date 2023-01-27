<template>
  <div>
    <v-btn @click="increaseGrid"> hoch </v-btn>
    <v-btn @click="decreaseGrid"> runter </v-btn>
  </div>
</template>
  <script>
export default {
  name: "GameGridSize",
  components: {},
  props: {},
  data: () => ({}),
  methods: {
    increaseGrid() {
      this.$emit('increaseGrid')
    },
    decreaseGrid() {
      this.$emit('decreaseGrid')
    }
  },
};
</script>
  <style scoped>
/* CSS only for GameGridSize-Template */
</style>
  