<template>
  <v-container class="">
    <div>
      <v-card elevation="24" height="55em" outlined shaped class="container">
        <h1 class="section_header font-weight-black">
          - {{ $t("navigation.helpHeader") }} -
        </h1>
        <v-btn
          class="back-btn"
          depressed
          elevation="2"
          @click="hideHelp"
          v-if="openHelpFromGame"
        >
          <svg
            style="color: white"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="currentColor"
            class="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              fill="white"
            ></path>
          </svg>
        </v-btn>
        <v-container>
          <div class="general-content js-general-content">
            <div class="general-component">
              <div
                class="component"
                v-for="item in informations"
                :key="item.id"
              >
                <div>
                  <div class="component-internal">
                    <div class="initial-visual-component">
                      <div>
                        <h2 class="white--text text-body-2 text-sm-h5 my-4">
                          {{ item.label }}
                        </h2>
                      </div>
                    </div>
                    <div class="component-content">
                      <div class="component-close-button"></div>
                      <v-card class="mx-auto my-10 card" elevation="20">
                        <div class="container-image-chapter-open">
                          <div class="image">
                            <v-img :src="item.src" contain></v-img>
                            <h2 class="h2pop white--text text-h4 text-md-h3">
                              <i>{{ item.label }}!</i>
                            </h2>
                          </div>
                        </div>
                        <v-card-title>
                          {{ item.title }}
                        </v-card-title>
                        <v-card-text class="black--text">
                          {{ item.textSection }}
                        </v-card-text>
                        <hr class="divider" />
                        <v-card-title>
                          {{ item.subHeader }}
                        </v-card-title>
                        <v-card-text class="black--text">
                          {{ item.subText }}
                        </v-card-text>
                        <hr class="divider" />
                        <v-card-title> {{ $t("help.example") }}: </v-card-title>
                        <div class="d-md-flex">
                          <v-img
                            :src="item.example"
                            class="ml-4 mr-8"
                            max-height="100px"
                            contain
                          ></v-img>
                          <v-card-text class="black--text mr-8">
                            {{ item.exampleText }}
                          </v-card-text>
                        </div>
                        <hr class="divider mt-8" />
                        <v-card-actions>
                          <v-btn
                            color="orange lighten-2 my-2 mr-8"
                            @click="openInNewTab($event, item.documentation)"
                            @click.middle="
                              openInNewTab($event, item.documentation)
                            "
                          >
                            W3schools Dokumentation
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </div>
                  </div>
                </div>
                <div class="component-index">
                  <div class="component-index-back">{{ item.id }}</div>
                  <div class="component-index-front"></div>
                </div>
              </div>
            </div>
          </div>
        </v-container>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "HelptemplateDesktop",
  props: {
    openHelpFromGame: Boolean,
  },
  data() {
    return {
      informations: [
        {
          id: 1,
          label: this.$t("help.variables.var"),
          title: this.$t("help.variables.varTitle"),
          src: require("../../assets/helpTemplateBackground.png"),
          textSection: this.$t("help.variables.varTextSec1"),
          subHeader: this.$t("help.variables.varSubHeader"),
          subText: this.$t("help.variables.varSubText"),
          example: require("../../assets/varExample.png"),
          exampleText: this.$t("help.variables.varExampleText"),
          documentation: "https://www.w3schools.com/js/js_variables.asp",
        },
        {
          id: 2,
          label: this.$t("help.function.function"),
          title: this.$t("help.function.functionTitle"),
          src: require("../../assets/helpTemplateBackground.png"),
          textSection: this.$t("help.function.functionTextSec1"),
          subHeader: this.$t("help.function.functionSubHeader"),
          subText: this.$t("help.function.functionSubText"),
          example: require("../../assets/functionExample.jpg"),
          exampleText: this.$t("help.function.functionExampleText"),
          documentation: "https://www.w3schools.com/js/js_functions.asp",
        },
        {
          id: 3,
          label: this.$t("help.for.for"),
          title: this.$t("help.for.forTitle"),
          src: require("../../assets/helpTemplateBackground.png"),
          textSection: this.$t("help.for.forTextSec1"),
          subHeader: this.$t("help.for.forSubHeader"),
          subText: this.$t("help.for.forSubText"),
          example: require("../../assets/forExample.jpg"),
          exampleText: this.$t("help.for.forExampleText"),
          documentation: "https://www.w3schools.com/js/js_loop_for.asp",
        },
        {
          id: 4,
          label: this.$t("help.while.while"),
          title: this.$t("help.while.whileTitle"),
          src: require("../../assets/helpTemplateBackground.png"),
          textSection: this.$t("help.while.whileTextSec1"),
          subHeader: this.$t("help.while.whileSubHeader"),
          subText: this.$t("help.while.whileSubText"),
          example: require("../../assets/whileExample.jpg"),
          exampleText: this.$t("help.while.whileExampleText"),
          documentation: "https://www.w3schools.com/js/js_loop_while.asp",
        },
        {
          id: 5,
          label: this.$t("help.dowhile.do"),
          title: this.$t("help.dowhile.doTitle"),
          src: require("../../assets/helpTemplateBackground.png"),
          textSection: this.$t("help.dowhile.doTextSec1"),
          subHeader: this.$t("help.dowhile.doSubHeader"),
          subText: this.$t("help.dowhile.doSubText"),
          example: require("../../assets/dowhileExample.jpg"),
          exampleText: this.$t("help.dowhile.doExampleText"),
          documentation: "https://www.w3schools.com/jsref/jsref_dowhile.asp",
        },
      ],
    };
  },
  watch: {
    "$i18n.locale": {
      handler() {
        this.informations = [
          {
            id: 1,
            label: this.$t("help.variables.var"),
            title: this.$t("help.variables.varTitle"),
            src: require("../../assets/helpTemplateBackground.png"),
            textSection: this.$t("help.variables.varTextSec1"),
            subHeader: this.$t("help.variables.varSubHeader"),
            subText: this.$t("help.variables.varSubText"),
            example: require("../../assets/varExample.png"),
            exampleText: this.$t("help.variables.varExampleText"),
            documentation: "https://www.w3schools.com/js/js_variables.asp",
          },
          {
            id: 2,
            label: this.$t("help.function.function"),
            title: this.$t("help.function.functionTitle"),
            src: require("../../assets/helpTemplateBackground.png"),
            textSection: this.$t("help.function.functionTextSec1"),
            subHeader: this.$t("help.function.functionSubHeader"),
            subText: this.$t("help.function.functionSubText"),
            example: require("../../assets/functionExample.jpg"),
            exampleText: this.$t("help.function.functionExampleText"),
            documentation: "https://www.w3schools.com/js/js_functions.asp",
          },
          {
            id: 3,
            label: this.$t("help.for.for"),
            title: this.$t("help.for.forTitle"),
            src: require("../../assets/helpTemplateBackground.png"),
            textSection: this.$t("help.for.forTextSec1"),
            subHeader: this.$t("help.for.forSubHeader"),
            subText: this.$t("help.for.forSubText"),
            example: require("../../assets/forExample.jpg"),
            exampleText: this.$t("help.for.forExampleText"),
            documentation: "https://www.w3schools.com/js/js_loop_for.asp",
          },
          {
            id: 4,
            label: this.$t("help.while.while"),
            title: this.$t("help.while.whileTitle"),
            src: require("../../assets/helpTemplateBackground.png"),
            textSection: this.$t("help.while.whileTextSec1"),
            subHeader: this.$t("help.while.whileSubHeader"),
            subText: this.$t("help.while.whileSubText"),
            example: require("../../assets/whileExample.jpg"),
            exampleText: this.$t("help.while.whileExampleText"),
            documentation: "https://www.w3schools.com/js/js_loop_while.asp",
          },
          {
            id: 5,
            label: this.$t("help.dowhile.do"),
            title: this.$t("help.dowhile.doTitle"),
            src: require("../../assets/helpTemplateBackground.png"),
            textSection: this.$t("help.dowhile.doTextSec1"),
            subHeader: this.$t("help.dowhile.doSubHeader"),
            subText: this.$t("help.dowhile.doSubText"),
            example: require("../../assets/dowhileExample.jpg"),
            exampleText: this.$t("help.dowhile.doExampleText"),
            documentation: "https://www.w3schools.com/jsref/jsref_dowhile.asp",
          },
        ];
      },
    },
  },
  methods: {
    // The function openInNewTab opens a new tab with the given URL after 100 milliseconds and sets focus to it, while also preventing the default event from occurring.
    openInNewTab(event, url) {
      event.preventDefault();
      setTimeout(function () {
        var win = window.open(url, "_blank");
        win.focus();
      }, 100);
    },
    // The function "hideHelp()" emits an event 'hide-help' to its parent component, which can listen for this event and hiding the help element from the view.
    hideHelp() {
      this.$emit("hide-help");
    },
  },
  mounted() {
    // JS for HelpTemplate-Animation
    var generalcontent = document.querySelector(".general-content");
    var arraycontent = [].slice.call(document.querySelectorAll(".component"));
    var closebuttons = [].slice.call(
      document.querySelectorAll(".component-close-button")
    );
    //Remove the class "js-general-content" from general content after 200ms
    setTimeout(function () {
      generalcontent.classList.remove("js-general-content");
    }, 200);
    //Add click event listener to all components, when component is clicked
    //add "component-active" class to component and "component--active" class to general content
    arraycontent.forEach(function (component) {
      component.addEventListener("click", function () {
        if (this.classList.contains("component-active")) return;
        generalcontent.classList.add("component--active");
        this.classList.add("component-active");
      });
    });
    // Add click event listener to all close buttons, when close button is clicked
    // Remove "component--active" class from general content and "component-active" class from active component
    closebuttons.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        generalcontent.classList.remove("component--active");
        document
          .querySelector(".component.component-active")
          .classList.remove("component-active");
      });
    });
  },
};
</script>
<style scoped>
/* CSS only for HelpDesktop-Template */
* {
  overflow: hidden;
}
.back-btn {
  width: 4em;
  height: 4em !important;
  position: absolute;
  right: 0;
  margin-right: 2em;
  margin-top: 1em;
  color: white;
  background-color: rgb(174, 4, 4) !important;
}
.container-image-chapter-open {
  position: relative;
  text-align: center;
}
.card {
  box-shadow: 3em 3em 3em rgba(0, 0, 0, 0.7) !important;
  overflow: scroll;
  max-height: 35em;
}
.image {
  max-height: 8em;
}
.h2pop {
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-25%, -50%);
}
@keyframes sTransition {
  0% {
    background-position: 0%;
  }

  100% {
    background-position: 400%;
  }
}
.component {
  cursor: pointer;
  justify-content: space-between;
  position: absolute;
  left: 0;
  width: 19.2%;
  height: 85%;
  background: #252525;
  transition: transform 0.6s 0.7s, width 0.7s, opacity 0.6s 0.7s,
    z-index 0s 1.3s;
  will-change: transform, width, opacity;
  height: 45em;
  margin-top: 5em;
}
.initial-visual-component {
  z-index: 2;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  position: absolute;
  width: 100%;
}
.component-content {
  z-index: -1;
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 30px;
  opacity: 0;
  transition: all 0.1s;
}
.component.component-active .component-content {
  z-index: 2;
  opacity: 1;
  transition: all 0.5s 1.4s;
}
.component-close-button {
  position: absolute;
  right: 2em;
  top: 0em;
  width: 4em;
  height: 4em;
  opacity: 0;
  transition: all 0s 0.45s;
}
.component-close-button:before,
.component-close-button:after {
  content: "";
  position: absolute;
  top: 50%;
  width: 100%;
  height: 8px;
  margin-left: 0em;
  background: #80ba24;
  opacity: 0;
  transition: opacity 0s;
}
.component.component-active .component-close-button {
  z-index: 5;
  opacity: 1;
}
.component.component-active .component-close-button:before,
.component.component-active .component-close-button:after {
  opacity: 1;
}
.component-close-button:before {
  transform: rotate(45deg) translateX(100%);
}
.component.component-active .component-close-button:before {
  transition: all 0.3s 1.4s cubic-bezier(0.72, 0.09, 0.32, 1.57);
  transform: rotate(45deg) translateX(0);
}
.component-close-button:after {
  transform: rotate(-45deg) translateX(100%);
}
.component.component-active .component-close-button:after {
  transition: all 0.3s 1.55s cubic-bezier(0.72, 0.09, 0.32, 1.57);
  transform: rotate(-45deg) translateX(0);
}
.component-index {
  position: relative;
  top: 30px;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 15em;
  font-weight: bold;
}
.general-content.component--active .component-index {
  opacity: 0;
}
.component-index-front {
  position: absolute;
  left: 30px;
  top: -15px;
}
.component-index-back {
  color: #80ba24;
  opacity: 0.25;
  transition: opacity 0.25s 0.25s;
}
.component:hover .component-index-back {
  transition: opacity 1.25s;
  opacity: 1;
}
.component:nth-child(2) {
  transform: translate3d(105.2083333333%, 0, 0);
}
.general-content.component--active
  .component:nth-child(2):not(.component-active) {
  transform: scale(0.5) translate3d(105.2083333333%, 0, 0);
  opacity: 0;
  transition: transform 0.95s, opacity 0.95s;
}
.component:nth-child(2) .component-internal {
  transition-delay: 0.1s;
}
.component:nth-child(3) {
  transform: translate3d(210.4166666667%, 0, 0);
  transform-origin: 260.4166666667% 50%;
}
.general-content.component--active
  .component:nth-child(3):not(.component-active) {
  transform: scale(0.5) translate3d(210.4166666667%, 0, 0);
  opacity: 0;
  transition: transform 0.95s, opacity 0.95s;
}
.component:nth-child(4) {
  transform: translate3d(315.625%, 0, 0);
  transform-origin: 365.625% 50%;
}
.general-content.component--active
  .component:nth-child(4):not(.component-active) {
  transform: scale(0.5) translate3d(315.625%, 0, 0);
  opacity: 0;
  transition: transform 0.95s, opacity 0.95s;
}
.component:nth-child(4) .component-internal {
  transition-delay: 0.3s;
}
.component:nth-child(5) {
  transform: translate3d(420.8333333333%, 0, 0);
  transform-origin: 470.8333333333% 50%;
}
.general-content.component--active
  .component:nth-child(5):not(.component-active) {
  transform: scale(0.5) translate3d(420.8333333333%, 0, 0);
  opacity: 0;
  transition: transform 0.95s, opacity 0.95s;
}
.component.component-active {
  z-index: 1;
  width: 100%;
  transform: translate3d(0, 0, 0);
  transition: transform 0.6s, width 0.7s 0.7s, z-index 0s;
}
</style>