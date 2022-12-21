<template>
  <div>
    <v-container fluid>
      <v-row justify="space-around">
        <v-col cols="5" v-for="level in accessibleLevels" :key="level.id">
          <v-card @click="setLevel(level)">
            <v-img
              src="https://picsum.photos/510/300?random"
              aspect-ratio="1.7"
            ></v-img>
            <v-card-subtitle>{{ level.id }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "LevelSelect",
  props: { levels: Array },
  data: () => ({
    accessibleLevels: [],
  }),
  methods: {
    paint(first, second) {
      let element = document.getElementById("vx" + first + "vy" + second);
      element.classList.add("painted");
    },
    resetPaintedFields() {
      Array.from(document.querySelectorAll(".painted")).forEach((el) => {
        if (!el.id.includes("v")) {
          el.classList.remove("painted");
        }
      });
    },
    setLevel(level){
      this.$emit('setLevel', level)
    }
  },
  mounted() {
    this.accessibleLevels.push(this.levels[0]);
    this.levels.forEach((level) => {
      if (level.completed === true) {
        this.accessibleLevels.push(
          this.levels[
          this.levels.findIndex((nextLvl) => nextLvl.id === level.id) + 1
          ]
        );
      }
    });
  },
};
</script>
<style scoped></style>
