<template>
  <div id="container" class="d-f">
    <transition appear @before-enter="beforeEnter" @enter="enter">
      <v-btn
      color="deep-purple lighten-5"
        depressed
        elevation="1"
        @click="
          editorActive = true;
          consoleActive = false;
        ">
        Editor
      </v-btn>
    </transition>
    <transition appear @before-enter="beforeEnter" @enter="enter">
      <v-btn :class="[{ 'console_warning': !consoleActive && gotUnreadErrors}]" color="deep-purple lighten-5" depressed elevation="1"
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
    <v-textarea 
    :readonly=true
    v-if="consoleActive" v-model="errorMessage"
      :class="['consoleArea', { 'redText': errorMessage !== 'Keine Fehlermeldung!'}, { 'greenText': errorMessage === 'Keine Fehlermeldung!'}]"></v-textarea>
    </transition>
    <div>
      <transition appear @before-enter="beforeEnter" @enter="enter">
        <v-btn color="warning" depressed elevation="2" @click="checkResult">
          Validate
        </v-btn>
      </transition>
      <transition appear @before-enter="beforeEnter" @enter="enter">
        <v-btn
          color="success"
          depressed
          elevation="2"
          @click="runfunction"
        >
          Finished
        </v-btn>
      </transition>
      <transition appear @before-enter="beforeEnter" @enter="enter">
        <v-btn
          :style="{backgroundColor:color}"
          depressed
          elevation="2"
          @click="colorPicker ? colorPicker = false : colorPicker = true"
        >
          Color
        </v-btn>
      </transition>
      <transition appear @before-enter="beforeEnter" @enter="enter">
      <v-color-picker
          v-if="colorPicker"
          @click.native="changeColor(color)"
          v-model="color"
          dot-size="6"
          mode="hexa"
          hid-inputs
          hide-mode-switch
          swatches-max-height="250"
          ></v-color-picker>          
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
      color: '#cc00cc',
      levelElements: [],
      paintedElements: [],
      colorPicker: true,
      editorActive: true,
      errorMessage: 'Keine Fehlermeldung!',
      consoleActive: false,
      gotUnreadErrors: false,
      codeToRun: "/*Type your own code!*/",
    };
  },

  methods: {
    changeColor(clr) {
      Array.from(document.querySelectorAll(".painted")).forEach((el) => {
        el.style.backgroundColor = clr;
        }); 
      this.$emit('change-color',clr);
    },
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
      element.style.backgroundColor = color;
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
        Array.from(document.querySelectorAll(".painted")).forEach((el) => {
        el.classList.remove("painted");
        });
        this.$emit("success");
      } else this.$emit("failure");
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
      //let evalCode = this.addStringsToString(this.codeToRun, "paint", "this.");
      let paintStr = 'function paint(first, second) {\nlet element = document.getElementById("x" + first + "y" + second);\ncheckParamValue(first);\ncheckParamValue(second);\nelement.classList.add("painted");}\n';
      let checkParamValueStr = 'function checkParamValue(num) {\nconst gridElems = document.querySelectorAll(".grid-card");\nlet maxValue = Math.sqrt(gridElems.length) - 1;\nif (num > maxValue || num < 0) throw new Error("Der/Die angegebene Parameter entsprechen nicht der Feldgröße");}\n'
      let evalCode = this.codeToRun;
      console.log(evalCode);
      this.checkIfPaintCall(evalCode);
      try {
        this.checkPaintParams(evalCode);
        evalCode = this.InsertForLoopInfinitySafety(evalCode);
        evalCode = this.InsertWhileInfinitySafety(evalCode);
        console.log("InfSafetyCode: " + "[" + evalCode + "]");
        evalCode = [paintStr, checkParamValueStr,
        "let infinitySafetyCounter = 0;\n",evalCode].join('');
        let runCodeSafely = new Function(evalCode);
        runCodeSafely();
        this.changeColor(this.color);
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
    InsertForLoopInfinitySafety(code) {
      let startPos = code.search("for");
      if (code.search("for") == -1) {
        return code;
      }
      else {
         let head = this.getBracket(code,startPos+3);
         //console.log("Head: " + "[" + head + "]");
         let posAfterHead = startPos+3+head.length+1
         let restStr = code.slice(posAfterHead);
         //console.log("RestStr: " + "[" + restStr + "]");
         let bodyPos = restStr.indexOf("{");
         let infCheck = '\ninfinitySafetyCounter++;\nif (infinitySafetyCounter > 500) throw new Error("Diese Schleife ist zu lang oder unendlich!");';
         let newReturnCode = [code.slice(0,startPos),code.slice(startPos,bodyPos+posAfterHead+1),infCheck].join('');
         //console.log("NewReturnCode: " + "[" + newCodePart + "]");
         let restCode = code.slice(bodyPos+posAfterHead+1);
         //let body = this.getBracket(restStr,bodyPos);
         //console.log("RestCode: " + "[" + restCode + "]");
         return [newReturnCode,this.InsertForLoopInfinitySafety(restCode)].join('');
      }
    },
    InsertWhileInfinitySafety(code) {
      var doCount = (code.match(/do/g) || []).length;
      var whileCount = (code.match(/while/g) || []).length;
      let infCheck = '\ninfinitySafetyCounter++;\nif (infinitySafetyCounter > 500) throw new Error("Diese Schleife ist zu lang oder unendlich!");';
      let returnStr = "";
      let restCode = code;
      if (doCount == 0 && whileCount == 0) {
        return code;
      }
      else if(doCount == whileCount) {
        for (let i = doCount; i > 0; i--) {
         let startPos = restCode.search("do"); 
         let bodyPos = restCode.slice(startPos).indexOf('{');
         //console.log("Head: " + "[" + head + "]");
         //console.log("RestStr: " + "[" + restStr + "]");
         returnStr += [restCode.slice(0,startPos+bodyPos+1),infCheck].join('');
         //console.log("NewReturnCode: " + "[" + newCodePart + "]");
         restCode = restCode.slice(startPos+bodyPos+1);
         //let body = this.getBracket(restStr,bodyPos);
         //console.log("RestCode: " + "[" + restCode + "]");
        }
        return returnStr + restCode;
      }
      else if (doCount < whileCount) {
        while (doCount > 0 || whileCount > 0) {
          let doPos = restCode.search("do");
          let whilePos = restCode.search("while");
          if (doPos == -1) doPos = 1000000;
          if (whilePos == -1) whilePos = 1000000;
          if (whilePos <= doPos) {
            let startPos = restCode.search("while");
            let headPos = startPos + restCode.slice(startPos).indexOf("(");
            let head = this.getBracket(restCode,headPos);
            let posAfterHead = headPos+head.length+2;
            let bodyPos = restCode.slice(posAfterHead).indexOf("{");
            returnStr += [restCode.slice(0,bodyPos+posAfterHead+1),infCheck].join('');
            restCode = restCode.slice(bodyPos+posAfterHead+1);
            whileCount--
          } else if (whilePos > doPos) {
            let startPos = restCode.search("do"); 
            let bodyPos = restCode.slice(startPos).indexOf('{');
            let whilePos = restCode.search("while");
            returnStr += [restCode.slice(0,startPos+bodyPos+1),infCheck,restCode.slice(startPos+bodyPos+1,whilePos+5)].join('');
            restCode = restCode.slice(whilePos+5);
            doCount--;
            whileCount--;
          }
        }
        return returnStr + restCode;
      } else throw new Error("Kein korrekter Aufbau einer While oder Do..While Schleife!");
    },
    checkIfPaintCall(code) {
      if (code.search("paint") == -1) this.errorMessage += "Rufe die paint(x,y) Methode aus um Felder anzumalen!\n";
    },
    checkParamValue(num) {
      const gridElems = document.querySelectorAll(".grid-card");
      let maxValue = Math.sqrt(gridElems.length) - 1;
      if (num > maxValue || num < 0) throw new Error("Der/Die angegebene Parameter entsprechen nicht der Feldgröße");
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

  watch: {
    color(newVal, oldVal) {
      Array.from(document.querySelectorAll(".painted")).forEach((el) => {
        el.style.backgroundColor = this.color;
      });
    },
    paintedElements(newVal, oldVal) {
      Array.from(document.querySelectorAll(".painted")).forEach((el) => {
        el.style.backgroundColor = this.color;
      });
    }
  },

};
</script>


<style>

.consoleArea {
  background-color: white;
}

.greenText {
  background-color: rgba(128, 186, 36, 0.4) !important;
  color: rgba(128, 186, 36, 0.4) !important;
}

.redText {
  background-color: rgba(255, 0, 0, 0.2) !important;
}

.console_warning {
  animation: warning 2s linear infinite;
  color: red !important;
  font-weight: bold;
}

@keyframes warning {
  50% {
    opacity: 0;
  }
}
</style>
