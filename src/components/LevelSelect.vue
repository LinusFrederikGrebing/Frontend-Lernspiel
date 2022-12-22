<template>
  <div>
    <flickity ref="flickity" :options="flickityOptions" class="carousel">
      <div v-for="level in levels" class="styledDiv">
        <v-card
          elevation="12"
          height="25em"
          width="30em "
          :class="
            accessibleLevels.includes(level)
              ? 'mx-auto my-8'
              : 'locked mx-auto my-8'
          "
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
    console.log(this.levels);
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
.row.fill-height.align-center.justify-center {
  background-color: rgb(236, 236, 236) !important;
}
.v-carousel__controls__item {
  color: rgba(128, 186, 36, 1) !important;
  opacity: 1 !important;
}
/* external css: flickity.css */

* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
}

.carousel {
  background: #eee;
}

.carousel-cell {
  width: 28%;
  height: 200px;
  background: #8c8;
  border-radius: 5px;
  padding-right: 1000px !important;
  counter-increment: carousel-cell;
}

.carousel-cell.is-selected {
  background: #ed2;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

/* cell number */
.carousel-cell:before {
  display: block;
  text-align: center;
  content: counter(carousel-cell);
  line-height: 200px;
  font-size: 80px;
  color: white;
}

.styledDiv{
  margin-right: 80px !important;
}
</style>
