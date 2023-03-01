<template>
  <div>
    <img id="mouse-cursor" :src="require(`@/assets/mouse-cursor.png`)" />
    <v-card
      elevation="24"
      outlined
      shaped
      width="90%"
      class="ml-auto mr-auto gv-card"
    >
      <v-row no-gutters>
        <v-col class="d-flex justify-end" xl="6">
          <div id="grid">
            <GameGrid :color="color" ref="gamegrid" />
          </div>
        </v-col>
        <v-col xl="6" class="d-flex flex-column justify-center align-center">
          <hr class="dividerW30 mb-2 mt-2 mb-4" />
          <GameGridSize
            ref="sibling1"
            :gameSize="gameSize"
            @increaseGrid="increaseGrid"
            @decreaseGrid="decreaseGrid"
          />
          <div class="d-flex flex-column align-center mt-4 mb-4">
            <hr class="dividerW30 mb-2 mt-2" />
            <v-btn @click="saveToPng">
              <v-icon width="505" height="500" color="#80ba24"
                >mdi-download</v-icon
              >
              {{ $t("gameViewFreeMode.savepng") }}
            </v-btn>
            <hr class="dividerW30 mb-2 mt-2 mb-4" />
            <div class="free-mode-text d-flex flex-column align-center">
              <h4>{{ $t("gameViewFreeMode.title") }}</h4>
              <span class="caption">{{ $t("gameViewFreeMode.infotext") }}</span>
            </div>
            <hr class="dividerW30 mt-2 mb-2 mt-4" />
          </div>
          <div class="">
            <CodeInput @show-help="isHelpOpen = true" />
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
import domtoimage from "dom-to-image";

export default {
  name: "GameViewFreeMode",
  // Declare the components used in this component
  components: {
    GameGrid,
    CodeInput,
    HelpTemplateDesktop,
    GameGridSize,
  },
  // Initialize data properties
  data: () => ({
    color: "#80ba24", // default color for the game
    hilfenTemp: false, // variable to store the state of the help template
    isHelpOpen: false, // variable to store the state of the help
    gameSize: 0,
  }),
  methods: {
    saveToPng() {
      domtoimage
        .toPng(document.getElementById("grid"))
        .then(function (dataUrl) {
          var link = document.createElement("a");
          link.download = "customPicture.png";
          link.href = dataUrl;
          link.click();
        })
        .catch(function (error) {
          console.error("oops, something went wrong!", error);
        });
    },
    // method to show the help template
    showHelp() {
      this.isHelpOpen = true;
    },
    increaseGrid() {
      this.$refs.gamegrid.increaseGridSize();
    },
    decreaseGrid() {
      this.$refs.gamegrid.decreaseGridSize();
    },
  },
  // mounted function is called when the component is mounted to the DOM.
  mounted() {
    this.gameSize = this.$refs.gamegrid.gridSize;
    this.$watch(
      () => this.$refs.gamegrid.gridSize,
      (newValue) => {
        this.gameSize = newValue;
      }
    );
  },

  watch: {},
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

.free-mode-text {
  width: 25em;
  text-align: center;
}
</style>
