<template>
    <v-container>
      <div class="mb-16">
        <v-expansion-panels>
          <v-expansion-panel
            v-for="item in informations" :key="item.id"
          >
            <v-expansion-panel-header class="text-h6 text-sm-h5 my-4">
              {{ item.label }}
            </v-expansion-panel-header>
            <v-expansion-panel-content class="">
              <v-card class="panel_item">
                <v-img :src="item.src" max-height="5em"></v-img>
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
                <div class="">
                  <v-img :src="item.Beispiel" class="ml-4 mr-8" max-height="100px" contain></v-img>
                  <v-card-text class="black--text mr-8">
                    {{ item.beispieltext }}
                  </v-card-text>
                </div>
                <hr class="divider mt-8"/>
                <v-card-actions>
                  <v-btn color="orange lighten-2 my-2 mr-8" @click="openInNewTab($event, item.documentation)">
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
  props: {levels: Array},
  data() {
  return {
    informations: [
      {
        id: 1,
        label: 'Variablen',
        name: 'Variablen',
        subheader: "Was sind Variablen?",
        src: require('../../assets/helpTemplateBackground.png'),
        informations1: 'Eine Variable lässt sich am besten mit einem Behälter, der genau einen Wert aufnehmen kann, vergleichen. Der Behälter ist ein logischer Speicherplatz mit einem (unveränderlichen) Namen und einem Wert, der verändert werden kann.',
        subheader2: 'Verschiedene Arten von Variablen',
        informations2: 'In JavaScript gibt es drei verschiedene Möglichkeiten Variablen zu deklarieren: const: Symbolische Konstante; deklariert eine unveränderliche Variable ||  let: deklariert eine lokale Variable im Block Scope || var: deklariert eine Variable unabhängig von ihrem Scope (Gültigkeitsbereich).',
        Beispiel: require('../../assets/varExample.png'),
        beispieltext: 'In der ersten Deklaration wird die Konstante PI-Deklariert. Während der Lauzeit kann diese Konstante nicht verändert, aber an beliebigen Stellen verwendet werden. Nach Deklaration einer Variable mit let oder var kann die Variable während der Lauzeit sowohl verändert werden, als auch von beliebigen Stellen genutzt werden.',
        documentation: 'https://www.w3schools.com/js/js_variables.asp',
      },
      {
        id: 2,
        label: 'Funktionen',
        name: 'Funktionen',
        subheader: "Was sind Funktionen?",
        src: require('../../assets/helpTemplateBackground.png'),
        informations1: 'Funktionen sind ein Block von Anweisungen unter einem Namen. Der Funktionsblock wird einmal definiert, dann können die Javascript-Befehle der Funktion über den Namen mehrfach im Programm aufgerufen werden. Das Zusammenfassen von Befehlen in einer Funktion verbessert die Lesbarkeit des Scripts und verhindert Fehler.',
        subheader2: 'Ablauf von Funktionen und Funktionsaufrufen',
        informations2: 'Eine JavaScript-Funktion wird mit dem Schlüsselwort function definiert, gefolgt von einem selbstdefinierten Namen, gefolgt von Klammern. Funktionsnamen können Buchstaben, Ziffern, Unterstriche und Dollarzeichen enthalten (dieselben Regeln wie bei Variablen). Die Klammern können durch Kommas getrennte Parameternamen enthalten:( parameter1, parameter2, ... ). Der von der Funktion auszuführende Code steht in geschweiften Klammern: {}. Der Javascript-Interpreter führt die Anweisungen im Block der Funktion erst beim Funktionsaufruf aus.',
        Beispiel: require('../../assets/functionExample.jpg'),
        beispieltext: 'Anhand der in die Funktion übergebene Parameter kann das Element ermittelt und dem jeweiligen Element die Klasse "painted" zugewiesen werden. Der Funktionsaufruf geschieht über den Namen der Funktion und passender Parameterübergabe.',
        documentation: 'https://www.w3schools.com/js/js_functions.asp',
      },
      {
        id: 3,
        label: 'For',
        name: 'For-Schleife',
        subheader: "Was sind For-Schleifen?",
        src: require('../../assets/helpTemplateBackground.png'),
        informations1: 'Die for-Schleife wird verwendet, wenn eine bestimmte Anzahl an Durchläufen benötigt wird. Der Schleifenkopf fasst die Vorbereitung der ganzen Schleife, die Schleifenbedingung und die nötigen Berechnungen zur Fortsetzung der Schleife zusammen.',
        subheader2: 'Syntax einer for-Schleife',
        informations2: 'Sie notieren also zunächst das Schlüsselwort for und öffnen eine runde Klammer. Es folgen drei Code-Stücke, die die Schleife steuern und durch ein Semikolon voneinander getrennt werden. Danach notieren Sie eine schließende runde Klammer und es folgen eine oder mehrere Anweisungen, die durch geschweifte Klammern zusammengefasst werden. Initialisierung: Sie geschieht als erstes, und nur ein einziges Mal. Hier können Sie beispielsweise einen Zähler auf seinen Anfangswert setzen. Schleifenbedingung: Sie wird vor jedem Schleifendurchlauf ausgewertet und muss true liefern, damit der Schleifenrumpf ausgeführt wird. Sie können hier prüfen, ob der Endwert Ihres Zählers noch nicht erreicht ist. Fortsetzung: Sie wird nach jedem Schleifendurchlauf ausgewertet. Ihr Zähler könnte hier um 1 erhöht werden. Grundsätzlich handelt es sich bei der for-Schleife um eine Form von syntaktischem Zucker, denn man könnte, von einer Kleinigkeit abgesehen, auf die wir noch eingehen, die for-Schleife genauso gut als while-Schleife aufschreiben:',
        Beispiel: require('../../assets/forExample.jpg'),
        beispieltext: 'Im Beispiel wird eine result Variable deklariert. Die for-Schleife beginnt bei 0 und läuft solange, bis der Initialwert i kleiner als 5 ist. i wird bei jedem Schleifendurchlauf um einen Punkt erhöht. In diesem Beispiel wird die Schleife also 4x ausgeführt. Wenn die Schleife den 5. Schritt ebenfalls ausführen soll, dann muss die Abbruchbedingung ein <= aufweisen.',
        documentation: 'https://www.w3schools.com/js/js_loop_for.asp',
      },
      {
        id: 4,
        label: 'While',
        name: 'While-Schleife',
        subheader: "Was sind While-Schleifen?",
        src: require('../../assets/helpTemplateBackground.png'),
        informations1: 'Die while-Schleife wertet zunächst die Schleifenbedingung aus. Ergibt sich dabei der Wert true (oder ein true-artiger Wert), wird der Schleifenrumpf ausgeführt. Danach beginnt der Ablauf von vorn. Dieser Schleifentyp eignet sich wenn Sie im Voraus nicht wissen, wie oft die Schleife zu durchlaufen ist.',
        subheader2: 'Syntax einer While-Schleife',
        informations2: 'Eine while-Schleife beginnt mit dem Schlüsselwort while (while = solange). Dahinter folgt, in runden Klammern ( und ) stehend, die Schleifenbedingung. Um eine Bedingung zu formulieren, brauchen Sie beispielsweise Vergleichsoperatoren oder logische Operatoren. Danach folgt der Schleifenrumpf, der eine einzelne JavaScript-Anweisung sein kann oder ein Block aus mehreren Anweisungen, die in geschweifte Klammern { und } gesetzt werden.',
        Beispiel: require('../../assets/whileExample.jpg'),
        beispieltext: 'Anders als bei der for-Schleife muss die Zählvariable i hier außerhalb der Schleife angelegt werden, und innerhalb der Schleife zur Abbruchbedingung beigetragen werden. Innerhalb des Schleifen-blocks wird der gewünschte Code ausgeführt. Besonders bei einer while-Schleife muss Vorsicht geboten sein, denn die Zusammenhänge für die Abbruchbedingungen sind uneindeutiger als bei der for-Schleife, wodurch es leichter zu Endlosschleifen kommt.',
        documentation: 'https://www.w3schools.com/js/js_loop_while.asp',
      },
      {
        id: 5,
        label: 'Do-While',
        name: 'Do-While-Schleife',
        subheader: "Was sind Do-While-Schleifen?",
        src: require('../../assets/helpTemplateBackground.png'),
        informations1: 'Die do-while-Schleife verhält sich ähnlich wie die while-Schleife, wertet aber die Schleifenbedingung erst nach Ausführung des Schleifenrumpfes aus. Dieser Schleifentyp eignet sich dann, wenn Sie mindestens einmal durch den Schleifenrumpf durchlaufen müssen, um entscheiden zu können, ob der Rumpf wiederholt werden muss oder nicht.',
        subheader2: 'Syntax einer do-While-Schleife',
        informations2: 'Eine do-while-Schleife beginnt mit dem Schlüsselwort do (do = tue etwas). Hinter dem do folgt eine einzelne Anweisung oder ein Anweisungsblock in geschweiften Klammern { und }. Darauf folgt als nächstes das Schlüsselwort while, hinter dem in runden Klammern ( und ) die Schleifenbedingung steht. Der Aufbau der do-while-Schleife ist eigentlich seltsam. Zum einen ist das do technisch gar nicht nötig, es ist eher eine Lesehilfe für Sie, damit Sie nicht unvermittelt vor dem Beginn eines Anweisungsblocks stehen. Andererseits, wenn man es schon einmal hat, könnte man auch ganz auf die geschweiften Klammern verzichten. Das geht aber wie in jeder anderen Kontrollstruktur nur, wenn der Schleifenrumpf nur aus einer einzelnen Anweisung besteht. JavaScript orientiert sich hier schlicht an seinem Vorbild, der Programmiersprache C.',
        Beispiel: require('../../assets/dowhileExample.jpg'),
        beispieltext: 'Bei der do-while-Schleife wird die Zählvariable in der Regel ebenfalls außerhalb der Schleife deklariert. Bevor die Schleife prüft ob der Schleifendurchgang wiederholt werden muss, wird bei der do-while-Schleife jedoch der Code im do-Bereich vorher ausgeführt. Wir zählen das i also hoch und verrechnen dieses mit unserem Ergebnis. Im Anschluss überprüfen wir, ob i < 5 ist. Solange i also kleiner als 5 ist, wird der bereich in do-Block weiter ausgeführt.',
        documentation: 'https://www.w3schools.com/jsref/jsref_dowhile.asp',
      },
    ]
  };
  },
methods: {
  // The function openInNewTab opens a new tab with the given URL after 100 milliseconds and sets focus to it, while also preventing the default event from occurring.
  openInNewTab(event, url) {
      event.preventDefault();
      setTimeout(function(){
        var win = window.open(url, '_blank');
        win.focus();
      }, 100);
    },
},
}
</script>
<style scoped>
/* CSS only for HelpMobile-Template */
.panel_item {
  max-height: 20em;
  overflow: scroll;
}
</style>