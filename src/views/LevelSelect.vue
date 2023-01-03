<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <v-card class="pa-1">
        <v-alert prominent type="error" >
          I'm a shaped alert with a dense prominent option that Praesent blandit
          laoreet nibh. Praesent nonummy mi in odio. Phasellus tempus. Mauris
          turpis nunc, blandit et, volutpat molestie, porta ut, ligula. Duis
          leo.
        </v-alert>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            Verstanden
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <flickity ref="flickity" :options="flickityOptions" class="carousel my-16">
      <v-card
        v-for="(level, index) in levels"
        class="styledDiv carousel-cell pa-5 mx-8"
        ref="levelDiv"
        elevation="12"
        height="25em"
        width="30em "
        :class="[
          'mx-auto my-8',
          { ' locked': levelIsAccessible(level) === false },
        ]"
        :key="index"
      >
        <v-img
          class="white--text align-end"
          height="18em"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-icon v-if="levelIsAccessible(level) === false" class="zentriert"
            >mdi-lock</v-icon
          >
          <v-card-title>Level {{ level.id }} </v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0 font-weight-black">
          Schwierigkeit:
          <v-rating
            color="yellow darken-3"
            background-color="grey darken-1"
            empty-icon="$ratingFull"
            half-increments
            hover
            length="8"
            readonly
            size="35"
            :value="level.difficulty"
          ></v-rating>
        </v-card-subtitle>
        <v-card-actions class="my-4">
          <v-btn
            color="primary"
            depressed
            elevation="2"
            @click="setLevel(level)"
          >
            Start
          </v-btn>
          <v-icon v-if="level.completed === true" color="green" right>
            mdi-checkbox-marked-circle
          </v-icon>
        </v-card-actions>
      </v-card>
    </flickity>
  </div>
</template>

<script>
import Flickity from "vue-flickity";
import levels from "../../data/levels.json";
export default {
  name: "LevelSelect",
  components: {
    Flickity,
  },
  data: () => ({
    selectedIndex: 0,
    dialog: false,
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
      if (this.levelIsAccessible(level)) {
        this.$router.push({
          name: "GameView",
          params: {
            level: {
              ...level,
            },
          },
        });
      } else {
        this.dialog = true;
      }
    },
    levelIsAccessible(level) {
      let index = this.accessibleLevels.findIndex((accessibleLevel) => {
        return level.id === accessibleLevel.id;
      });
      if (index === -1) {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted() {
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
    levels() {
      if (localStorage.getItem("levels") !== null) {
        return JSON.parse(localStorage.getItem("levels"));
      } else {
        return Object.values(Object.values(levels)[0]);
      }
    },
    accessibleLevels() {
      if (localStorage.getItem("accessibleLevels") !== null) {
        return JSON.parse(localStorage.getItem("accessibleLevels"));
      } else {
        return [this.levels[0]];
      }
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
