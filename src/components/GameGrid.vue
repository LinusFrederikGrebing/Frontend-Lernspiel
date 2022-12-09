<template>
  <div>
    <v-container class="container">
      <v-row no-gutters v-for="y in 10" :key="y">
        <v-col no-gutters v-for="x in 10" :key="x">
          <v-card :id="'x' + x + 'y' + y">
            {{ "" }}
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "GameGrid",
  props: {
    codeToRun: String,
  },
  watch: {
    codeToRun() {
      this.paint();
    },
  },
  mounted() {
  },
};
</script>
<style scoped>
.painted {
  background-color: red;
}
.v-card {
  width: 4vw;
  height: 4vw;
}
.v-col {
  flex-basis: 0;
  flex-grow: 0;
  /* max-width: 100%; */
}

#x1y1 {
  background-color: red;
}

.container {
 margin: auto;
}
</style>
