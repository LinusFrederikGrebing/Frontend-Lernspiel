<template>
  <v-container>
  <v-card
    elevation="24"
    outlined
    shaped
    width="120em"
    height="5em"
  >
    <h1 class="h1 font-weight-black"> - Tutorial - </h1>
  </v-card>
  <v-card
    elevation="10"
    outlined
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
      <div class="editor_in_Tutorial">
        <CodeEditor
          :read_only="true"
          font_size="37px"
          height="440px"
          width="100%"
          v-model="actualCodeToRun"
        ></CodeEditor>
        <v-btn id="finished-btn" color="warning" depressed elevation="2">Validieren</v-btn>
        <v-btn id="validate-btn" color="success" depressed elevation="2">Ausführen</v-btn>
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
      paintTutorialAnimation: null,
      cursorTutorialAnimation: null,

    };
  },
  methods: {
    tutorialAnimation() {
    for (let i = 0; i <= this.codeToRun.length; i++) {
      this.timerTutorialAnimation = setTimeout(() => this.actualCodeToRun = this.codeToRun.substring(0, i), i * 250);
    }
      this.cursorTutorialAnimation = setTimeout(() => this.cursorAnimation(), 3500);
    },

    cursorAnimation() {
      let timelineToButton = gsap.timeline({repeat: 0, repeatDelay: 0, });
      let finishedButton = document.querySelector("#finished-btn");
      let finishedButtonRect = finishedButton.getBoundingClientRect();
      let header = document.querySelector('.header');
      let sidebar = document.querySelector('#sidebar');
      let headerHeight = parseInt(header.offsetHeight);
      let sidebarWidth = 0;
      let padding = parseInt(document.querySelector('.v-parallax__content').offsetWidth) - parseInt(document.querySelector('.containerpadding').offsetWidth);
      let yOffset = finishedButtonRect.bottom;
      if (sidebar.classList.contains("drawer-open")) sidebarWidth = parseInt(sidebar.offsetWidth);

      //Reset Mouse-Cursor Start Position
      gsap.to("#mouse-cursor-op", {duration: 0, x: 0, y: 0});
      //Calculate Absolute x,y Coordinates
      let x =  parseInt(finishedButton.offsetWidth) / 2 - sidebarWidth + padding * 2;
      let y =  parseInt(finishedButton.offsetHeight) / 2 - headerHeight - scrollY;
      while (finishedButton && !isNaN(finishedButton.offsetLeft) && !isNaN(finishedButton.offsetTop)) {
      x += finishedButton.offsetLeft - finishedButton.scrollLeft;
      y += finishedButton.offsetTop - finishedButton.scrollTop;
      finishedButton = finishedButton.offsetParent;
      }
      //Animate the Cursor
      timelineToButton.to("#mouse-cursor-op", {duration: 3, x: x, y: y, visibility: "visible", zIndex: 4});
      timelineToButton.to("#mouse-cursor-op", {duration: 0.2, scale: 0.5, yoyo: true, repeat: 1, ease: "power1.inOut", delay: 0.5,});
      timelineToButton.eventCallback("onComplete", () => {
        this.paintTutorialField(1, 1);
        document.querySelector("#mouse-cursor-op").style.visibility = "hidden";
      })

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
       ".editor_in_Tutorial",
        {
          duration: 2,
          scrollTrigger: {
            trigger:  ".editor_in_Tutorial",
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
/* CSS only fpr Tutorial-Section */
#mouse-cursor-op {
  position: absolute;
  height: 3vh;
  width: 3vh;
  visibility: hidden;
  z-index: 20;
}
.tutorial {
  margin-top: 5em;
  margin-bottom: 10em;
}
.editor_in_Tutorial{
  margin-left: 1em;
  width: 95%;
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