<template>
  <div>
    <flickity ref="flickity" :options="flickityOptions" class="carousel">
      <div v-for="(level, index) in levels" class="styledDiv carousel-cell pa-5" ref="levelDiv">
        <v-card
         
          elevation="12"
          height="25em"
          width="30em "
          :class="['mx-auto my-8', {' locked' : !accessibleLevels.includes(level)}]"
        >
          <v-img
            class="white--text align-end"
            height="18em"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-icon v-if="!accessibleLevels.includes(level)" class="zentriert"
              >mdi-lock</v-icon
            >
            <v-card-title>Level {{ level.id }} </v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">
            Information zum Level vielleicht?
          </v-card-subtitle>
          <v-card-actions>
            <v-btn @click="setLevel(level)" color="orange" text> Start </v-btn>
          </v-card-actions>
        </v-card>
      </div>
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
      freeScroll: true,
      prevNextButtons: false,
      autoPlay: 2200,
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
  opacity: 0.5;
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
  margin-right: 10px;
  border-radius: 5px;
  counter-increment: carousel-cell;
}

.carousel-cell.is-selected {
  background: #ED2 !important;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.styledDiv{
  margin-top: 10vh;
  margin-right: 80px !important;
}
</style>
