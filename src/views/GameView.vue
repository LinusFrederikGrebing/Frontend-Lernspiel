<template>
  <div> 
    <v-card elevation="24" outlined shaped width="90%" class="ml-auto mr-auto gv-card">
    <img id="mouse-cursor" src="../assets/mouse-cursor.png"> 

      <v-row no-gutters>
        <v-col cols="12" sm="8" md="8" lg="7" xl="6">
            <GameGrid :color="color"/>
        </v-col>
        <v-col cols="7" md="4" xl="6">
          <div class="d-flex flex-column justify-center align-center mt-8">
            <TemplateGrid :currentLevel="currentLevel" :color="color" />
            <div>
              <hr class="divider mb-2 mt-2" />
                <div class="d-flex flex-column align-center">
                  <h3 class="">- Level {{ currentLevel.id }} -</h3>
                  <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">  
                    <h5 v-bind="attrs"
                      v-on="on">Anforderung: {{ currentLevel.loesungsweg }} </h5>
                  </template>
                  <span>Du musst eine {{ currentLevel.loesungsweg }} benutzen, um das Level {{ currentLevel.id }} abzuschließen!</span>
                </v-tooltip>
                </div>
              <hr class="divider mt-2 mb-2" />
            </div>
            <div class="">
                <CodeInput
                  @success=" nextLevel(currentLevelId);"
                  @timer="setTime(currentLevelId)"
                  @startPopup="nextLevelStarted(currentLevelId)"
                  @change-color="changeColor"
                  @show-help="isHelpOpen = true"
                />
            </div>
            <v-dialog v-model="isHelpOpen" fullscreen>
              <div class="mt-10">
                <HelpTemplateDesktop @hide-help="isHelpOpen = false" :openHelpFromGame="isHelpOpen" ref="HelpTemplateDesktop"></HelpTemplateDesktop>
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
  components: {
    GameGrid,
    CodeInput,
    TemplateGrid,
    HelpTemplateDesktop,
  },

  data: () => ({
    startTime: null,
    time: null,
    color: '#80ba24',
    levels: [],
    currentLevel: null,
    currentLevelId: null,
    hilfenTemp: false,
    accessibleLevels: [],
    isHelpOpen: false,
  }),
  methods: {
    changeColor(clr) {
      this.color = clr;
      Array.from(document.querySelectorAll(".painted")).forEach((el) => {
        el.style.backgroundColor = clr;
      });
    },

    showHelp() {
      this.isHelpOpen = true;
    },

    paint(first, second) {
      let element = document.getElementById("vx" + first + "vy" + second);
      element.classList.add("painted");
    },

    setTime(indexNextLevel){
      this.time = (new Date() - this.startTime)/1000;
      if(this.currentLevel.bestTimeinSek == 0 || this.currentLevel.bestTimeinSek == 0 > this.time) {
        this.levels[indexNextLevel - 1].bestTimeinSek = this.time;
      }
      localStorage.setItem(
        "levels", 
        JSON.stringify(this.levels)
      );
      this.nextLevel(indexNextLevel)
    },
    nextLevel(indexNextLevel) {
      this.startTime = new Date();
      this.levels[indexNextLevel - 1].completed = true;
      this.currentLevel = this.levels[indexNextLevel];
      this.currentLevelId = this.currentLevel.id;
      localStorage.setItem(
        "currentLevel",
        JSON.stringify(this.currentLevel)
      );
      eval(this.currentLevel.patternCode);
      localStorage.setItem(
        "levels", 
        JSON.stringify(this.levels)
      );
      Array.from(document.querySelectorAll(".grid-card")).forEach((el) => {
        if (!el.classList.contains("painted")) {
          el.style.backgroundColor = '#ffffff';
        }
      });
      Array.from(document.querySelectorAll(".template-card")).forEach((el) => {
        if (!el.classList.contains("painted")) {
          el.style.backgroundColor = '#ffffff';
        } else el.style.backgroundColor = this.color;
      });
    },
    nextLevelStarted(indexNextLevel){
      this.startPopUp(this.levels[indexNextLevel-1]);
    },
    startPopUp(level){
      this.$swal({
        html:
        level.description,
        width: 650,
        padding: '3em',
        color: '#000000',
        allowOutsideClick: false,
        confirmButtonColor: '#6D9E1F',
        confirmButtonText: ' Weiter! ',
        backdrop: `
          rgba(0,0,0,0.5)
          url(https://www.kennerblick.net/grafik/s/stift09.gif)
          5vw 5vh
          no-repeat
        `
      });
   },
  },

  mounted() {
    this.startTime = new Date();

    if (localStorage.getItem("levels") !== null) {
      this.levels = JSON.parse(localStorage.getItem("levels"));
    } else {
      this.levels = Object.values(Object.values(levels)[0]);
    }

    if (localStorage.getItem("currentLevel") !== null) {
      this.currentLevel = JSON.parse(localStorage.getItem("currentLevel"));
    } else {
      this.currentLevel = Object.values(Object.values(levels)[0]);
    }
    this.currentLevelId = this.currentLevel.id;
    console.log(this.currentLevel);
    this.startPopUp(this.currentLevel);
  },
  
 
  watch: {
    currentLevel(newVal, oldVal) {
      if (oldVal !== null && oldVal !== undefined) {
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
.green{
  background-color: green;
}
.red{
  background-color: red;
}
.yellow{
  background-color: yellow;
  width: 100%;
}
.divider {
  opacity: 1;
  width: 30em;
  border-radius: 100%;
}
.gv-card{
  background-color: rgb(236, 236, 236) !important;
}
.line-1{
    border-right: 2px solid rgba(255,255,255,.75);
    white-space: nowrap;
    overflow: hidden;
}

#mouse-cursor {
  position: absolute;
  height: 3vh;
  width: 3vh;
  visibility: hidden;
}

/* Animation */
.anim-typewriter1{
  animation: typewriter 1s steps(44) 0s 1 normal both,
             blinkTextCursor 500ms steps(44) 0s normal;
}
.anim-typewriter2{
  animation: typewriter 1s steps(44) 1s 1 normal both,
             blinkTextCursor 500ms steps(44) 1s normal;
}
.anim-typewriter3{
  animation: typewriter 1s steps(44) 2s 1 normal both,
             blinkTextCursor 500ms steps(44) 2s normal;
}
.anim-typewriter4{
  animation: typewriter 1s steps(44) 3s 1 normal both,
             blinkTextCursor 500ms steps(44) 3s normal;
}
.anim-typewriter5{
  animation: typewriter 1s steps(44) 4s 1 normal both,
             blinkTextCursor 500ms steps(44) 4s normal;
}
.anim-typewriter6{
  animation: typewriter 1s steps(44) 5s 1 normal both,
             blinkTextCursor 500ms steps(44) 5s normal;
}
@keyframes typewriter{
  from{width: 0;}
  to{width: 27em;}
}
@keyframes blinkTextCursor{
  from{border-right-color: rgba(0, 0, 0, 0.75);}
  to{border-right-color: transparent;}
}</style>
