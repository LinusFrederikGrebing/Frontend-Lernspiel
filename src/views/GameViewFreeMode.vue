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
        <v-col class="d-flex justify-end" cols="12" sm="8" md="8" lg="7" xl="6">
          <GameGrid :color="color" ref="sibling2"/>
        </v-col>
        <v-col cols="7" md="4" xl="6" class="d-flex flex-column justify-center align-center">
          <div class="">
            <GameGridSize ref="sibling1" @increaseGrid="increaseGrid" @decreaseGrid="decreaseGrid"/>
            <div class="d-flex flex-column align-center mt-4 mb-4">
              <hr class="dividerW30 mb-2 mt-2 mb-4"  />
                <div class="freeModeText d-flex flex-column align-center">
                  <h3>Freier Modus!</h3>
                  <span>Du befindest dich im freien Modus. Hier kannst du ganz nach Belieben deine eigenen Muster zusammenstellen, Schleifen ausprobieren, Funktionen testen oder dich auf kommende Level vorbereiten. Viel Spaß!</span>
                </div>
               <hr class="dividerW30 mt-2 mb-2 mt-4" />
            </div>
            <div class="ml-12">
              <CodeInput
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
import GameGridSize from "../components/GameviewComponents/GameGridSize.vue";
import HelpTemplateDesktop from "../components/HelpComponents/HelpTemplateDesktop.vue";

export default {
  name: "GameViewFreeMode",
  // Declare the components used in this component
  components: {
    GameGrid,
    CodeInput,
    HelpTemplateDesktop,
    GameGridSize
  },
  // Initialize data properties
  data: () => ({
    color: "#80ba24", // default color for the game
    hilfenTemp: false, // variable to store the state of the help template
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
    increaseGrid() {
      this.$refs.sibling2.increaseGridSize()
    },
    decreaseGrid() {
      this.$refs.sibling2.decreaseGridSize()
    }
  },
  // mounted function is called when the component is mounted to the DOM.
  mounted() {
   
  },

  watch: {
  
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

.freeModeText {
  width: 25em;
  text-align: center;
}
</style>
