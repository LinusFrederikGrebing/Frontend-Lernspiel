<template>
  <div>
    <flickity ref="flickity" :options="flickityOptions" class="carousel my-16">
      <v-card v-for="(level, index) in levels" class="styledDiv carousel-cell pa-5 mx-8" ref="levelDiv" elevation="12"
        height="25em" width="30em " :class="['mx-auto my-8', { ' locked': !accessibleLevels.includes(level) }]">
        <v-img class="white--text align-end" height="18em" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
          <v-icon v-if="!accessibleLevels.includes(level)" class="zentriert">mdi-lock</v-icon>
          <v-card-title>Level {{ level.id }} </v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0 font-weight-black">
          Schwierigkeit:
          <v-rating color="yellow darken-3" background-color="grey darken-1" empty-icon="$ratingFull" half-increments
            hover length="8" readonly size="35" :value=level.difficulty></v-rating>
        </v-card-subtitle>
        <v-card-actions class="my-4">
          <v-btn color="primary" depressed elevation="2" @click="setLevel(level)">
            Start
          </v-btn>
        </v-card-actions>
      </v-card>

    </flickity>
  </div>
</template>

<script>
import Flickity from "vue-flickity";
export default {
  name: "LevelSelect",
  props: { levels: Array },
  components: {
    Flickity,
  },
  data: () => ({
    accessibleLevels: [],
    selectedIndex: 0,
    flickityOptions: {
      wrapAround: true,
      freeScroll: true,
      prevNextButtons: true,
      autoPlay: 10000,
      pauseAutoPlayOnHover: false,
      groupCells: 1,
    },
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
    setLevel(level) {
      if (this.accessibleLevels.includes(level)) {
        this.$emit("setLevel", level);
      }
      console.log(level.completed);
    },
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

  computed: {
    columns() {
      if (this.$vuetify.breakpoint.lgAndUp) {
        return 3;
      }

      if (this.$vuetify.breakpoint.md) {
        return 2;
      }

      return 1;
    },
  },
};
</script>
<style>
.locked {
  opacity: 0.7;
  filter: grayscale(80%);
}

.zentriert {
  position: absolute;
  margin: 5em;
  width: 10em;
  top: 2em;
  opacity: 1 !important;
  scale: 10;
}

.carousel-cell {
  height: 50vh !important;
  border-radius: 5px;
  padding: 0 !important;
  counter-increment: carousel-cell;
}

.styledDiv.carousel-cell.pa-5.mx-8.v-card.v-sheet.theme--light.elevation-12.mx-auto.my-8 {
  margin-left: 1em !important;
  margin-right: 1em !important;
}

.carousel-cell.is-selected {
  background: rgba(128, 186, 36, 1) !important;
  box-shadow: 1em 1em 1em rgba(43, 61, 15, 0.7) !important;
}

.styledDiv {
  margin-top: 10vh;
  margin-right: 80px !important;
}
</style>
