<template>
  <div id="container" class="d-f">
    <transition appear @before-enter="beforeEnter" @enter="enter">
      <v-btn
        color="accent"
        depressed
        elevation="1"
        outlined
        @click="
          editorActive = true;
          consoleActive = false;
        "
      >
        Editor
      </v-btn>
    </transition>
    <transition appear @before-enter="beforeEnter" @enter="enter">
      <v-btn
        color="accent"
        depressed
        elevation="1"
        outlined
        @click="
          editorActive = false;
          consoleActive = true;
        "
        >Console</v-btn
      >
    </transition>
    <transition appear @before-enter="beforeEnter" @enter="enterInput">
      <CodeEditor
        v-if="editorActive"
        height="30vh"
        width="25vw"
        v-model="codeToRun"
        @click="checkIfCodeFilled"
      >
      </CodeEditor>
    </transition>
    <transition appear @before-enter="beforeEnter" @enter="enterInput">
      <v-textarea
        v-if="consoleActive"
        v-model="errorMessage"
        :class="[
          'consoleArea',
          { redText: errorMessage !== 'Keine Fehlermeldung!' },
          { greenText: errorMessage === 'Keine Fehlermeldung!' },
        ]"
      ></v-textarea>
    </transition>
    <div>
      <transition appear @before-enter="beforeEnter" @enter="enter">
        <v-btn color="warning" depressed elevation="2" outlined>
          Validate
        </v-btn>
      </transition>
      <transition appear @before-enter="beforeEnter" @enter="enter">
        <v-btn
          color="success"
          depressed
          elevation="2"
          outlined
          @click="runfunction"
        >
          Finished
        </v-btn>
      </transition>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import CodeEditor from "simple-code-editor";
export default {
  name: "GameGrid",
  props: { error: String },
  components: {
    CodeEditor,
  },
  data: () => {
    return {
      levelElements: [],
      paintedElements: [],
      editorActive: true,
      errorMessage: "Keine Fehlermeldung!",
      consoleActive: false,
      codeToRun: "/*Type your own code!*/",
    };
  },

  methods: {
    beforeEnter(el) {
      el.style.opacity = "0";
      el.style.transform = "translateX(-100px)";
      el.style.transform = "translateY(-100px)";
    },
    enter(el) {
      gsap.fromTo(
        el,
        { y: 0, x: +200 },
        { delay: 1, duration: 2, y: 0, x: 0, opacity: 1 }
      );
    },
    enterInput(el) {
      gsap.fromTo(
        el,
        { y: 0, x: +200 },
        { delay: 0, duration: 1, y: 0, x: 0, opacity: 1 }
      );
    },
    paint(first, second) {
      let element = document.getElementById("x" + first + "y" + second);
      element.classList.add("painted");
    },
    checkResult() {
      console.log("checkResult");
      let allElements = document.getElementsByClassName("painted");
      this.levelElements = [];
      this.paintedElements = [];
      for (let i = 0; i < allElements.length; i++) {
        if (allElements[i].id.includes("v")) {
          this.levelElements.push(allElements[i].id.replace(/\D/g, ""));
        } else {
          this.paintedElements.push(allElements[i].id.replace(/\D/g, ""));
        }
      }
      console.log(this.levelElements);
      console.log(this.paintedElements);
      if (this.areEqual(this.levelElements, this.paintedElements)) {
        this.levelElements = [];
        this.paintedElements = [];
        this.$emit("success");
      }
    },
    areEqual(array1, array2) {
      if (array1.length === array2.length) {
        return array1.every((element, index) => {
          if (element === array2[index]) {
            return true;
          }
          return false;
        });
      }
    },
    addStringsToString(wholeStr, searchStr, addStr) {
      if (wholeStr.search(searchStr) == -1) return wholeStr;
      let restStr = wholeStr;
      let returnStr = "";
      while (restStr.search(searchStr) > -1) {
        let insertPos = restStr.search(searchStr);
        returnStr += [
          restStr.slice(0, insertPos),
          addStr,
          restStr.slice(insertPos, insertPos + searchStr.length),
        ].join("");
        restStr = restStr.slice(insertPos + searchStr.length);
      }
      return returnStr + restStr;
    },
    runfunction() {
      let evalCode = this.addStringsToString(this.codeToRun, "paint", "this.");
      console.log(evalCode);
      try {
        eval(evalCode);
        this.errorMessage = "Keine Fehlermeldung!";
        this.checkResult();
      } catch (error) {
        /*const first = this.codeToRun.match(/\d+/g)?.[0];
        const second = this.codeToRun.match(/\d+/g)?.[1];*/
        this.changeErrorMsg(error);
      }
    },
    checkIfCodeFilled() {
      if (this.codeToRun === "/*Type your own code!*/") {
        this.codeToRun = "";
      }
    },
    checkIfPaintCall(code) {
      if (code.search("paint") == -1) return false;
      else return true;
    },
    changeErrorMsg(error) {
      if (error instanceof ReferenceError)
        this.errorMessage =
          "Folgender Ausdruck ist nicht definiert!\n\n" + error;
      else if (error instanceof TypeError)
        this.errorMessage =
          "Ein oder Mehrere Parameter wurden nicht übergeben oder sind vom falschen Typ!\n\n" +
          error;
      else if (error instanceof SyntaxError)
        this.errorMessage =
          "Da stimmt etwas mit deiner Syntax nicht!\n\n" + error;
      else this.errorMessage = error;
    },
  },

  watch: {},
};
</script>

<style scoped>
.consoleArea {
  background-color: white;
}

.greenText {
  color: rgba(128, 186, 36, 1);
}

.redText {
  color: red;
}
</style>
