<template>
  <v-container>
    <v-card elevation="24" outlined shaped height="5em" class="header">
      <h1 class="section_header font-weight-black">
        - {{ $t("navigation.lvlSelect") }} -
      </h1>
    </v-card>
    <v-card elevation="24" outlined shaped class="">
      <v-btn
        class="free-btn white--text"
        elevation="4"
        rounded
        width="20em"
        color="#4a5c66"
        @click="freeMode()"
      >
        {{ $t("lvlSelect.freeMode") }}
      </v-btn>
      
      <flickity
        ref="flickity"
        :options="flickityOptions"
        class="carousel mt-12 mb-16"
      >
        <v-card
          v-for="(level, index) in levels"
          class="styledDiv carousel-cell pa-5 mx-8"
          elevation="12"
          width="30em"
          color="#252525"
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
              :src="require(`@/assets/${level.img}`)"
            >
              <div :id="'lockIcon' + index" class="zentriertLockIcon">
                <v-icon
                  v-if="levelIsAccessible(level) === false"
                  class="zentriert"
                >
                  mdi-lock
                </v-icon>
              </div>
              <v-card-title class="black--text"
                >Level {{ level.id }}</v-card-title
              >
            </v-img>
          </div>
          <v-card-subtitle
            class="
              pb-0
              font-weight-bold
              white--text
              d-flex
              flex-column
              align-center
            "
          >
            {{ $t("lvlSelect.difficulty") }}:
            <v-rating
              color="yellow darken-3"
              background-color="white darken-1"
              empty-icon="$ratingFull"
              half-increments
              hover
              length="8"
              readonly
              size="25"
              :value="level.difficulty"
            >
            </v-rating>
          </v-card-subtitle>

          <v-card-actions class="my-4">
            <v-btn
              color="primary"
              depressed
              elevation="2"
              @click="setLevel(level)"
            >
              {{ $t("lvlSelect.start") }}
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
                <h4>{{ $t("lvlSelect.lvlCompletedTitle") }}</h4>
                <h5>{{ $t("lvlSelect.lvlCompletedText") }}</h5>
              </span>
            </v-tooltip>
            <v-card-title
              v-if="level.bestTimeinSek > 0 && level.bestTimeinSek < 60"
              class="white--text text-subtitle-1"
            >
              {{ $t("lvlSelect.bestTime") }}:
              {{ Math.round(level.bestTimeinSek * 100) / 100 }}
              {{ $t("lvlSelect.seconds") }}
            </v-card-title>
            <v-card-title
              v-if="level.bestTimeinSek > 0 && level.bestTimeinSek >= 60"
              class="white--text text-subtitle-1"
            >
              {{ $t("lvlSelect.bestTime") }}:
              {{ Math.round((level.bestTimeinSek / 60) * 100) / 100 }}
              {{ $t("lvlSelect.minutes") }}
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
    //flickityOptions: Object that sets options for the Flickity carousel plugin.
    flickityOptions: {
      wrapAround: true,
      freeScroll: true,
      prevNextButtons: true,
      pauseAutoPlayOnHover: false,
      groupCells: 1,
    },
    counterText: 0,
  }),

  methods: {
    freeMode() {
      this.$router.push({ path: "/GameViewFreeMode" });
    },
    // Using GSAP library to animate changes to the scale, position, and opacity of the given elements
    hoverEnter(obj) {
      gsap.fromTo(
        obj.target,
        { scale: 1, y: 0 },
        { duration: 0.2, scale: 1.09, y: -10, opacity: 1 }
      );
    },
    hoverLeave(obj) {
      gsap.fromTo(
        obj.target,
        { scale: 1.09 },
        { duration: 0.2, scale: 1, y: 0, x: 0, opacity: 1 }
      );
    },
    // This function paints a specific element in the DOM with the class "painted" by first creating a reference to the element of the templateGrid and then adding the "painted" class to it.
    paint(first, second) {
      let element = document.getElementById("vx" + first + "vy" + second);
      element.classList.add("painted");
    },
    // This function is used to remove the "painted" class from all elements in the DOM that have it, except those of the templateGrid.
    resetPaintedFields() {
      Array.from(document.querySelectorAll(".painted")).forEach((el) => {
        if (!el.id.includes("v")) {
          el.classList.remove("painted");
        }
      });
    },
    // This function sets the selected level and navigates to the GameView route if the level is accessible, otherwise it shows an alert message.
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
    // The showAlertFailure function displays an error alert when the user tries to play a level that has not yet been unlocked
    showAlertFailure(level) {
      this.$swal({
        title: this.$t("alerts.locked.title"),
        html:
          this.$t("alerts.locked.textV1") +
          (level - 1) +
          this.$t("alerts.locked.textV2") +
          level +
          this.$t("alerts.locked.textV3"),
        icon: "error",
        confirmButtonColor: "#6D9E1F",
        confirmButtonText: "Okay!",
        allowOutsideClick: false,
      });
    },
    // checking if a given level is accessible by the user. If it doesn't find one, it returns false, indicating that the level is not accessible.
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
    // Animate all lock icons that appear for levels that are not yet accessible to the player. The animation starts with a random delay between 0 and 3 seconds.
    lockedIconAnimation() {
      for (let i = 0; i < levels.levels.length; i++) {
        let element = document.getElementById("lockIcon" + i);
        gsap
          .timeline({ repeat: -1, delay: Math.random() * 3, repeatDelay: 0.75 })
          .to(element, { duration: 1, rotation: -10, ease: "none" })
          .to(element, { duration: 1, rotation: 20, ease: "none" })
          .to(element, { duration: 1, rotation: -10, ease: "none" })
          .to(element, { duration: 1, rotation: 0, ease: "none" })
          .to(element, { duration: 1, rotation: 10, ease: "none" })
          .to(element, { duration: 1, rotation: 0, ease: "none" });
      }
    },
  },
  mounted() {
    // When the component is mounted, call the 'lockedIconAnimation' function
    this.lockedIconAnimation();
  },

  computed: {
    //returns the levels data stored in local storage, or defaults the first level if local storage is empty
    levels() {
      return (
        JSON.parse(localStorage.getItem("levels")) ||
        Object.values(Object.values(levels)[0])
      );
    },
    accessibleLevels() {
      //returns the accessible levels data stored in local storage, or defaults to the first level if local storage is empty
      return (
        JSON.parse(localStorage.getItem("accessibleLevels")) || [this.levels[0]]
      );
    },
  },
};
</script>
<style scoped>
/* CSS only for Lvl-Select */
.styledDiv.carousel-cell.pa-5.mx-8.v-card.v-sheet.theme--light.elevation-12.mx-auto.my-8 {
  margin-left: 0.5em !important;
  margin-right: 0.5em !important;
}
</style>