<template>
  <v-container class="containerpadding">
    <v-card
      elevation="24"
      outlined
      shaped
      width="120em"
      height="5em"
      class="header">
       <h1 class="h1 font-weight-black"> - Tutorial - </h1>
    </v-card>
    <v-card
      elevation="10"
      outlined
     height="100%"
      width="100%"
      class="">
        <div class="d-lg-flex justify-lg-center tutorial">
        <div class="container2">
          <v-card elevation="24" width="30em">
              <v-row no-gutters v-for="y in 4" :key="y" class="">
                    <v-col no-gutters v-for="x in 4" :key="x">
                      <transition>
                        <v-card class="cardgrid" elevation="2" :id="'xTutorial' + (x - 1) + 'yTutorial' + (y - 1)"></v-card>
                      </transition>
                    </v-col>
              </v-row>
            </v-card>
        </div>
        <div class="editor">
        <CodeEditor
          :read_only="true"
            font_size="37px"
            height="440px"
            width="100%"
            v-model="actualCodeToRun"
          >
          </CodeEditor>
            <v-btn color="warning" depressed elevation="2">
              Validieren
            </v-btn>
            <v-btn
              color="success"
              depressed
              elevation="2"
            >
              Ausführen
            </v-btn>
        </div>
      </div>
  </v-card>
  </v-container>
</template>

<script>
import CodeEditor from "simple-code-editor";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default {
  name: "OnePagerTutorialSection",
  components: {
    CodeEditor,
  },
  data: () => {
    return {
      codeToRun: "paint(1,1);",
      actualCodeToRun: "",
      timerTutorialAnimation: null,
      paintTutorialAnimation: null

    };
  },
  methods: {
    delay(time) {
     return new Promise(resolve => setTimeout(resolve, time));
    },
    tutorialAnimation(){
        let steps = 250;
          for(let i = 0; i<=this.codeToRun.length; i++){
          this.timerTutorialAnimation = this.delay(steps).then(() =>  this.actualCodeToRun = this.codeToRun.substring(0, i));
            steps=steps+250;
          };
          this.paintTutorialAnimation = this.delay(3500).then(() => this.paintTutorialField(1,1));        
    },

    paintTutorialField(first, second) {
      let element = document.getElementById("xTutorial" + first + "yTutorial" + second);
      element.style.backgroundColor = '#80ba24';
      element.classList.add("painted");
    },

    resetPaintedFields() {
      clearTimeout(this.timerTutorialAnimation);
      clearTimeout(this.paintTutorialAnimation);
      this.actualCodeToRun = "";
      Array.from(document.querySelectorAll(".painted")).forEach((el) => {
        if (el.id.includes("Tutorial")) {
          el.classList.remove("painted");
          el.style.backgroundColor = '#ffffff';
        }
      });
    },
  },
  mounted() { 
    gsap.fromTo(
       ".tutorial",
        {
          x: 1900
        },
        {
          duration: 2,
          x: 0,
          scrollTrigger: {
            trigger: ".tutorial",
            start: "top 100%",
            end: "bottom 0%",
            toggleActions: "play reset play reset "
          },
        }
      );

      gsap.to(
       ".editor",
        {
          duration: 2,
          x: 0,
          scrollTrigger: {
            trigger:  ".editor",
            onEnter: this.tutorialAnimation,
            onLeave: this.resetPaintedFields,
            onEnterBack:  this.tutorialAnimation,
            onLeaveBack:  this.resetPaintedFields
          },
        }
      );
  }
}
</script>

<style scoped>

.header {
  margin-top: 10em;
}
.tutorial {
  margin-top: 5em;
  margin-bottom: 10em;
}
.container{
  height: 100% !important;
}
.editor{
  margin-left: 4em;
  width: 30vw;
  max-width: 30em;
}
.col {
  flex-basis: 0.1 !important;
  flex-grow: 0 !important;
  /* max-width: 100%; */
}

.container2 {
  margin-left: 3em;
  display: flex;
  flex-direction: column;
}
.cardgrid {
  width: 7.5em;
  height: 7.5em;
}

@media only screen and (min-device-width: 0px) and (max-device-width: 1900px) {
  .container2{
    margin-left: 13em;
    text-align: center;
  }
  .editor{
    margin-top: 2em;
    margin-left: 2em;
  }
}
</style>