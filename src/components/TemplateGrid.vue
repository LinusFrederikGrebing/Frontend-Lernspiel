<template>
  <div>
    <div>
      <v-container class="grey lighten-5">
        <v-row no-gutters>
          <v-col cols="col-10" md="10">
            <v-container class="mx-auto">
              <v-row no-gutters v-for="y in 10" :key="y">
                <v-col no-gutters v-for="x in 10" :key="x">
                  <v-card :id="'vx' + x + 'vy' + y">
                    {{ "" }}
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-col cols="col-2" md="2">
            <v-btn icon color="green">
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
    codeToRun: String,
  },
  data: () => ({
  }),
  methods: {
    paintTemplate(){
      for(let i = 2; i<=3; i++){
        for(let j = 2; j<=3; j++){
          let element = document.getElementById('vx' + i + 'vy' + j)
          element.classList.add("painted")
          element = document.getElementById('vx' + (i+6) + 'vy' + (j))
          element.classList.add("painted")
       }
    }
    for(let i = 2; i<=9; i++){
        for(let j = 8; j<9; j++){
          let element = document.getElementById('vx' + i + 'vy' + j)
          element.classList.add("painted")
       }
    }
    }
  },
  mounted(){
    this.paintTemplate()
  },
  watch: {
    codeToRun() {
      this.paint();
    },
  },
};
</script>
<style scoped>
.v-card {
  width: 1.5vw;
  height: 1.5vw;
}
.painted {
  background-color: rgba(128,186,36, 1);
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
