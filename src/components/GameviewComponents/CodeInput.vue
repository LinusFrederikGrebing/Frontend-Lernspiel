<template>
  <div class="d-f mb-4 d-flex">
    <div>
      <transition appear @enter="enter">
        <v-btn
          depressed
          elevation="1"
          @click="
            editorActive = true;
            consoleActive = false;
          "
        >
          Editor
        </v-btn>
      </transition>
      <transition appear @enter="enter">
        <v-btn
          :class="[{ console_warning: !consoleActive && gotUnreadErrors }]"
          depressed
          elevation="1"
          @click="
            editorActive = false;
            consoleActive = true;
            gotUnreadErrors = false;
          "
        >
          Konsole
        </v-btn>
      </transition>
      <transition appear @enter="enterInput">
        <div @click="checkIfCodeFilled()">
          <CodeEditor
            v-if="editorActive"
            id="code-editor"
            height="25vh"
            width="20vw"
            v-model="codeToRun"
          >
          </CodeEditor>
        </div>
      </transition>
      <transition appear @enter="enterInput">
        <v-textarea
          :readonly="true"
          v-if="consoleActive"
          v-model="errorMessage"
          :class="[
            'consoleArea',
            { redText: errorMessage !== 'Keine Fehlermeldung!' },
            { greenText: errorMessage === 'Keine Fehlermeldung!' },
          ]"
        >
        </v-textarea>
      </transition>
      <div>
        <v-tooltip bottom color="warning">
          <template v-slot:activator="{ on, attrs }">
            <transition appear @enter="enter">
              <v-btn
                color="warning"
                v-bind="attrs"
                v-on="on"
                depressed
                elevation="2"
                @click="checkResult"
              >
                Validieren
              </v-btn>
            </transition>
          </template>
          <span>
            <h4>
              Klicke auf Validieren um zu sehen ob deine Lösung richtig ist!
            </h4>
          </span>
        </v-tooltip>
        <v-tooltip bottom color="success">
          <template v-slot:activator="{ on, attrs }">
            <transition appear @enter="enter">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="success"
                id="finished-btn"
                depressed
                elevation="2"
                @click="runfunction"
              >
                Ausführen
              </v-btn>
            </transition>
          </template>
          <span>
            <h4>Klicke auf Ausführen um deinen Code zu zeichen!</h4>
          </span>
        </v-tooltip>
        <div v-on:mouseout="changeColor(color)">
          <v-color-picker
            v-if="colorPicker"
            @click="changeColor(color)"
            v-model="color"
            dot-size="6"
            mode="hexa"
            hide-inputs
            hide-mode-switch
            swatches-max-height="250"
          ></v-color-picker>
        </div>
      </div>
    </div>
    <div class="floating-container">
      <v-btn class="floating-button" @click="openOrCloseFAB()"
        ><b>{{ btnText }}</b></v-btn
      >
      <div id="fab-items" class="closedFAB">
        <span class="float-element tooltip-left">
          <v-btn depressed elevation="2" @click="animateTutorial()">
            Wie zeichne ich?
          </v-btn>
        </span>
        <span class="float-element">
          <v-btn
            class="reset-btn"
            depressed
            elevation="2"
            @click="resetAnimation()"
          >
            Zurücksetzen
          </v-btn>
        </span>
        <span class="float-element">
          <v-btn
            :style="{ backgroundColor: color }"
            depressed
            elevation="2"
            @click="colorPicker ? (colorPicker = false) : (colorPicker = true)"
          >
            Farbenauswahl
          </v-btn>
        </span>
        <span class="float-element">
          <v-btn depressed elevation="2" @click="showHelp"> Hilfen </v-btn>
        </span>
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
      btnText: "+",
      solution: "",
      color: "#80ba24",
      levelElements: [],
      paintedElements: [],
      colorPicker: false,
      editorActive: true,
      errorMessage: "Keine Fehlermeldung!",
      consoleActive: false,
      gotUnreadErrors: false,
      codeToRun: "/*Type your own code!*/",
      fab: false,
    };
  },

  methods: {
    // CSS-FAB-Animation
    openOrCloseFAB() {
      let element = document.getElementById("fab-items");
      if (this.fab == false) {
        this.openFAB(element)
      } else {
        this.closeFAB(element)
      }
    },
    openFAB(element){
      element.classList.add("element-container");
        element.classList.remove("closedFAB");
        // change the btnIcon after 300millis
        setTimeout(() => {
          this.btnText = "-";
        }, 300);
        this.fab = true;
    },
    closeFAB(element){
       element.classList.add("closedFAB");
        element.classList.remove("element-container");
        this.btnText = "+";
        this.fab = false;
    },
    showHelp() {
      this.$emit("show-help");
    },
    animateTutorial() {
      document.body.style.pointerEvents = "none";
      let timelineToEditor = gsap.timeline({ repeat: 0, repeatDelay: 0 });
      let codeEditor = document.querySelector("#code-editor");
      let header = document.querySelector(".header");
      let sidebar = document.querySelector("#sidebar");
      let headerHeight = parseInt(header.offsetHeight);
      let sidebarWidth = 0;
      if (sidebar.classList.contains("drawer-open"))
        sidebarWidth = parseInt(sidebar.offsetWidth);

      //Reset Mouse-Cursor Start Position
      gsap.to("#mouse-cursor", { duration: 0, x: 0, y: 0 });
      //Calculate Absolute x,y Coordinates
      let x = parseInt(codeEditor.offsetWidth) / 4 - sidebarWidth;
      let y = parseInt(codeEditor.offsetHeight) / 2 - headerHeight;
      while (codeEditor && !isNaN(codeEditor.offsetLeft) && !isNaN(codeEditor.offsetTop)) {
      x += codeEditor.offsetLeft - codeEditor.scrollLeft;
      y += codeEditor.offsetTop - codeEditor.scrollTop;
      codeEditor = codeEditor.offsetParent;
      }

      //Animate the Cursor
      timelineToEditor.to("#mouse-cursor", {
        duration: 3,
        x: x,
        y: y,
        visibility: "visible",
        zIndex: 4,
      });
      timelineToEditor.to("#mouse-cursor", {
        duration: 0.2,
        scale: 0.5,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
        delay: 0.5,
      });
      timelineToEditor.eventCallback("onComplete", () => {
        this.animateCodeEditor();
        this.delay(3000).then(() => this.animatePathToButton());
        this.delay(5000).then(() => (document.body.style.pointerEvents = ""));
      });
    },
    delay(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },
    // Second part of the Tutorial Animation
    animatePathToButton() {
      let timelineToButton = gsap.timeline({ repeat: 0, repeatDelay: 0 });
      let buttonFinished = document.querySelector("#finished-btn");
      let header = document.querySelector(".header");
      let sidebar = document.querySelector("#sidebar");
      let headerHeight = parseInt(header.offsetHeight);
      let sidebarWidth = 0;
      if (sidebar.classList.contains("drawer-open"))
        sidebarWidth = parseInt(sidebar.offsetWidth);

      //Calculate Absolute x,y Coordinates
      let x = parseInt(buttonFinished.offsetWidth) / 2 - sidebarWidth;
      let y = parseInt(buttonFinished.offsetHeight) / 2 - headerHeight;
      while (buttonFinished && !isNaN(buttonFinished.offsetLeft) && !isNaN(buttonFinished.offsetTop)) {
        x += buttonFinished.offsetLeft - buttonFinished.scrollLeft;
        y += buttonFinished.offsetTop - buttonFinished.scrollTop;
        buttonFinished = buttonFinished.offsetParent;
      }
      //Animate the Cursor
      timelineToButton.to("#mouse-cursor", { duration: 1, x: x, y: y });
      timelineToButton.to("#mouse-cursor", {
        duration: 0.2,
        scale: 0.5,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
        delay: 0.5,
      });
      timelineToButton.eventCallback("onComplete", () => {
        this.runfunction();
        document.querySelector("#mouse-cursor").style.visibility = "hidden";
      });
    },
    //Typewriter Effect for the Code Editor
    animateCodeEditor() {
      this.editorActive = true;
      let tutorialCode = "paint(1,1);";
      let index = 0;
      this.codeToRun = "";
      let intervalId = setInterval(() => {
        if (index >= tutorialCode.length) {
          clearInterval(intervalId);
          return;
        }
        this.codeToRun += tutorialCode.substring(index, index + 1);
        index++;
      }, 250); //250ms per String position
    },
    //Reset/Whiten the Painted Grid cards
    resetPaintedFields() {
      Array.from(document.querySelectorAll(".painted")).forEach((el) => {
        if (!el.id.includes("v")) {
          el.classList.remove("painted");
        }
      });
      Array.from(document.querySelectorAll(".grid-card")).forEach((el) => {
        if (!el.classList.contains("painted")) {
          el.style.backgroundColor = "#ffffff";
        }
      });
    },
    //GSAP Animation when resetting
    resetAnimation() {
      const resetBtn = document.querySelector(".reset-btn");
      resetBtn.setAttribute("disabled", "disabled");
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
      this.delay(4000).then(() => resetBtn.removeAttribute("disabled"));
    },
    // Changes the Color of the Painted Cards and emits the Color-value to other Vue-Components that need to work with said value
    changeColor(clr) {
      Array.from(document.querySelectorAll(".painted")).forEach((el) => {
        el.style.backgroundColor = clr;
      });
      this.$emit("change-color", clr);
    },
    // Enter Animation for Certain HTML-Elements
    enter(el) {
      gsap.fromTo(
        el,
        { y: 0, x: +200 },
        { delay: 1, duration: 2, y: 0, x: 0, opacity: 1 }
      );
    },
    // Enter Animation for Certain HTML-Elements
    enterInput(el) {
      gsap.fromTo(
        el,
        { y: 0, x: +200, opacity: 0 },
        { delay: 0, duration: 1, y: 0, x: 0, opacity: 1 }
      );
    },
    // Checks If the Given Answer is correct
    checkResult() {
      let allElements = document.getElementsByClassName("painted");
      this.levelElements = [];
      this.paintedElements = [];
      let currentLevel = [];

      //Get current level Information for the Required Solution
      if (localStorage.getItem("currentLevel") !== null) {
        currentLevel = JSON.parse(localStorage.getItem("currentLevel"));
      }
      let requiredSolution = currentLevel.loesungsweg;

      for (let i = 0; i < allElements.length; i++) {
        if (allElements[i].id.includes("v")) {
          this.levelElements.push(allElements[i].id.replace(/\D/g, ""));
        } else {
          this.paintedElements.push(allElements[i].id.replace(/\D/g, ""));
        }
      }
      // If else to verify the result and the required Solution
      if (
        this.areEqual(this.levelElements, this.paintedElements) &&
        this.solution !== requiredSolution
      )
        this.showAlertFailure(requiredSolution, true);
      else if (
        this.areEqual(this.levelElements, this.paintedElements) &&
        this.solution == requiredSolution
      ) {
        this.levelElements = [];
        this.paintedElements = [];
        Array.from(document.querySelectorAll(".painted")).forEach((el) => {
          el.classList.remove("painted");
        });
        this.$emit("timer");
        this.showAlertSuccess();
      } else this.showAlertFailure(requiredSolution, false);
    },
    // Method builds the Success Alert
    showAlertSuccess() {
      // Use sweetalert2
      this.$swal({
        title: "Hervorragend!",
        text: "Du hast das Level gemeistert! Nun kannst du dich an an dem nächsten Level versuchen!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#6D9E1F",
        cancelButtonColor: "#d33",
        confirmButtonText: "Nächstes Level!",
        cancelButtonText: "Zur Levelauswahl!",
        allowOutsideClick: false,
      }).then((result) => {
        if (!result.isConfirmed) {
          this.$router.push({ path: "/", query: { section: "lvl" } });
        } else {
          this.$emit("startPopup");
        }
      });
    },
    // Method builds the Failure Alert, depending on the failure cause (Wrong Painted Fields or Wrong Used Solution or Both)
    showAlertFailure(requiredSolution, correctResult) {
      let alertTxt = "";
      if (!correctResult)
        alertTxt +=
          "Leider hast du die Aufgabe nicht der Anforderungen entsprechend erfüllt! \n";
      if (requiredSolution !== this.solution)
        alertTxt +=
          "Löse die Aufgabe mit dem folgenden: <b>" +
          requiredSolution +
          "</b>.";
      // Use sweetalert2
      this.$swal({
        title: "Beim nächsten Mal...!",
        html: alertTxt,
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#6D9E1F",
        cancelButtonColor: "#d33",
        confirmButtonText: "Level wiederholen!",
        cancelButtonText: "Zur Levelauswahl!",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$emit("failure");
          this.resetAnimation();
        } else {
          this.$router.push({ path: "/", query: { section: "lvl" } });
        }
      });
    },
    // Checks if two arrays are equals and returns Boolean
    areEqual(array1, array2) {
      if (array1.length === array2.length) {
        return array1.every((element, index) => {
          if (element === array2[index]) {
            return true;
          }
          return false;
        });
      }
    }, // Methode can search a String inside of a second String and add a third String in the second Strings Position
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
    // Method tries to run the userwritten code and throws errors if needed
    runfunction() {
      this.resetPaintedFields();
      this.errorMessage = "";
      this.checkWhichSolutionUsed(this.codeToRun);
      // Since the userwritten code is string that becomes a function without outside scope we need to insert the methods paint and checkParamValue as String into the code
      // Methode paint(first,second) paints a grid card with the given coordinates
      // Method checkParamValue(num) checks if the coordinates given in paint are in the range of the grid's length
      let paintStr =
        'function paint(first, second) {\nlet element = document.getElementById("x" + first + "y" + second);\ncheckParamValue(first);\ncheckParamValue(second);\nelement.classList.add("painted");}\n';
      let checkParamValueStr =
        'function checkParamValue(num) {\nconst gridElems = document.querySelectorAll(".grid-card");\nlet maxValue = Math.sqrt(gridElems.length) - 1;\nif (num > maxValue || num < 0) throw new Error("Der/Die angegebene Parameter entsprechen nicht der Feldgröße");}\n';
      let evalCode = this.codeToRun;
      this.checkIfPaintCall(evalCode);
      try {
        this.checkPaintParams(evalCode);
        console.log(evalCode);
        evalCode = this.InsertForLoopInfinitySafety(evalCode);
        console.log(evalCode);
        evalCode = this.InsertWhileInfinitySafety(evalCode);
        // Inserts a variable to count how many times a loop loops in case of an infinite loop
        evalCode = [
          paintStr,
          checkParamValueStr,
          "let infinitySafetyCounter = 0;\n",
          evalCode,
        ].join("");
        let runCodeSafely = new Function(evalCode);
        runCodeSafely();
        this.gotUnreadErrors = false;
        this.changeColor(this.color);
      } catch (error) {
        this.changeErrorMsg(error);
        // Boolean Variable gotUnreadErrors turn on the Console Notification blinking animation
        this.gotUnreadErrors = true;
      }
      if (this.errorMessage == "") this.errorMessage = "Keine Fehlermeldung!";
    },
    //Placeholder for the Code Editor
    checkIfCodeFilled() {
      if (this.codeToRun === "/*Type your own code!*/") {
        this.codeToRun = "";
      }
    },
    // Alot of complicated String manipulation to detect the position of a for-loop, dissect the for-loop and insert a maximum number of allowed iterations
    InsertForLoopInfinitySafety(code) {
      let startPos = code.search("for");
      if (code.search("for") == -1) {
        return code;
      } else {
        let headPos = code.slice(startPos).indexOf("(");
        let head = this.getBracket(code, startPos + headPos);
        let posAfterHead = startPos + 3 + head.length + 1;
        let restStr = code.slice(posAfterHead);
        let bodyPos = restStr.indexOf("{");
        let infCheck =
          '\ninfinitySafetyCounter++;\nif (infinitySafetyCounter > 500) throw new Error("Diese Schleife ist zu lang oder unendlich!");';
        let newReturnCode = [
          code.slice(0, startPos),
          code.slice(startPos, bodyPos + posAfterHead + 1),
          infCheck,
        ].join("");
        let restCode = code.slice(bodyPos + posAfterHead + 1);
        return [newReturnCode, this.InsertForLoopInfinitySafety(restCode)].join(
          ""
        );
      }
    },
    // Even more complicated String manipulation, Essentially detects the number of "while" occurences,
    // For every occurence checks if "while" is a While-Loop or Do-While-Loop and inserts respectively the max amount of allowed iterations
    InsertWhileInfinitySafety(code) {
      var doCount = (code.match(/do/g) || []).length;
      var whileCount = (code.match(/while/g) || []).length;
      let infCheck =
        '\ninfinitySafetyCounter++;\nif (infinitySafetyCounter > 500) throw new Error("Diese Schleife ist zu lang oder unendlich!");';
      let returnStr = "";
      let restCode = code;
      if (doCount == 0 && whileCount == 0) {
        return code;
      } else if (doCount == whileCount) {
        for (let i = doCount; i > 0; i--) {
          let startPos = restCode.search("do");
          let bodyPos = restCode.slice(startPos).indexOf("{");
          returnStr += [
            restCode.slice(0, startPos + bodyPos + 1),
            infCheck,
          ].join("");
          restCode = restCode.slice(startPos + bodyPos + 1);
        }
        return returnStr + restCode;
      } else if (doCount < whileCount) {
        while (doCount > 0 || whileCount > 0) {
          let doPos = restCode.search("do");
          let whilePos = restCode.search("while");
          if (doPos == -1) doPos = 1000000;
          if (whilePos == -1) whilePos = 1000000;
          if (whilePos <= doPos) {
            let startPos = restCode.search("while");
            let headPos = startPos + restCode.slice(startPos).indexOf("(");
            let head = this.getBracket(restCode, headPos);
            let posAfterHead = headPos + head.length + 2;
            let bodyPos = restCode.slice(posAfterHead).indexOf("{");
            returnStr += [
              restCode.slice(0, bodyPos + posAfterHead + 1),
              infCheck,
            ].join("");
            restCode = restCode.slice(bodyPos + posAfterHead + 1);
            whileCount--;
          } else if (whilePos > doPos) {
            let startPos = restCode.search("do");
            let bodyPos = restCode.slice(startPos).indexOf("{");
            let whilePos = restCode.search("while");
            returnStr += [
              restCode.slice(0, startPos + bodyPos + 1),
              infCheck,
              restCode.slice(startPos + bodyPos + 1, whilePos + 5),
            ].join("");
            restCode = restCode.slice(whilePos + 5);
            doCount--;
            whileCount--;
          }
        }
        return returnStr + restCode;
      } else
        throw new Error(
          "Kein korrekter Aufbau einer While oder Do..While Schleife!"
        );
    },
    // Method checks which kind of loop has been used if any, and saves the value in the "solution"-property
    checkWhichSolutionUsed(code) {
      let paintCall = (code.match(/paint/g) || []).length;
      let forCall = (code.match(/for/g) || []).length;
      let whileCall = (code.match(/while/g) || []).length;
      let doCall = (code.match(/do/g) || []).length;
      let functionCall = (code.match(/function/g) || []).length;
      if (functionCall > 0) this.result = "Funktion";
      else if (whileCall > 0 && whileCall == doCall && forCall == 0)
        this.solution = "DoWhileSchleife";
      else if (whileCall > 0 && doCall == 0 && forCall == 0)
        this.solution = "WhileSchleife";
      else if (forCall > 0 && doCall == 0 && whileCall == 0)
        this.solution = "ForSchleife";
      else if (forCall == 0 && doCall == 0 && whileCall == 0 && paintCall > 0)
        this.solution = "PaintAufruf";
    },
    // Method checks if the essential method paint has been called, throws an Error if not (to help new players understand that this method is needed)
    checkIfPaintCall(code) {
      if (code.search("paint") == -1)
        this.errorMessage +=
          "Rufe die paint(x,y) Methode aus um Felder anzumalen!\n";
    },
    // Helper Method takes a String and the position of a Bracket as Parameter and returns the content of given Bracket
    getBracket(str, pos) {
      if (str[pos] == "(") {
        let depth = 1;
        for (let i = pos + 1; i < str.length; i++) {
          switch (str[i]) {
            case "(":
              depth++;
              break;
            case ")":
              if (--depth == 0) {
                return str.slice(pos + 1, i);
              }
              break;
          }
        }
      } else if (str[pos] == "{") {
        let depth = 1;
        for (let i = pos + 1; i < str.length; i++) {
          switch (str[i]) {
            case "{":
              depth++;
              break;
            case "}":
              if (--depth == 0) {
                return str.slice(pos + 1, i);
              }
              break;
          }
        }
      }
    },
    // Method throws an Error if a paint-call has more or less than 2 parameters.
    checkPaintParams(code) {
      let error = new Error(
        "Zu viele Parameter angegeben für die Methode paint."
      );
      let restCode = code;
      while (restCode.search("paint") > -1) {
        let pos = restCode.search("paint");
        let bracketContent = this.getBracket(restCode, pos + 5);
        //console.log('[' + bracketContent + ']');
        if ((bracketContent.match(/,/g) || []).length != 1) throw error;
        restCode = restCode.slice(pos + 5 + bracketContent.length);
      }
    },
    // Some Custom Error messages that are easier to understand for new programmers
    changeErrorMsg(error) {
      if (error instanceof ReferenceError)
        this.errorMessage +=
          "Folgender Ausdruck ist nicht definiert:\n" + error;
      else if (error instanceof TypeError)
        this.errorMessage +=
          "Ein oder Mehrere Parameter wurden nicht übergeben oder sind vom falschen Typ:\n" +
          error;
      else if (error instanceof SyntaxError)
        this.errorMessage +=
          "Da stimmt etwas mit deiner Syntax nicht!\n" + error;
      else this.errorMessage = error;
    },
  },
  computed: {
    // Load the current Level
    currentLevel() {
      if (localStorage.getItem("currentLevel") !== null) {
        return JSON.parse(localStorage.getItem("currentLevel"));
      }
    },
  },
  watch: {
    //The Watcher "color" makes sure the color property is update on change
    color(newVal, oldVal) {
      console.log(this.color);
      Array.from(document.querySelectorAll(".painted")).forEach((el) => {
        el.style.backgroundColor = this.color;
      });
    },
  },
};
</script>


<style scoped>
/* CSS only for CodeInput-Template */
/* CSS for FAB-Animation (inkl. pulsing-Animation) */
.floating-container {
  position: relative;
}
.floating-container .floating-button {
  -webkit-transform: translatey(1px);
  transform: translatey(1px);
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  animation: pulse 5s infinite;
}
.floating-container .element-container .float-element:nth-child(1) {
  margin-bottom: 11em;
  -webkit-animation: come-in 0.4s forwards 0.2s;
  animation: come-in 0.4s forwards 0.2s;
}
.floating-container .element-container .float-element:nth-child(2) {
  margin-bottom: 8em;
  -webkit-animation: come-in 0.4s forwards 0.4s;
  animation: come-in 0.4s forwards 0.4s;
}
.floating-container .element-container .float-element:nth-child(3) {
  margin-bottom: 5em;
  -webkit-animation: come-in 0.4s forwards 0.6s;
  animation: come-in 0.4s forwards 0.6s;
}
.floating-container .element-container .float-element:nth-child(4) {
  margin-bottom: 2em;
  -webkit-animation: come-in 0.4s forwards 0.8s;
  animation: come-in 0.4s forwards 0.8s;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(128, 186, 36, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(128, 186, 36, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(128, 186, 36, 0);
  }
}

.floating-container .floating-button {
  position: absolute;
  bottom: 0;
  width: 65px;
  height: 65px;
  background: #80ba24;
  left: 0.5em;
  border-radius: 50%;
  color: white;
  font-size: 23px;
  z-index: 1;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  -webkit-transform: translatey(5px);
  transform: translatey(5px);
}

.floating-container .float-element {
  position: absolute;
  display: block;
  bottom: 0;
  left: 0.5em;
  opacity: 0;
  -webkit-transform: translateY(100px);
  transform: translateY(100px);
}

.closedFAB .float-element {
  display: none;
}

@-webkit-keyframes come-in {
  0% {
    -webkit-transform: translatey(100px);
    transform: translatey(100px);
    opacity: 0;
  }
  30% {
    -webkit-transform: translateX(-50px) scale(0.4);
    transform: translateX(-50px) scale(0.4);
  }
  70% {
    -webkit-transform: translateX(-50px) scale(1.2);
    transform: translateX(-50px) scale(1.2);
  }
  100% {
    -webkit-transform: translatey(0px) scale(1);
    transform: translatey(0px) scale(1);
    opacity: 1;
  }
}

@keyframes come-in {
  0% {
    -webkit-transform: translatey(100px);
    transform: translatey(100px);
    opacity: 0;
  }
  30% {
    -webkit-transform: translateX(-50px) scale(0.4);
    transform: translateX(-50px) scale(0.4);
  }
  70% {
    -webkit-transform: translateX(0px) scale(1.2);
    transform: translateX(0px) scale(1.2);
  }
  100% {
    -webkit-transform: translatey(-50px) scale(1);
    transform: translatey(-50px) scale(1);
    opacity: 1;
  }
}

/* Classes for Editor + Console */
.consoleArea {
  width: 20vw;
  background-color: white;
}

.greenText {
  background-color: rgba(128, 186, 36, 0.4) !important;
  color: rgba(128, 186, 36, 0.4) !important;
}

.redText {
  background-color: rgba(255, 0, 0, 0.2) !important;
  color: rgba(248, 6, 6, 0.4) !important;
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
