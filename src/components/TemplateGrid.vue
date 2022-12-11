<template>
  <div>
    <div>
      <v-container class="grey lighten-5">
        <v-row no-gutters>
          <v-col cols="col-10" md="10">
            <v-container class="mx-auto">
              <v-row no-gutters v-for="y in 10" :key="y">
                <v-col no-gutters v-for="x in 10" :key="x">
                  <v-card :id="'vx' + (x-1) + 'vy' + (y-1)">
                    {{ "" }}
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-col cols="col-2" md="2">
            <v-btn icon color="green" @click="resetPaintedFields">
              <v-icon>mdi-cached</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameGrid",
  props: {
    currentLevel: Object,
  },
  methods: {
    paint(first, second) {
      let element = document.getElementById("vx" + first + "vy" + second);
      element.classList.add("painted");
    },
    resetPaintedFields(){
      Array.from(document.querySelectorAll('.painted')).forEach((el) => {
        if(!el.id.includes("v")){
          el.classList.remove('painted');
        }
      }) 
    },
  },
  watch: {
    currentLevel(){
      eval(this.currentLevel.patternCode)
    }
  },
};
</script>
<style scoped>
.v-card {
  width: 1.5vw;
  height: 1.5vw;
}
.painted {
  background-color: rgba(128, 186, 36, 1);
}
.v-col {
  flex-basis: 0;
  flex-grow: 0;
  /* max-width: 100%; */
}
#x1y1 {
  background-color: red;
}
</style>
