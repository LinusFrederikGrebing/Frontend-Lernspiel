<template>
  <v-container>
    <div class="mb-16">
      <v-expansion-panels>
        <v-expansion-panel v-for="item in informations" :key="item.id">
          <v-expansion-panel-header class="text-h6 text-sm-h5 my-4">
            {{ item.label }}
          </v-expansion-panel-header>
          <v-expansion-panel-content class="">
            <v-card class="panel_item">
              <v-img :src="item.src" max-height="5em"></v-img>
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
              <div class="">
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
                >
                  W3schools Dokumentation
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </v-container>
</template>
<script>
export default {
  name: "HelpTemplateMobile",
  props: { levels: Array },
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
  },
};
</script>
<style scoped>
/* CSS only for HelpMobile-Template */
.panel_item {
  max-height: 20em;
  overflow: scroll;
}
</style>