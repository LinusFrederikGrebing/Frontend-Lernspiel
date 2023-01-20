<template>
  <v-container class="content-section">

 
  <v-card elevation="24" outlined shaped class="">
    <h1 class="h1 font-weight-black">- Level-Auswahl -</h1>
    <flickity ref="flickity" :options="flickityOptions" class="carousel my-16">
      <v-card
        v-for="(level, index) in levels"
        class="styledDiv carousel-cell pa-5 mx-8"
        elevation="12"
        width="30em"
        color="#4a5c66"
        :class="[
          'mx-auto my-8',
          { ' locked': levelIsAccessible(level) === false },
        ]"
        :key="index"
      >
        <div
          :id="'lvlselect' + index"
          @mouseenter="hoverEnter($event)"
          @mouseleave="hoverLeave($event)"
        >
          <v-img
            class="white--text align-end"
            height="23em"
            :src= "require(`@/assets/${level.img}`)"
          >
            <div :id="'lockIcon' + index" class="zentriertLockIcon">
              <v-icon
                v-if="levelIsAccessible(level) === false"
                class="zentriert"
              >
                mdi-lock
              </v-icon>
            </div>
            <v-card-title class="black--text">Level {{ level.id }} </v-card-title>
          </v-img>
        </div>
        <v-card-subtitle class="pb-0 font-weight-bold white--text">
          Schwierigkeit:
          <v-rating
            color="yellow darken-3"
            background-color="white darken-1"
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
            :id="'button' + index"
            color="primary"
            depressed
            elevation="2"
            @click="setLevel(level)"
            @mouseover="hoverButtonEnter($event)"
            @mouseleave="hoverButtonLeave($event)"
          >
            Start
          </v-btn>
          <v-tooltip bottom color="success">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                color="success"
                dark
                v-bind="attrs"
                v-on="on"
                v-if="level.completed === true"
                right
              >
                mdi-checkbox-marked-circle
              </v-icon>
            </template>
            <span>
              <h4>Du hast das Level bereits gemeistert!</h4>
              <h5>Spiele es gerne erneut, um deine Fähigkeiten zu verbessern!</h5>
            </span>
          </v-tooltip>
          <v-card-title v-if="level.bestTimeinSek > 0 && level.bestTimeinSek < 60" class="white--text">
            Bestzeit: {{level.bestTimeinSek }} Sekunden
          </v-card-title>
          <v-card-title v-if="level.bestTimeinSek > 0 && level.bestTimeinSek >= 60" class="white--text">
            Bestzeit: {{ (Math.round(((level.bestTimeinSek)/60) * 100) / 100) }} Minuten
          </v-card-title>
        </v-card-actions>
      </v-card>
    </flickity>
  </v-card> 
  </v-container>
</template>

<script>
import gsap from "gsap";
import Flickity from "vue-flickity";
import levels from "../../../data/levels.json";

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
      pauseAutoPlayOnHover: false,
      groupCells: 1,
    },
  }),

  methods: {
    hoverEnter(obj) {
      let element = document.getElementById(obj.target.id);
      gsap.fromTo(
        element,
        {
          scale: 1,
          y: 0,
          x: 0,
        },
        {
          duration: 0.2,
          scale: 1.09,
          y: -10,
          x: 0,
          opacity: 1,
        }
      );
    },
    hoverLeave(obj) {
      let element = document.getElementById(obj.target.id);
      gsap.fromTo(
        element,
        {
          scale: 1.09,
          y: 0,
          x: 0,
        },
        {
          duration: 0.2,
          scale: 1,
          y: 0,
          x: 0,
          opacity: 1,
        }
      );
    },
    hoverButtonEnter(obj) {
      let element = document.getElementById(obj.target.id);
      gsap.fromTo(
        element,
        {
          scale: 1,
        },
        {
          duration: 0.01,
          scale: 1.3,
        }
      );
    },

    hoverButtonLeave(obj) {
      let element = document.getElementById(obj.target.id);
      gsap.fromTo(
        element,
        {
          scale: 1.3,
        },
        {
          duration: 0.2,
          scale: 1,
        }
      );
    },
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
        localStorage.setItem("currentLevel", JSON.stringify(level));
      } else {
        this.showAlertFailure(level.id);
      }
    },
    showAlertFailure(level) {
      // Use sweetalert2
      this.$swal({
        title: "Noch nicht freigeschaltet!",
        html:
          "Schließe erst Level " +
          (level - 1) +
          " ab, um das <b>Level " +
          level +
          "</b> spielen zu können!",
        icon: "error",
        confirmButtonColor: "#6D9E1F",
        confirmButtonText: "Okay!",

        allowOutsideClick: false,
      });
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
    lockedIconAnimation() {
      for (let i = 0; i < levels.levels.length; i++) {
        let element = document.getElementById("lockIcon" + i);
        gsap
          .timeline({ repeat: -1, delay: Math.random() * 3, repeatDelay: 0.75 })
          .to(element, {
            duration: 1,
            rotation: -10,
            ease: "none",
          })
          .to(element, { duration: 1, rotation: 20, ease: "none" })
          .to(element, {
            duration: 1,
            rotation: -10,
            ease: "none",
          })
          .to(element, {
            duration: 1,
            rotation: 0,
            ease: "none",
          })
          .to(element, {
            duration: 1,
            rotation: 10,
            ease: "none",
          })
          .to(element, {
            duration: 1,
            rotation: 0,
            ease: "none",
          });
      }
    },
  },
  mounted() {
    this.lockedIconAnimation();
  },

  computed: {
   
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

.flickity-button {
  background: #4a5c66;
}
.flickity-button:hover {
  background: #80ba24;
}

.flickity-prev-next-button {
  width: 5em;
  height: 5em;
  border-radius: 5px;
}
/* icon color */
.flickity-button-icon {
  fill: white;
}
/* position outside */
.flickity-prev-next-button.previous {
  left: 40px;
}
.flickity-prev-next-button.next {
  right: 40px;
}

.h1 {
  position: absolute;
  margin-top: 0.5em;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
}

.flickity-page-dots {
  bottom: -22px;
}

.flickity-page-dots .dot {
  background-color: #4a5c66;
}

.flickity-page-dots .dot.is-selected {
  background: #80ba24;
  scale: 1.5;
}

.locked {
  opacity: 0.7;
 
}

.zentriert {
  position: absolute;
  margin: 5em;
  width: 10em;
  top: 2em;
  left: -0.5em;
  opacity: 1 !important;
  scale: 10;
}

.carousel-cell {
  height: 35em !important;
  border-radius: 5px;
  padding: 0 !important;
  counter-increment: carousel-cell;
}

.styledDiv.carousel-cell.pa-5.mx-8.v-card.v-sheet.theme--light.elevation-12.mx-auto.my-8 {
  margin-left: 1em !important;
  margin-right: 1em !important;
}

.carousel-cell.is-selected {
  background: rgb(67, 96, 19) !important;
  box-shadow: 1em 1em 1em rgba(43, 61, 15, 0.7) !important;
}
</style>
