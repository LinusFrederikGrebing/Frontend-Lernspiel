<template>
  <v-container class="containerpadding">
  <v-card
    class="header"
    elevation="24"
    outlined
    shaped
    width="120em"
    height="5em"
  >
    <h1 class="h1 font-weight-black"> - Tutorial - </h1>
  </v-card>
  <v-card
    class=""
    elevation="10"
    outlined
    height="100%"
    width="100%"
  >
    <div class="d-lg-flex justify-lg-center tutorial text-center">
      <div>
        <v-card
          class="text-center mr-auto ml-auto"
          elevation="24"
          :class="[
            { 'cardgrid_container_mdAndUp': $vuetify.breakpoint.mdAndUp },
            { 'cardgrid_container_sm': $vuetify.breakpoint.sm },
            { 'cardgrid_container_xs': $vuetify.breakpoint.xs }
          ]"
        >
          <v-row no-gutters v-for="y in 4" :key="y">
            <v-col no-gutters v-for="x in 4" :key="x">
              <transition>
                <v-card
                  :class="[
                    { 'cardgrid_mdAndUp': $vuetify.breakpoint.mdAndUp },
                    { 'cardgrid_sm': $vuetify.breakpoint.sm },
                    { 'cardgrid_xs': $vuetify.breakpoint.xs }
                  ]"
                  elevation="2"
                  :id="'xTutorial' + (3 - x) + 'yTutorial' + (4 - y)"
                ></v-card>
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
        ></CodeEditor>
        <v-btn color="warning" depressed elevation="2">Validieren</v-btn>
        <v-btn color="success" depressed elevation="2">Ausführen</v-btn>
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
    tutorialAnimation() {
    for (let i = 0; i <= this.codeToRun.length; i++) {
      this.timerTutorialAnimation = setTimeout(() => this.actualCodeToRun = this.codeToRun.substring(0, i), i * 250);
    }
      this.paintTutorialAnimation = setTimeout(() => this.paintTutorialField(1, 1), 3500);
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
        let paintedElements = document.querySelectorAll('.painted');
        paintedElements.forEach(el => {
            if (el.id.includes("Tutorial")) {
                el.classList.remove("painted");
                el.style.backgroundColor = '#ffffff';
            }
        });
  }
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
.test{
  margin:0 auto !important;
}
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
  margin-left: 1em;
  width: 95%;
}
.col {
  flex-basis: 0.1 !important;
  flex-grow: 0 !important;
  /* max-width: 100%; */
}

.cardgrid_mdAndUp {
  width: 7.5em;
  height: 7.5em;
}

.cardgrid_container_mdAndUp {
  width: 30em;
  height: 30em;
}

.cardgrid_sm {
  width: 5.5em;
  height: 5.5em;
}

.cardgrid_container_sm {
  width: 22em;
  height: 22em;
}

.cardgrid_xs {
  width: 3.5em;
  height: 3.5em;
}
.cardgrid_container_xs {
  width: 14em;
  height: 14em;
}
</style>