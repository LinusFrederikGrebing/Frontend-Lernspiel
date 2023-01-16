<template>
  <div id="container" class="d-f">
    <transition appear @enter="enter">
      <v-btn
        depressed
        elevation="1"
        @click="
          editorActive = true;
          consoleActive = false;
        ">
        Editor
      </v-btn>
    </transition>
    <transition appear @enter="enter">
      <v-btn :class="[{ 'console_warning': !consoleActive && gotUnreadErrors}]" depressed elevation="1"
        @click="editorActive = false; consoleActive = true; gotUnreadErrors = false;">
        Konsole
      </v-btn>
    </transition>
    <transition appear @enter="enterInput">
      <CodeEditor
        v-if="editorActive"
        id="code-editor"
        height="30vh"
        width="25vw"
        v-model="codeToRun"
        @click="checkIfCodeFilled"
      >
      </CodeEditor>
    </transition>
    <transition appear @enter="enterInput">
    <v-textarea 
    :readonly=true
    v-if="consoleActive" v-model="errorMessage"
      :class="['consoleArea', { 'redText': errorMessage !== 'Keine Fehlermeldung!'}, { 'greenText': errorMessage === 'Keine Fehlermeldung!'}]"></v-textarea>
    </transition>
    <div>
      <transition appear @enter="enter">
        <v-btn color="warning" depressed elevation="2" @click="checkResult">
          Validieren
        </v-btn>
      </transition>
      <transition appear  @enter="enter">
        <v-btn
          color="success"
          id="button-finished"
          depressed
          elevation="2"
          @click="runfunction"
        >
          Ausführen
        </v-btn>
      </transition>
      <transition appear @enter="enter">
        <v-btn
          :style="{backgroundColor:color}"
          depressed
          elevation="2"
          @click="colorPicker ? colorPicker = false : colorPicker = true"
        >
          Farbenauswahl
        </v-btn>
      </transition>
      <transition appear  @enter="enter">
        <v-btn
          class="reset-btn"
          depressed
          elevation="2"
          @click="levelAnimation()"
        >
          Reset
        </v-btn>
      </transition>
      <transition appear  @enter="enter">
        <v-btn
          depressed
          elevation="2"
          @click="animateTutorial()"
        >
          Tutorial
        </v-btn>
      </transition>
      <div v-on:mouseout="changeColor(color)">
      <v-color-picker
          v-if="colorPicker"
          @click="changeColor(color)"
          v-model="color"
          dot-size="6"
          mode="hexa"
          hid-inputs
          hide-mode-switch
          swatches-max-height="250"
          ></v-color-picker>  
        </div>        
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
      solution: "",
      color: '#80ba24',
      levelElements: [],
      paintedElements: [],
      colorPicker: false,
      editorActive: true,
      errorMessage: 'Keine Fehlermeldung!',
      consoleActive: false,
      gotUnreadErrors: false,
      codeToRun: "/*Type your own code!*/",
    };
  },

  methods: {
    animateTutorial() {
      const preventClicksListener = function(event) {
        event.preventDefault();
      };
      document.body.style.pointerEvents = "none";
      let timelineToEditor = gsap.timeline({repeat: 0, repeatDelay: 0, });
      let codeEditor = document.querySelector("#code-editor");
      let header = document.querySelector('.header');
      let headerHeight = parseInt(header.offsetHeight);
      //console.log("EINS")
      gsap.to("#mouse-cursor", {duration: 0, x: 0, y: 0});
      let x = window.pageXOffset + parseInt(codeEditor.offsetWidth) / 4;
      let y = window.pageXOffset + parseInt(codeEditor.offsetHeight) / 2 - headerHeight;
      while (codeEditor && !isNaN(codeEditor.offsetLeft) && !isNaN(codeEditor.offsetTop)) {
      x += codeEditor.offsetLeft - codeEditor.scrollLeft;
      y += codeEditor.offsetTop - codeEditor.scrollTop;
      codeEditor = codeEditor.offsetParent;
      }
      //console.log("ZWEI " + rectStartElem.top)
      timelineToEditor.to("#mouse-cursor", {duration: 3, x: x, y: y, visibility: "visible", zIndex: 4});
      timelineToEditor.to("#mouse-cursor", {duration: 0.2, scale: 0.5, yoyo: true, repeat: 1, ease: "power1.inOut", delay: 0.5,});
      timelineToEditor.eventCallback("onComplete", () => {
        this.animateCodeEditor();
        this.delay(3000).then(() => this.animatePathToButton());
        this.delay(5000).then(() => document.body.style.pointerEvents = "");
      })        
    },
    delay(time) {
     return new Promise(resolve => setTimeout(resolve, time));
    },
    animatePathToButton() {
      let timelineToButton = gsap.timeline({repeat: 0, repeatDelay: 0, });
      let buttonFinished = document.querySelector("#button-finished");
      let header = document.querySelector('.header');
      let headerHeight = parseInt(header.offsetHeight);
      let x2 = window.pageXOffset + parseInt(buttonFinished.offsetWidth) / 2;
      let y2 = window.pageYOffset + parseInt(buttonFinished.offsetHeight) / 2 - headerHeight;
      while (buttonFinished && !isNaN(buttonFinished.offsetLeft) && !isNaN(buttonFinished.offsetTop)) {
        x2 += buttonFinished.offsetLeft - buttonFinished.scrollLeft;
        y2 += buttonFinished.offsetTop - buttonFinished.scrollTop;
        buttonFinished = buttonFinished.offsetParent;
      }
      timelineToButton.to("#mouse-cursor", {duration: 1, x: x2, y: y2});
      timelineToButton.to("#mouse-cursor", {duration: 0.2, scale: 0.5, yoyo: true, repeat: 1, ease: "power1.inOut", delay: 0.5,});
      timelineToButton.eventCallback("onComplete", () => {
        this.runfunction()
        document.querySelector("#mouse-cursor").style.visibility = "hidden";
      }
        );
    },
    animateCodeEditor() {
      this.editorActive = true;
      let tutorialCode = "paint(1,1);"
      let index = 0;
      this.codeToRun = "";
      let intervalId = setInterval(() => {
        if (index >= tutorialCode.length) {
          clearInterval(intervalId);
          return;
        }
        this.codeToRun += tutorialCode.substring(index,index+1);
        index++;
      }, 250); 
    },
    resetPaintedFields() {
      Array.from(document.querySelectorAll(".painted")).forEach((el) => {
        if (!el.id.includes("v")) {
          el.classList.remove("painted");
        }
      });
      Array.from(document.querySelectorAll(".grid-card")).forEach((el) => {
        if (!el.classList.contains("painted")) {
          el.style.backgroundColor = '#ffffff';
        }
      });

    },
    levelAnimation() {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          let element = document.getElementById("x" + i + "y" + j);
          gsap.to(element, {
            onUpdate: this.resetPaintedFields(),
            duration: 1,
            scale: 0.2,
            y: 60,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
            delay: Math.random(),
            stagger: {
              amount: 1.5,
              grid: "auto",
              from: "center",
            },
          });
        }
      }
    },
    changeColor(clr) {
      Array.from(document.querySelectorAll(".painted")).forEach((el) => {
        el.style.backgroundColor = clr;
      }); 
      this.$emit('change-color',clr);
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
        { y: 0, x: +200, opacity: 0 },
        { delay: 0, duration: 1, y: 0, x: 0, opacity: 1 }
      );
    },
    /*paint(first, second) {
      let element = document.getElementById("x" + first + "y" + second);
      this.checkParamValue(first);
      this.checkParamValue(second);
      element.classList.add("painted");
      element.style.backgroundColor = color;
    },*/
    checkResult() {
      let allElements = document.getElementsByClassName("painted");
      this.levelElements = [];
      this.paintedElements = [];
      let currentLevel = [];

      if (localStorage.getItem("currentLevel") !== null) {
       currentLevel = JSON.parse(localStorage.getItem("currentLevel"));
      }

      let requiredSolution = currentLevel.id;
      console.log("THE REQUIRED SOLUTION IS: " + requiredSolution);
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
        this.$emit("timer");
        this.showAlertSuccess();
      } else this.showAlertFailure();
    },
    showAlertSuccess() {
      // Use sweetalert2
      this.$swal( 
        {
        title: 'Hervorragend!',
        text: "Du hast das Level gemeistert! Nun kannst du dich an an dem nächsten Level versuchen!",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#6D9E1F',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Nächstes Level!',
        cancelButtonText: 'Zur Levelauswahl!',
        allowOutsideClick: false, }).then((result) => {
        if (result.isConfirmed) {
          this.$emit("success");
        } else {
          this.$router.push({ path: '/LevelSelect' });
        }
      }
      );
    },
    showAlertFailure() {
      // Use sweetalert2
      this.$swal({
        title: 'Beim nächsten Mal...!',
        text: "Leider hast du die Aufgabe nicht der Anforderungen entsprechend erfüllt!",
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#6D9E1F',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Level wiederholen!',
        cancelButtonText: 'Zur Levelauswahl!',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.$emit("failure");
        } else {
          this.$router.push({ path: '/LevelSelect' });
        }
      }
      );
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
      this.checkWhichSolutionUsed(this.codeToRun);
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
    checkWhichSolutionUsed(code){
      let paintCall = code.search("paint");
      let forCall = code.search("for");
      let whileCall = code.search("while");
      let doCall = code.search("do");
      let functionCall = code.search("paint");
      if (functionCall > 0) this.result = "Funktion";
      else if (whileCall > 0 && whileCall == doCall && forCall == -1) this.result = "DoWhileSchleife";
      else if (whileCall > 0 && doCall == -1 && forCall == -1) this.result = "WhileSchleife";
      else if (forCall > 0 && doCall == -1 && whileCall == -1) this.result = "ForSchleife";
      else if (forCall == -1 && doCall == -1 && whileCall == -1) this.result = "PaintAufruf";
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
  computed: {
    currentLevel() {
      if (localStorage.getItem("currentLevel") !== null) {
        return JSON.parse(localStorage.getItem("currentLevel"));
      } 
    },
  },
  watch: {
    currentLevel() {
      if (localStorage.getItem("currentLevel") !== null) {
        return JSON.parse(localStorage.getItem("currentLevel"));
      } 
    },
    color(newVal, oldVal) {
      console.log(this.color)
      Array.from(document.querySelectorAll(".painted")).forEach((el) => {
        el.style.backgroundColor = this.color;
      });
    },
    /*paintedElements(newVal, oldVal) {
      Array.from(document.querySelectorAll(".painted")).forEach((el) => {
        el.style.backgroundColor = this.color;
      });
    }*/
  },
  mounted(){
    //this.color = '#80ba24'
  }

};
</script>


<style>

.consoleArea {
  background-color: white;
}

.reset-btn {
  background-color: red !important;
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
  background-color: red !important;
}

@keyframes warning {
  50% {
    opacity: 0;
  }
}
</style>
