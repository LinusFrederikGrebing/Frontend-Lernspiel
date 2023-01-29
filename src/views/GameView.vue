<template>
  <div>
    <img id="mouse-cursor" src="../assets/mouse-cursor.png" />
    <v-card
      elevation="24"
      outlined
      shaped
      width="90%"
      class="ml-auto mr-auto gv-card"
    >
      <v-row no-gutters>
        <v-col class="d-flex justify-center" cols="12" sm="8" md="8" lg="7" xl="6">
          <GameGrid :color="color" />
        </v-col>
        <v-col cols="7" md="4" xl="6">
          <div class="d-flex flex-column justify-center align-center mt-8">
            <TemplateGrid :currentLevel="currentLevel" :color="color" />
            <div v-if="currentLevel !== null">
              <hr class="dividerW30 mb-2 mt-2" />
              <div class="d-flex flex-column align-center">
                <h3>- Level {{ currentLevel.id }} -</h3>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <h5 v-bind="attrs" v-on="on">
                      Anforderung: {{ currentLevel.solutionApproach }}
                    </h5>
                  </template>
                  <span
                    >Du musst eine {{ currentLevel.solutionApproach }} benutzen, um
                    das Level {{ currentLevel.id }} abzuschließen!</span
                  >
                </v-tooltip>
              </div>
              <hr class="dividerW30 mt-2 mb-2" />
            </div>
            <div class="">
              <CodeInput
                @success="nextLevel(currentLevelId)"
                @timer="setTime(currentLevelId)"
                @startPopup="nextLevelStarted(currentLevelId)"
                @change-color="changeColor"
                @show-help="isHelpOpen = true"
              />
            </div>
            <v-dialog v-model="isHelpOpen" fullscreen>
              <div class="mt-10">
                <HelpTemplateDesktop
                  @hide-help="isHelpOpen = false"
                  :openHelpFromGame="isHelpOpen"
                  ref="HelpTemplateDesktop"
                ></HelpTemplateDesktop>
              </div>
            </v-dialog>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import CodeInput from "../components/GameviewComponents/CodeInput.vue";
import GameGrid from "../components/GameviewComponents/GameGrid.vue";
import TemplateGrid from "../components/GameviewComponents/TemplateGrid.vue";
import levels from "../../data/levels.json";
import HelpTemplateDesktop from "../components/HelpComponents/HelpTemplateDesktop.vue";

export default {
  name: "GameView",
  // Declare the components used in this component
  components: {
    GameGrid,
    CodeInput,
    TemplateGrid,
    HelpTemplateDesktop,
  },
  // Initialize data properties
  data: () => ({
    startTime: null, // variable to store the starting time of the level
    time: null, // variable to store the time taken to complete the level
    color: "#80ba24", // default color for the game
    levels: [], // array to store all the levels
    currentLevel: null, // variable to store the current level
    hilfenTemp: false, // variable to store the state of the help template
    accessibleLevels: [], // array to store the levels that are accessible to the user
    isHelpOpen: false, // variable to store the state of the help
  }),
  methods: {
    // method to change the color of the game
    changeColor(clr) {
      this.color = clr;
      Array.from(document.querySelectorAll(".painted")).forEach((el) => {
        el.style.backgroundColor = clr;
      });
    },
    // method to show the help template
    showHelp() {
      this.isHelpOpen = true;
    },
    // method to paint a grid cell
    paint(first, second) {
      let element = document.getElementById("vx" + first + "vy" + second);
      element.classList.add("painted");
    },
    // method to set the time taken to complete the level and move to the next level
    setTime(indexNextLevel) {
      this.time = (new Date() - this.startTime) / 1000;
      if (
        this.currentLevel.bestTimeinSek == 0 ||
        this.currentLevel.bestTimeinSek == 0 > this.time
      ) {
        this.levels[indexNextLevel - 1].bestTimeinSek = this.time;
      }
      localStorage.setItem("levels", JSON.stringify(this.levels));
      this.nextLevel(indexNextLevel);
    },
    // nextLevel method is called when the user completes the current level
    nextLevel(indexNextLevel) {
      // set the start time for the next level
      this.startTime = new Date();
      // mark the previous level as completed
      this.levels[indexNextLevel - 1].completed = true;
      // set the current level to the next level
      this.currentLevel = this.levels[indexNextLevel];
      // save the current level in local storage
      localStorage.setItem("currentLevel", JSON.stringify(this.currentLevel));
      // execute the pattern code for the next level
      eval(this.currentLevel.patternCode);
      localStorage.setItem("levels", JSON.stringify(this.levels));
      // reset the grid and template to their initial state
      Array.from(document.querySelectorAll(".grid-card")).forEach((el) => {
        if (!el.classList.contains("painted")) {
          el.style.backgroundColor = "#ffffff";
        }
      });
      Array.from(document.querySelectorAll(".template-card")).forEach((el) => {
        if (!el.classList.contains("painted")) {
          el.style.backgroundColor = "#ffffff";
        } else el.style.backgroundColor = this.color;
      });
    },
    // nextLevelStarted method is called when the user clicks on the next level button
    nextLevelStarted(indexNextLevel) {
      // show the pop-up for the next level
      this.startPopUp(this.levels[indexNextLevel - 1]);
    },
    // startPopUp method shows the pop-up for the current level
    startPopUp(level) {
      this.$swal({
        html: level.description,
        width: 650,
        padding: "3em",
        color: "#000000",
        allowOutsideClick: false,
        confirmButtonColor: "#6D9E1F",
        confirmButtonText: " Weiter! ",
        backdrop: `
          rgba(0,0,0,0.5)
          url(https://www.kennerblick.net/grafik/s/stift09.gif)
          5vw 5vh
          no-repeat
        `,
      });
    },
  },
  // mounted function is called when the component is mounted to the DOM.
  mounted() {
    console.log(this.currentLevel)
    // It sets the start time of the level to the current time
    this.startTime = new Date();

    // check if levels data is present in local storage, if yes, use it
    if (localStorage.getItem("levels") !== null) {
      this.levels = JSON.parse(localStorage.getItem("levels"));
    } else {
      this.levels = Object.values(Object.values(levels)[0]);
    }

    // check if current level data is present in local storage, if yes, use it
    // If not, it sets the levels and currentLevel data properties to the default values.
    if (localStorage.getItem("currentLevel") !== null) {
      this.currentLevel = JSON.parse(localStorage.getItem("currentLevel"));
    } else {
      this.currentLevel = Object.values(Object.values(levels)[0]);
    }
    this.startPopUp(this.currentLevel);
  },

  // watch function is used to watch for changes in the currentLevel data property.
  watch: {
    // When the current level changes, it checks if the previous level was completed and if so, it updates the accessibleLevels data property accordingly.
    currentLevel(newVal, oldVal) {
      if (oldVal !== null && oldVal !== undefined) {
        console.log(oldVal, newVal);
        if (JSON.parse(localStorage.getItem("accessibleLevels")) !== null) {
          this.accessibleLevels = JSON.parse(
            localStorage.getItem("accessibleLevels")
          );
        }
        let newValIndex = this.accessibleLevels.findIndex((level) => {
          return newVal.id === level.id;
        });
        let oldValIndex = this.accessibleLevels.findIndex((level) => {
          return oldVal.id === level.id;
        });
        if (oldValIndex === -1) {
          this.accessibleLevels.push(oldVal);
        } else if (oldValIndex !== -1) {
          this.accessibleLevels[oldValIndex].completed = true;
        }
        if (newValIndex === -1) {
          this.accessibleLevels.push(newVal);
        }
      }
    },
    // It saves the updated accessibleLevels data property in the local storage.
    accessibleLevels() {
      localStorage.setItem(
        "accessibleLevels",
        JSON.stringify(this.accessibleLevels)
      );
    },
  },
};
</script>

<style>
/* CSS only for GameView-Template */
#mouse-cursor {
  position: absolute;
  height: 3vh;
  width: 3vh;
  visibility: hidden;
}
</style>
