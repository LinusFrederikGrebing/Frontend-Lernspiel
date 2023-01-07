<template>
  <div>
    <v-container class="bg-color1">
      <v-row no-gutters>
        <v-col cols="12" sm="6" md="8">
          <GameGrid :color="color"/>
        </v-col>
        <v-col cols="6" md="4">
          <TemplateGrid :currentLevel="currentLevel" :color="color" />
          <CodeInput
            @success="
              nextLevel(currentLevelId);
            "
            @change-color="changeColor"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import CodeInput from "../components/CodeInput.vue";
import GameGrid from "../components/GameGrid.vue";
import TemplateGrid from "../components/TemplateGrid.vue";
import levels from "../../data/levels.json";

export default {
  name: "GameView",
  components: {
    GameGrid,
    CodeInput,
    TemplateGrid,
  },

  data: () => ({
    color: null,
    levels: [],
    currentLevel: null,
    currentLevelId: null,
    hilfenTemp: false,
    accessibleLevels: [],
  }),
  methods: {
    changeColor(clr) {
      this.color = clr;
      Array.from(document.querySelectorAll(".painted")).forEach((el) => {
        el.style.backgroundColor = clr;
        });
    },
    paint(first, second) {
      let element = document.getElementById("vx" + first + "vy" + second);
      element.classList.add("painted");
    },
    nextLevel(indexNextLevel) {
      this.levels[indexNextLevel - 1].completed = true;
      this.currentLevel = this.levels[indexNextLevel];
      this.currentLevelId = this.currentLevel.id;
      localStorage.setItem(
        "currentLevel",
        JSON.stringify(this.currentLevel)
      );
      eval(this.currentLevel.patternCode);
      console.log(this.currentLevel.patternCode);
      localStorage.setItem("levels", JSON.stringify(this.levels));
      Array.from(document.querySelectorAll(".grid-card")).forEach((el) => {
        if (!el.classList.contains("painted")) {
          el.style.backgroundColor = '#ffffff';
        }
      });
      Array.from(document.querySelectorAll(".template-card")).forEach((el) => {
        if (!el.classList.contains("painted")) {
          el.style.backgroundColor = '#ffffff';
        }
      });
      this.startPopUp(this.levels[indexNextLevel]);
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
      let newValIndex = this.accessibleLevels.findIndex((level) => {
        return newVal.id === level.id;
      });
      let oldValIndex = this.accessibleLevels.findIndex((level) => {
        return oldVal.id === level.id;
      });
      if (oldVal !== null && oldVal !== undefined) {
        if (JSON.parse(localStorage.getItem("accessibleLevels")) !== null) {
          this.accessibleLevels = JSON.parse(
            localStorage.getItem("accessibleLevels")
          );
        }
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
      console.log(this.accessibleLevels);
      localStorage.setItem(
        "accessibleLevels",
        JSON.stringify(this.accessibleLevels)
      );
    },
  },
};
</script>

<style>
.line-1{
    border-right: 2px solid rgba(255,255,255,.75);
    white-space: nowrap;
    overflow: hidden;
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
             blinkTextCursor 500ms steps(44) 4s infinite normal;
}
.anim-typewriter5{
  animation: typewriter 1s steps(44) 5s 1 normal both,
             blinkTextCursor 500ms steps(44) 5s infinite normal;
}
@keyframes typewriter{
  from{width: 0;}
  to{width: 27em;}
}
@keyframes blinkTextCursor{
  from{border-right-color: rgba(0, 0, 0, 0.75);}
  to{border-right-color: transparent;}
}</style>
