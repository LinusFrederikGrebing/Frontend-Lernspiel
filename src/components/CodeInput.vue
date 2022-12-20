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
      <v-btn :class="[{ 'console_warning': !consoleActive && gotUnreadErrors}]" color="accent" depressed elevation="1" outlined
        @click="editorActive = false; consoleActive = true; gotUnreadErrors = false;">Console</v-btn>
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
    <v-textarea v-if="consoleActive" v-model="errorMessage"
      :class="['consoleArea', { 'redText': errorMessage !== 'Keine Fehlermeldung!'}, { 'greenText': errorMessage === 'Keine Fehlermeldung!'}, {'greenText': errorMessage === ''}]"></v-textarea>
    </transition>
    <div>
      <transition appear @before-enter="beforeEnter" @enter="enter">
        <v-btn color="warning" depressed elevation="2" outlined @click="checkResult">
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
      errorMessage: '',
      consoleActive: false,
      gotUnreadErrors: false,
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
      this.checkParamValue(first);
      this.checkParamValue(second);
      element.classList.add("painted");
    },
    checkResult() {
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
      this.errorMessage = '';
      let evalCode = this.addStringsToString(this.codeToRun, "paint", "this.");
      this.checkIfPaintCall(evalCode);
      try {
        this.checkPaintParams(evalCode);
        eval(this.InsertInfinitySafety(evalCode));
        //this.checkResult();
      } catch (error) {
        this.changeErrorMsg(error);
        this.gotUnreadErrors = true;
      }
      if (this.errorMessage == '') this.errorMessage = "Keine Fehlermeldung!";
    },
    checkIfCodeFilled() {
      if (this.codeToRun === "/*Type your own code!*/") {
        this.codeToRun = "";
      }
    },
    InsertInfinitySafety(code) {
      let startPos = code.search("for");
      if (code.search("for") > -1) {
         let head = this.getBracket(code,startPos+3);
         console.log("Head: " + "[" + head + "]");
         let posAfterHead = startPos+3+head.length+1
         let restStr = code.slice(posAfterHead);
         console.log("RestStr: " + "[" + restStr + "]");
         let bodyPos = restStr.indexOf("{");
         let infCheck = '\ninfinitySafetyCounter++;\nif (infinitySafetyCounter > 500) throw new Error("Dieser Schleife ist zu lang oder unendlich!");';
         let newCodePart = [code.slice(0,startPos),"let infinitySafetyCounter = 0;\n",code.slice(startPos,bodyPos+posAfterHead+1)].join('');
         console.log("NewCodePart: " + "[" + newCodePart + "]");
         let newCodeWhole = [newCodePart,infCheck,code.slice(bodyPos+posAfterHead+1)].join('');
         //let body = this.getBracket(restStr,bodyPos);
         return newCodeWhole;
      } else return code;
    },
    checkIfPaintCall(code) {
      if (code.search("paint") == -1) this.errorMessage += "Rufe die paint(x,y) Methode aus um Felder anzumalen!\n";
    },
    checkParamValue(num) {
      const gridElems = document.querySelectorAll(".grid-card");
      let maxValue = Math.sqrt(gridElems.length) - 1;
      if (num > maxValue) throw new Error("Der/Die angegebene Parameter entsprechen nicht der Feldgröße");
    },
    getBracket(str, pos) {
      if (str[pos] == '(') {
        let depth = 1;
        for (let i = pos + 1; i < str.length; i++) {
          switch (str[i]) {
          case '(':
            depth++;
            break;
          case ')':
            if (--depth == 0) {
              return str.slice(pos+1,i);
            }
            break;
          }
        }
      } else if (str[pos] == '{') {
        let depth = 1;
        for (let i = pos + 1; i < str.length; i++) {
          switch (str[i]) {
          case '{':
            depth++;
            break;
          case '}':
            if (--depth == 0) {
              return str.slice(pos+1,i);
            }
            break;
          }
        }
      }
    },
    checkPaintParams(code) {
      let error = new Error("Zu viele Parameter angegeben für die Methode paint.")
      let restCode = code;
      while (restCode.search("paint") > -1) {
        let pos = restCode.search("paint");
        let bracketContent = this.getBracket(restCode,pos+5);
        //console.log('[' + bracketContent + ']');
        if ((bracketContent.match(/,/g) || []).length != 1) throw error;
        restCode = restCode.slice(pos+5+bracketContent.length);
      }
    },
    changeErrorMsg(error) {
      if (error instanceof ReferenceError) this.errorMessage += "Folgender Ausdruck ist nicht definiert:\n" + error;
      else if (error instanceof TypeError) this.errorMessage += "Ein oder Mehrere Parameter wurden nicht übergeben oder sind vom falschen Typ:\n" + error;
      else if (error instanceof SyntaxError) this.errorMessage += "Da stimmt etwas mit deiner Syntax nicht!\n" + error;
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

.console_warning {
  animation: warning 2s linear infinite;
  background-color: red;
}

@keyframes warning {
  50% {
    opacity: 0;
  }
}
</style>
