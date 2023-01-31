<template>
  <v-container>
    
  <v-card
    elevation="24"
    outlined
    shaped
    width="120em"
    height="5em"
  >
    <h1 class="section_header font-weight-black"> - {{ $t("navigation.tutorial") }} - </h1>
  </v-card>
  <v-card
    elevation="10"
    outlined
    width="100%"
  >
    <div class="d-lg-flex justify-lg-center tutorial text-center">
      <div class="ml-16">
        <v-card
          class="text-center mr-auto ml-auto"
          id="cardgrid-container-tutorial-op"
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
      <div class="editor_in_Tutorial mr-16">
        <CodeEditor
          :read_only="true"
          font_size="37px"
          height="440px"
          width="100%"
          v-model="actualCodeToRun"
        ></CodeEditor>
        <v-btn id="validate-btn" color="warning" depressed elevation="2">{{ $t("message.validate") }}</v-btn>
        <v-btn id="finished-btn" color="success" depressed elevation="2">{{ $t("message.run") }}</v-btn>
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
      if( document.querySelector("#alert-for-op-tutorial")){
        document.querySelector("#alert-for-op-tutorial").style.visibility = "hidden";
      }
      let tutorial = document.getElementById("popupContainer");
      tutorial.classList.remove("test");
        console.log(tutorial)

      for (let i = 0; i <= this.codeToRun.length; i++) {
        this.timerTutorialAnimation = setTimeout(() => this.actualCodeToRun = this.codeToRun.substring(0, i), i * 250);
      }
        this.cursorTutorialAnimation = setTimeout(() => this.cursorToFinishedAnimation(), 3500);
    },

    cursorToFinishedAnimation() {
      let timelineToButton = gsap.timeline({repeat: 0, repeatDelay: 0, });
      let finishedButton = document.querySelector("#finished-btn");
      let finishedButtonRect = finishedButton.getBoundingClientRect();
      let header = document.querySelector('.header');
      let sidebar = document.querySelector('#sidebar');
      let headerHeight = parseInt(header.offsetHeight);
      let sidebarWidth = 0;
      let yOffset = 701 - finishedButtonRect.bottom;
      if (sidebar.classList.contains("drawer-open")) sidebarWidth = parseInt(sidebar.offsetWidth);

      let gridContainer = document.querySelector("#cardgrid-container-tutorial-op");
      let codeEditor = document.querySelector(".editor_in_Tutorial");

      //Reset Mouse-Cursor Start Position
      gsap.to("#mouse-cursor-op", {duration: 0, x: 0, y: 0});
      //Calculate Absolute x,y Coordinates
      let x =  parseInt(finishedButton.offsetWidth) / 2 - sidebarWidth;
      let y =  parseInt(finishedButton.offsetHeight) / 2 - headerHeight - scrollY + yOffset;
      //Check if Grid-Container is placed over the code-editor
      if (gridContainer.getBoundingClientRect().top < codeEditor.getBoundingClientRect().top) y += codeEditor.getBoundingClientRect().top - gridContainer.getBoundingClientRect().top;
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
        this.cursorToValidateAnimation();
      })

    },

    cursorToValidateAnimation() {
      let timelineToButton = gsap.timeline({repeat: 0, repeatDelay: 0, });
      let validateButton = document.querySelector("#validate-btn");
      let validateButtonRect = validateButton.getBoundingClientRect();
      let header = document.querySelector('.header');
      let sidebar = document.querySelector('#sidebar');
      let headerHeight = parseInt(header.offsetHeight);
      let sidebarWidth = 0;
      let yOffset = 701 - validateButtonRect.bottom;
      if (sidebar.classList.contains("drawer-open")) sidebarWidth = parseInt(sidebar.offsetWidth);

      let gridContainer = document.querySelector("#cardgrid-container-tutorial-op");
      let codeEditor = document.querySelector(".editor_in_Tutorial");
      
      //Calculate Absolute x,y Coordinates
      let x =  parseInt(validateButton.offsetWidth) / 2 - sidebarWidth;
      let y =  parseInt(validateButton.offsetHeight) / 2 - headerHeight - scrollY + yOffset;
      if (gridContainer.getBoundingClientRect().top < codeEditor.getBoundingClientRect().top) y += codeEditor.getBoundingClientRect().top - gridContainer.getBoundingClientRect().top;
      while (validateButton && !isNaN(validateButton.offsetLeft) && !isNaN(validateButton.offsetTop)) {
      x += validateButton.offsetLeft - validateButton.scrollLeft;
      y += validateButton.offsetTop - validateButton.scrollTop;
      validateButton = validateButton.offsetParent;
      }
      //Animate the Cursor
      timelineToButton.to("#mouse-cursor-op", {duration: 1, x: x, y: y, visibility: "visible", zIndex: 4});
      timelineToButton.to("#mouse-cursor-op", {duration: 0.2, scale: 0.5, yoyo: true, repeat: 1, ease: "power1.inOut", delay: 0.5,});
      timelineToButton.eventCallback("onComplete", () => {
        document.querySelector("#mouse-cursor-op").style.visibility = "hidden";
        this.showTutorialPopup();
      })
    },

    showTutorialPopup() {
      let gridContainer = document.querySelector("#cardgrid-container-tutorial-op");
      let codeEditor = document.querySelector(".editor_in_Tutorial");
      let codeEditorRect = codeEditor.getBoundingClientRect();
      let header = document.querySelector('.header');
      let sidebar = document.querySelector('#sidebar');
      let headerHeight = parseInt(header.offsetHeight);
      let sidebarWidth = 0;
      let yOffset = 701 - codeEditorRect.bottom;
      let tutorial = document.getElementById("popupContainer");
      tutorial.classList.add("test");
      if (sidebar.classList.contains("drawer-open")) sidebarWidth = parseInt(sidebar.offsetWidth);
      let x =  parseInt(codeEditor.offsetWidth) / 2 - sidebarWidth;
      let y =  parseInt(codeEditor.offsetHeight) / 2 - headerHeight - scrollY + yOffset;
      while (codeEditor && !isNaN(codeEditor.offsetLeft) && !isNaN(codeEditor.offsetTop)) {
      x += codeEditor.offsetLeft - codeEditor.scrollLeft;
      y += codeEditor.offsetTop - codeEditor.scrollTop;
      codeEditor = codeEditor.offsetParent;
      }
      let alert = document.querySelector("#alert-for-op-tutorial");
      if (gridContainer.classList.contains("cardgrid_container_xs")) alert.style.width = "70vw";
      gsap.to("#alert-for-op-tutorial", {duration: 0, x: (x-(alert.width/2)), y: (y-(alert.height/2)), visibility: "visible", zIndex: 5});

      setTimeout(() => {
         this.resetPaintedFields(); 
        }, 1500);
     setTimeout(() => {
         this.tutorialAnimation(); 
        }, 1550);
    },

    paintTutorialField(first, second) {
      let element = document.getElementById("xTutorial" + first + "yTutorial" + second);
      element.classList.add("painted");
    },

    resetPaintedFields() {
        clearTimeout(this.timerTutorialAnimation);
        clearTimeout(this.cursorTutorialAnimation);
        this.actualCodeToRun = "";
        let paintedElements = document.querySelectorAll('.painted');
        paintedElements.forEach(el => {
            if (el.id.includes("Tutorial")) {
                el.classList.remove("painted");
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