<template>
  <v-container class="">
  <div>
    <v-card elevation="24" height="55em" outlined shaped class="container">
      <h1 class="h1 font-weight-black"> - Hilfen - </h1>
      <v-container>
        <div class="general-content js-general-content">
          <div class="general-component">
            <div class="component" v-for="item in informations" :key="item.id">
              <div>
                <div class="component-internal">
                  <div class="initial-visual-component">
                    <div>
                      <h2 class="white--text text-body-2 text-sm-h5 my-4">{{ item.label }}</h2>
                    </div>
                  </div>
                  <div class="component-content">
                    <div class="component-close-button"></div>
                    <v-card class="mx-auto my-10 card" elevation="20">
                      <div class="container-image-chapter-open">
                        <div class="image">
                          <v-img :src="item.src" contain></v-img>
                          <h2 style="position: absolute; top:50%; left:25%; transform: translate(-25%, -50%)" class="white--text text-h4 text-md-h3"><i>{{ item.label }}!</i></h2>
                        </div>
                      </div>
                      <v-card-title>
                        {{ item.subheader }}
                      </v-card-title>

                      <v-card-text class="black--text">
                        {{ item.informations1 }}
                      </v-card-text>
                      <hr class="divider"/>
                      <v-card-title>
                        {{ item.subheader2 }}
                      </v-card-title>
                      <v-card-text class="black--text">
                        {{ item.informations2 }}
                      </v-card-text>
                      <hr class="divider"/>
                      <v-card-title>
                        Beispiel:
                      </v-card-title>
                      <div class="d-md-flex">
                        <v-img :src="item.Beispiel" class="ml-4 mr-8" max-height="100px" contain></v-img>
                        <v-card-text class="black--text mr-8">
                          {{ item.beispieltext }}
                        </v-card-text>
                      </div>
                      <hr class="divider mt-8"/>
                      <v-card-actions>
                        <v-btn color="orange lighten-2 my-2 mr-8">
                          Button zu offizieller Doku?
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
  data() {
    return {
      informations: [
        {
          id: 1,
          url: require('../../assets/programmingVariablen.png'),
          label: 'Variablen',
          subheader: "Was sind Variablen?",
          src: require('../../assets/helpTemplateBackground.png'),
          informations1: 'Eine Variable lässt sich am besten mit einem Behälter, der genau einen Wert aufnehmen kann, vergleichen. Der Behälter ist ein logischer Speicherplatz mit einem (unveränderlichen) Namen und einem Wert, der verändert werden kann.',
          subheader2: 'Verschiedene Arten von Variablen',
          informations2: 'In JavaScript gibt es drei verschiedene Möglichkeiten Variablen zu deklarieren: const: Symbolische Konstante; deklariert eine unveränderliche Variable ||  let: deklariert eine lokale Variable im Block Scope || var: deklariert eine Variable unabhängig von ihrem Scope (Gültigkeitsbereich).',
          Beispiel: require('../../assets/varExample.png'),
          beispieltext: 'In der ersten Deklaration wird die Konstante PI-Deklariert. Während der Lauzeit kann diese Konstante nicht verändert, aber an beliebigen Stellen verwendet werden. Nach Deklaration einer Variable mit let oder var kann die Variable während der Lauzeit sowohl verändert werden, als auch von beliebigen Stellen genutzt werden.'
        },
        {
          id: 2,
          url: require('../../assets/programmingFunktion.png'),
          label: 'Funktionen',
          subheader: "Was sind Funktionen?",
          src: require('../../assets/helpTemplateBackground.png'),
          informations1: 'Funktionen sind ein Block von Anweisungen unter einem Namen. Der Funktionsblock wird einmal definiert, dann können die Javascript-Befehle der Funktion über den Namen mehrfach im Programm aufgerufen werden. Das Zusammenfassen von Befehlen in einer Funktion verbessert die Lesbarkeit des Scripts und verhindert Fehler.',
          subheader2: 'Ablauf von Funktionen und Funktionsaufrufen',
          informations2: 'Eine JavaScript-Funktion wird mit dem Schlüsselwort function definiert, gefolgt von einem selbstdefinierten Namen, gefolgt von Klammern. Funktionsnamen können Buchstaben, Ziffern, Unterstriche und Dollarzeichen enthalten (dieselben Regeln wie bei Variablen). Die Klammern können durch Kommas getrennte Parameternamen enthalten:( parameter1, parameter2, ... ). Der von der Funktion auszuführende Code steht in geschweiften Klammern: {}. Der Javascript-Interpreter führt die Anweisungen im Block der Funktion erst beim Funktionsaufruf auf.',
          Beispiel: require('../../assets/paintedFunction.png'),
          beispieltext: 'Anhand der in die Funktion ünbergebenden Parameter kann das Element ermittelt und dem jeweiligen Element die Klasse "painted" zugewiesen werden. Der Funktionsaufruf geschieht über den Namen der Funktion und passender Parameterübergabe.'
        },
        {
          id: 3,
          url: require('../../assets/programmingFor.png'),
          label: 'For',
          subheader: "Was sind For-Schleifen?",
          src: require('../../assets/helpTemplateBackground.png'),
          informations1: 'Die for-Schleife wird verwendet, wenn eine bestimmte Anzahl an Durchläufen benötigt wird. Der Schleifenkopf fasst die Vorbereitung der ganzen Schleife, die Schleifenbedingung und die nötigen Berechnungen zur Fortsetzung der Schleife zusammen.',
          subheader2: 'Syntax einer for-Schleife',
          informations2: 'Sie notieren also zunächst das Schlüsselwort for und öffnen eine runde Klammer. Es folgen drei Code-Stücke, die die Schleife steuern und durch ein Semikolon voneinander getrennt werden. Danach notieren Sie eine schließende runde Klammer und es folgen eine oder mehrere Anweisungen, die durch geschweifte Klammern zusammengefasst werden. Initialisierung: Sie geschieht als erstes, und nur ein einziges Mal. Hier können Sie beispielsweise einen Zähler auf seinen Anfangswert setzen. Schleifenbedingung: Sie wird vor jedem Schleifendurchlauf ausgewertet und muss true liefern, damit der Schleifenrumpf ausgeführt wird. Sie können hier prüfen, ob der Endwert Ihres Zählers noch nicht erreicht ist. Fortsetzung: Sie wird nach jedem Schleifendurchlauf ausgewertet. Ihr Zähler könnte hier um 1 erhöht werden. Grundsätzlich handelt es sich bei der For-Schleife um eine Form von syntaktischem Zucker, denn man könnte, von einer Kleinigkeit abgesehen, auf die wir noch eingehen, die for-Schleife genauso gut als while-Schleife aufschreiben:',
          Beispiel: require('../../assets/forExample.png'),
          beispieltext: 'Im Beispiel wird eine result Variable deklariert. Die for-Schleife beginnt bei 0 und läuft solange, bis der Initialwert i kleiner als 5 ist. I wird bei jeden Schleifendurchlauf um einen Punkt erhöht. Die Schleife in dem Beispiel wird also 4x ausgeführt. Wenn die Schleife den 5 Schritt ebenfalls ausführen soll, dann muss die Abbruchbedingung ein <= aufweisen.'
        },
        {
          id: 4,
          url: require('../../assets/programmingWhile.png'),
          label: 'While',
          subheader: "Was sind While-Schleifen?",
          src: require('../../assets/helpTemplateBackground.png'),
          informations1: 'Die while-Schleife wertet zunächst die Schleifenbedingung aus. Ergibt sich dabei der Wert true (oder ein true-artiger Wert), wird der Schleifenrumpf ausgeführt. Danach beginnt der Ablauf von vorn. Dieser Schleifentyp eignet sich wenn Sie im Voraus nicht wissen, wie oft die Schleife zu durchlaufen ist wenn es beabsichtigt ist, dass der Schleifenrumpf eventuell gar nicht durchlaufen wird',
          subheader2: 'Syntax einer While-Schleife',
          informations2: 'Eine while-Schleife beginnt mit dem Schlüsselwort while (while = solange). Dahinter folgt, in runden Klammern ( und ) stehend, die Schleifenbedingung. Um eine Bedingung zu formulieren, brauchen Sie beispielsweise Vergleichsoperatoren oder logische Operatoren. Danach folgt der Schleifenrumpf, der eine einzelne JavaScript-Anweisung sein kann oder ein Block aus mehreren Anweisungen, die in geschweifte Klammern { und } gesetzt werden.',
          Beispiel: require('../../assets/WhileExample.png'),
          beispieltext: 'Anders als bei der for-Schleife muss die Zählvariable i hier außerhalb der Schleife angelegt werden, und innerhalb der Schleife zur Abbruchbedingung beigetragen werden. Innerhalb des Schleifen-blocks wird der gewünschte Code ausgeführt. Besonders bei einer While-Schleife muss Vorsicht geboten sein, denn die Zusammenhänge für Abbruchbedingung sind uneindeutiger als bei der for-Schleife, wodurch es leichter zu Endlosschleifen kommt.'
        },
        {
          id: 5,
          url: require('../../assets/programmingDoWhile.png'),
          label: 'Do-While',
          subheader: "Was sind Do-While-Schleifen?",
          src: require('../../assets/helpTemplateBackground.png'),
          informations1: 'Die do-while-Schleife verhält sich ähnlich wie die while-Schleife, wertet aber die Schleifenbedingung erst nach Ausführung des Schleifenrumpfes aus. Dieser Schleifentyp eignet sich dann, wenn Sie mindestens einmal durch den Schleifenrumpf durchlaufen müssen, um entscheiden zu können, ob der Rumpf wiederholt werden muss oder nicht.',
          subheader2: 'Syntax einer do-While-Schleife',
          informations2: 'Eine do-while-Schleife beginnt mit dem Schlüsselwort do (do = tue etwas). Hinter dem do folgt eine einzelne Anweisung oder ein Anweisungsblock in geschweiften Klammern { und }. Darauf folgt als nächstes das Schlüsselwort while, hinter dem in runden Klammern ( und ) die Schleifenbedingung steht. Der Aufbau der do-while-Schleife ist eigentlich seltsam. Zum einen ist das do technisch gar nicht nötig, es ist eher eine Lesehilfe für Sie, damit Sie nicht unvermittelt vor dem Beginn eines Anweisungsblocks stehen. Andererseits, wenn man es schon einmal hat, könnte man auch ganz auf die geschweiften Klammern verzichten. Das geht aber wie in jeder anderen Kontrollstruktur nur, wenn der Schleifenrumpf nur aus einer einzelnen Anweisung besteht. JavaScript orientiert sich hier schlicht an seinem Vorbild, der Programmiersprache C.',
          Beispiel: require('../../assets/doWhileExample.png'),
          beispieltext: 'Bei der do-While-Schleife wird die Zählvariable in der Regel ebenfalls außerhalb der Schleife deklariert. Bevor die Schleife prüft, ob der Schleifendurchgang wiederholt werden muss, wird bei der do-While-Schleife jedoch der Code im do-Bereich vorher ausgeführt. Wir zählen das i also hoch und verrechnen dieses mit unserem Ergebnis. Im Anschluss überprüfen wir, ob i < 5 ist. Solange i also kleiner als 5 ist, wird der bereich in do-Block weiter ausgeführt.'
        },
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
    var generalcontent = document.querySelector(".general-content");
    var arraycontent = [].slice.call(
        document.querySelectorAll(".component")
    );
    var closebuttons = [].slice.call(
        document.querySelectorAll(".component-close-button")
    );

    setTimeout(function () {
      generalcontent.classList.remove("js-general-content");
    }, 200);

    arraycontent.forEach(function (component) {
      component.addEventListener("click", function () {
        if (this.classList.contains("component-active")) return;
        generalcontent.classList.add("component--active");
        this.classList.add("component-active");
      });
    });

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
* {
  overflow: hidden;
}

.testclass {
  writing-mode: vertical-rl;
  text-orientation: upright;
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


@keyframes sTransition {
  0% {
    background-position: 0%;
  }

  100% {
    background-position: 400%;
  }
}

.divider {
  opacity: 1;
  border-radius: 100%;
  background-color: rgba(128, 186, 36, 1);
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
  /*Sinn von diesen werten? Ziemlich unnötig soweit ich das sehe.*/
  left: 0;
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

.general-content.component--active .component:nth-child(2):not(.component-active) {
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

.general-content.component--active .component:nth-child(3):not(.component-active) {
  transform: scale(0.5) translate3d(210.4166666667%, 0, 0);
  opacity: 0;
  transition: transform 0.95s, opacity 0.95s;
}

.component:nth-child(4) {
  transform: translate3d(315.625%, 0, 0);
  transform-origin: 365.625% 50%;
}

.general-content.component--active .component:nth-child(4):not(.component-active) {
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

.general-content.component--active .component:nth-child(5):not(.component-active) {
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