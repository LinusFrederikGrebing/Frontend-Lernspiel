<template>
  <div>
    <v-container fluid>
      <div class="general-content js-general-content">
        <div class="general-component">
          <div class="componente" v-for="item in informations" :key="item.id">
            <div class="non-scroll-component">
              <div class="component-internal">
                <div class="components-background-image"></div>
                <div class="initial-visual-component">
                  <h2 class="white--text">- Kapitel {{ item.id }} - </h2>
                </div>
                <div class="componente-content">
                  <div class="component-close-button"></div>
                  <v-card class="mx-auto my-2" elevation="20" >
                    <v-img :src="item.src" height="12em"></v-img>
                    <v-card-title>
                      {{ item.subheader }}
                    </v-card-title>

                    <v-card-text class="black--text">
                      {{ item.informations1 }}
                    </v-card-text>
                    <hr class="divider" />
                    <v-card-title>
                      {{ item.subheader2 }}
                    </v-card-title>
                    <v-card-text class="black--text">
                      {{ item.informations2 }}
                    </v-card-text>
                    <hr class="divider" />
                    <v-card-title>
                    Beispiel:
                    </v-card-title>
                    <div class="d-flex">
                    <v-img :src="item.Beispiel" class="ml-4 mr-8" ></v-img>
                    <v-card-text class="black--text mr-8">
                      {{ item.beispieltext }}
                    </v-card-text></div>
                    <hr class="divider mt-8" />
                    <v-card-actions>
                      <v-btn color="orange lighten-2 my-2 mr-8">
                        Button zu offizieller Doku?
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </div>
              </div>
            </div>
            <div class="componente-index">
              <div class="componente-index-back">{{ item.id }}</div>
              <div class="componente-index-front">
                <div class="componente-index-overlay" :data-index="item.id">
                  {{ item.id }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "HelpTemplate",
  props: { levels: Array },
  data() {
    return {
    informations: [
        { id: 1, label: 'Variablen', subheader: "Was sind Variablen?", src: require('../assets/javascript-functions.png'), informations1: 'Funktionen sind ein Block von Anweisungen unter einem Namen. Der Funktionsblock wird einmal definiert, dann können die Javascript-Befehle der Funktion über den Namen mehrfach im Programm aufgerufen werden. Das Zusammenfassen von Befehlen in einer Funktion verbessert die Lesbarkeit des Scripts und verhindert Fehler.', subheader2: 'Ablauf von Funktionen und Funktionsaufrufen', informations2: 'Eine JavaScript-Funktion wird mit dem Schlüsselwort function definiert, gefolgt von einem selbstdefinierten Namen, gefolgt von Klammern. Funktionsnamen können Buchstaben, Ziffern, Unterstriche und Dollarzeichen enthalten (dieselben Regeln wie bei Variablen). Die Klammern können durch Kommas getrennte Parameternamen enthalten:( parameter1, parameter2, ... ). Der von der Funktion auszuführende Code steht in geschweiften Klammern: {}. Der Javascript-Interpreter führt die Anweisungen im Block der Funktion erst beim Funktionsaufruf auf.', Beispiel: require('../assets/paintedFunction.png'), beispieltext: 'Anhand der in die Funktion ünbergebenden Parameter kann das Element ermittelt und dem jeweiligen Element die Klasse "painted" zugewiesen werden. Der Funktionsaufruf geschieht über den Namen der Funktion und passender Parameterübergabe.' },
        { id: 2, label: 'Funktionen', subheader: "Was sind Funktionen?", src: require('../assets/javascript-functions.png'), informations1: 'Funktionen sind ein Block von Anweisungen unter einem Namen. Der Funktionsblock wird einmal definiert, dann können die Javascript-Befehle der Funktion über den Namen mehrfach im Programm aufgerufen werden. Das Zusammenfassen von Befehlen in einer Funktion verbessert die Lesbarkeit des Scripts und verhindert Fehler.', subheader2: 'Ablauf von Funktionen und Funktionsaufrufen', informations2: 'Eine JavaScript-Funktion wird mit dem Schlüsselwort function definiert, gefolgt von einem selbstdefinierten Namen, gefolgt von Klammern. Funktionsnamen können Buchstaben, Ziffern, Unterstriche und Dollarzeichen enthalten (dieselben Regeln wie bei Variablen). Die Klammern können durch Kommas getrennte Parameternamen enthalten:( parameter1, parameter2, ... ). Der von der Funktion auszuführende Code steht in geschweiften Klammern: {}. Der Javascript-Interpreter führt die Anweisungen im Block der Funktion erst beim Funktionsaufruf auf.', Beispiel: require('../assets/paintedFunction.png'), beispieltext: 'Anhand der in die Funktion ünbergebenden Parameter kann das Element ermittelt und dem jeweiligen Element die Klasse "painted" zugewiesen werden. Der Funktionsaufruf geschieht über den Namen der Funktion und passender Parameterübergabe.' },
        { id: 3, label: 'For-Schleifen', subheader: "Was sind For-Schleifen?", src: require('../assets/javascript-functions.png'), informations1: 'Funktionen sind ein Block von Anweisungen unter einem Namen. Der Funktionsblock wird einmal definiert, dann können die Javascript-Befehle der Funktion über den Namen mehrfach im Programm aufgerufen werden. Das Zusammenfassen von Befehlen in einer Funktion verbessert die Lesbarkeit des Scripts und verhindert Fehler.', subheader2: 'Ablauf von Funktionen und Funktionsaufrufen', informations2: 'Eine JavaScript-Funktion wird mit dem Schlüsselwort function definiert, gefolgt von einem selbstdefinierten Namen, gefolgt von Klammern. Funktionsnamen können Buchstaben, Ziffern, Unterstriche und Dollarzeichen enthalten (dieselben Regeln wie bei Variablen). Die Klammern können durch Kommas getrennte Parameternamen enthalten:( parameter1, parameter2, ... ). Der von der Funktion auszuführende Code steht in geschweiften Klammern: {}. Der Javascript-Interpreter führt die Anweisungen im Block der Funktion erst beim Funktionsaufruf auf.', Beispiel: require('../assets/paintedFunction.png'), beispieltext: 'Anhand der in die Funktion ünbergebenden Parameter kann das Element ermittelt und dem jeweiligen Element die Klasse "painted" zugewiesen werden. Der Funktionsaufruf geschieht über den Namen der Funktion und passender Parameterübergabe.' },
        { id: 4, label: 'While-Schleifen', subheader: "Was sind While-Schleifen?", src: require('../assets/javascript-functions.png'), informations1: 'Funktionen sind ein Block von Anweisungen unter einem Namen. Der Funktionsblock wird einmal definiert, dann können die Javascript-Befehle der Funktion über den Namen mehrfach im Programm aufgerufen werden. Das Zusammenfassen von Befehlen in einer Funktion verbessert die Lesbarkeit des Scripts und verhindert Fehler.', subheader2: 'Ablauf von Funktionen und Funktionsaufrufen', informations2: 'Eine JavaScript-Funktion wird mit dem Schlüsselwort function definiert, gefolgt von einem selbstdefinierten Namen, gefolgt von Klammern. Funktionsnamen können Buchstaben, Ziffern, Unterstriche und Dollarzeichen enthalten (dieselben Regeln wie bei Variablen). Die Klammern können durch Kommas getrennte Parameternamen enthalten:( parameter1, parameter2, ... ). Der von der Funktion auszuführende Code steht in geschweiften Klammern: {}. Der Javascript-Interpreter führt die Anweisungen im Block der Funktion erst beim Funktionsaufruf auf.', Beispiel: require('../assets/paintedFunction.png'), beispieltext: 'Anhand der in die Funktion ünbergebenden Parameter kann das Element ermittelt und dem jeweiligen Element die Klasse "painted" zugewiesen werden. Der Funktionsaufruf geschieht über den Namen der Funktion und passender Parameterübergabe.' },
        { id: 5, label: 'Do-While-Schleifen', subheader: "Was sind Do-While-Schleifen?", src: require('../assets/javascript-functions.png'), informations1: 'Funktionen sind ein Block von Anweisungen unter einem Namen. Der Funktionsblock wird einmal definiert, dann können die Javascript-Befehle der Funktion über den Namen mehrfach im Programm aufgerufen werden. Das Zusammenfassen von Befehlen in einer Funktion verbessert die Lesbarkeit des Scripts und verhindert Fehler.', subheader2: 'Ablauf von Funktionen und Funktionsaufrufen', informations2: 'Eine JavaScript-Funktion wird mit dem Schlüsselwort function definiert, gefolgt von einem selbstdefinierten Namen, gefolgt von Klammern. Funktionsnamen können Buchstaben, Ziffern, Unterstriche und Dollarzeichen enthalten (dieselben Regeln wie bei Variablen). Die Klammern können durch Kommas getrennte Parameternamen enthalten:( parameter1, parameter2, ... ). Der von der Funktion auszuführende Code steht in geschweiften Klammern: {}. Der Javascript-Interpreter führt die Anweisungen im Block der Funktion erst beim Funktionsaufruf auf.', Beispiel: require('../assets/paintedFunction.png'), beispieltext: 'Anhand der in die Funktion ünbergebenden Parameter kann das Element ermittelt und dem jeweiligen Element die Klasse "painted" zugewiesen werden. Der Funktionsaufruf geschieht über den Namen der Funktion und passender Parameterübergabe.' },
    ]
  };     
  },
  methods: {
    paint(first, second) {
      let element = document.getElementById("vx" + first + "vy" + second);
      element.classList.add("painted");
    },
    resetPaintedFields() {
      Array.from(document.querySelectorAll(".painted")).forEach((el) => {
        if (!el.id.includes("v")) {
          el.classList.remove("painted");
        }
      });
    },
  },
  mounted() {
    console.log(this.levels);
    var $conteudoGeral = document.querySelector(".general-content");
    var $conteudoEmArray = [].slice.call(
      document.querySelectorAll(".componente")
    );
    var $botoesDeFechar = [].slice.call(
      document.querySelectorAll(".component-close-button")
    );

    setTimeout(function () {
      $conteudoGeral.classList.remove("js-general-content");
    }, 200);

    $conteudoEmArray.forEach(function ($componente) {
      $componente.addEventListener("click", function () {
        if (this.classList.contains("component-active")) return;
        $conteudoGeral.classList.add("component--active");
        this.classList.add("component-active");
      });
    });

    $botoesDeFechar.forEach(function ($btn) {
      $btn.addEventListener("click", function (e) {
        e.stopPropagation();
        $conteudoGeral.classList.remove("component--active");
        document
          .querySelector(".componente.component-active")
          .classList.remove("component-active");
      });
    });

    function paint(first, second) {
      let element = document.getElementById("vx" + first + "vy" + second);
      element.classList.add("painted");
    };
    /* Funktionsaufruf: */ paint(1,1);

  },
};
</script>
<style scoped>
*{
  overflow: hidden;
}
.divider {
  opacity: 0.5;
  border-radius: 100%;
  background-color: red;
}
.componente {
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
  width: 19.2%;
  height: 100%;
  background: #252525;
  transition: transform 0.6s 0.7s, width 0.7s, opacity 0.6s 0.7s,
    z-index 0s 1.3s;
  will-change: transform, width, opacity;
}

.initial-visual-component {
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 2em;
  position: absolute;
  width: 100%;
  height: 100%;
}

.componente-content {
  z-index: -1;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 30px;
  opacity: 0;
  transition: all 0.1s;
}

.componente.component-active .componente-content {
  z-index: 2;
  opacity: 1;
  transition: all 0.5s 1.4s;
}

.component-close-button {
  position: absolute;
  right: 1em;
  top: 1em;
  width: 4em;
  height: 4em;
  opacity: 0;
  transition: all 0s 0.45s;
}

.componente.component-active .component-close-button {
  z-index: 5;
  opacity: 1;
  
}

.component-close-button:before,
.component-close-button:after {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 8px;
  margin-top: -4px;
  background: #fff;
  opacity: 0;
  transition: opacity 0s;
}

.componente.component-active .component-close-button:before,
.componente.component-active .component-close-button:after {
  opacity: 1;
}

.component-close-button:before {
  transform: rotate(45deg) translateX(100%);
}

.componente.component-active .component-close-button:before {
  transition: all 0.3s 1.4s cubic-bezier(0.72, 0.09, 0.32, 1.57);
  transform: rotate(45deg) translateX(0);
}

.component-close-button:after {
  transform: rotate(-45deg) translateX(100%);
}

.componente.component-active .component-close-button:after {
  transition: all 0.3s 1.55s cubic-bezier(0.72, 0.09, 0.32, 1.57);
  transform: rotate(-45deg) translateX(0);
}

.componente-index {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 20vw;
  font-weight: bold;
}

.general-content.component--active .componente-index {
  opacity: 0;
}

.componente-index-front {
  position: absolute;
  left: 30px;
  top: -15px;
}

.componente-index-back {
  color: #2f3840;
  opacity: 0.25;
  transition: opacity 0.25s 0.25s;
}

.componente:hover .componente-index-back {
  transition: opacity 1.25s;
  opacity: 1;
}

.componente-index-overlay {
  overflow: hidden;
  color: transparent;
}

.componente-index-overlay:before {
  content: attr(data-index);
  position: absolute;
  background: -webkit-linear-gradient(  rgba(128, 186, 36, 1),
    rgb(62, 97, 6));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transform: translate3d(0, -100%, 0);
}

.componente:hover .componente-index-overlay:before {
  transform: translate3d(0, 0, 0);
}

.componente:nth-child(2) {
  transform: translate3d(105.2083333333%, 0, 0);
}

.general-content.component--active .componente:nth-child(2):not(.component-active) {
  transform: scale(0.5) translate3d(105.2083333333%, 0, 0);
  opacity: 0;
  transition: transform 0.95s, opacity 0.95s;
}

.componente:nth-child(2) .component-internal {
  transition-delay: 0.1s;
}

.componente:nth-child(3) {
  transform: translate3d(210.4166666667%, 0, 0);
  transform-origin: 260.4166666667% 50%;
}

.general-content.component--active .componente:nth-child(3):not(.component-active) {
  transform: scale(0.5) translate3d(210.4166666667%, 0, 0);
  opacity: 0;
  transition: transform 0.95s, opacity 0.95s;
}

.componente:nth-child(4) {
  transform: translate3d(315.625%, 0, 0);
  transform-origin: 365.625% 50%;
}

.general-content.component--active .componente:nth-child(4):not(.component-active) {
  transform: scale(0.5) translate3d(315.625%, 0, 0);
  opacity: 0;
  transition: transform 0.95s, opacity 0.95s;
}

.componente:nth-child(4) .component-internal {
  transition-delay: 0.3s;
}

.componente:nth-child(5) {
  transform: translate3d(420.8333333333%, 0, 0);
  transform-origin: 470.8333333333% 50%;
}

.general-content.component--active .componente:nth-child(5):not(.component-active) {
  transform: scale(0.5) translate3d(420.8333333333%, 0, 0);
  opacity: 0;
  transition: transform 0.95s, opacity 0.95s;
}


.componente.component-active {
  z-index: 1;
  width: 100%;
  transform: translate3d(0, 0, 0);
  transition: transform 0.6s, width 0.7s 0.7s, z-index 0s;
}
</style>
