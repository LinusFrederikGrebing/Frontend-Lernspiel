export default { 
  levels: {
    level1: {
      description: '<h3>Hallo und Herzlich Wilkommen zum ersten Level von Draw IT!</h3> <br /> <p class=\"line-1 anim-typewriter1\">Im ersten Level wirst Du die Grundlagen des Spiels erlernen.</p> <p class=\"line-1 anim-typewriter2\"> Rechts-Oben findest du die Vorlage. Deine Aufgabe ist es die</p> <p class=\"line-1 anim-typewriter3\">Vorlage mit bekannten Javascript-Operatoren ins linke Feld</p> <p class=\"line-1 anim-typewriter4\">nachzuzeichnen. Du kannst das Feld mit der Methode:</p><p class=\"line-1 anim-typewriter5\"> <b>paint(x, y)</b> anmalen.</p><br /><p class=\"line-1 anim-typewriter6\">Jetzt bist Du an der Reihe! Viel Spaß!</p>'
    },
    level2: {
      description: '<h3>Level 2</h3> <br /> <p class=\"line-1 anim-typewriter1\">Im zweiten Level benutzen wir eine For-Schleife. Viel Spaß!'
    },
    level3: {
      description: "<h3>Level 3</h3> <br /> <p class=\"line-1 anim-typewriter1\">Ein bisschen Abstand dazwischen ist bestimmt nicht so schwer!</p> <p class=\"line-1 anim-typewriter2\">Nutze in dieser Aufgabe stattdessen die While-Schleife!</p>",
    },
    level4: {
      description: "<h3>Level 4</h3> <br /> <p class=\"line-1 anim-typewriter1\">Jetzt trau dich mal an eine Diagonale!</p> <p class=\"line-1 anim-typewriter2\">Nutze in dieser Aufgabe nochmal die For-Schleife!</p>",
    },
    level5: {
      description: "<h3>Level 5</h3> <br /> <p class=\"line-1 anim-typewriter1\">Es ist das selbe Muster!</p> <p class=\"line-1 anim-typewriter2\">Nutze dafür aber diesmal die While-Schleife!</p>"
    },
    level6: {
      description: "<h3>Level 6</h3> <br /> <p class=\"line-1 anim-typewriter1\">Mach das selbe nochmal!!</p> <p class=\"line-1 anim-typewriter2\">Keine Sorge, nur noch einmal mit einer Do-While-Schleife!</p> <p class=\"line-1 anim-typewriter3\">Was fällt dir auf?</p>"
    },
    level7: {
      description: "<h3>Level 7</h3> <br /><p class=\"line-1 anim-typewriter1\">Es ist garnicht so schwer wie es aus sieht!</p> <br />  <p class=\"line-1 anim-typewriter2\">Tipp: Du benötigst nur eine einzige For-Schleife!</p>"
    },
    level8: {
      description: "<h3>Level 8</h3> <br /><p class=\"line-1 anim-typewriter1\">Nach der vorherigen Aufgabe ist diese hier bestimmt ein Kinderspiel für dich.</p> <br /> <p class=\"line-1 anim-typewriter2\">Mach das bitte mit einer For-Schleife!</p>"
    },
    level9: {
      description: "<h3>Level 9</h3> <br /> <p class=\"line-1 anim-typewriter1\"> Du wirst immer besser und besser!</p> <p class=\"line-1 anim-typewriter2\">Du machst große Schritte!</p> <p class=\"line-1 anim-typewriter3\">Nutze nochmal die For-Schleife!</p>"
    },
    level10: {
      description: "<h3>Level 10</h3> <br /> <p class=\"line-1 anim-typewriter1\">Färb doch mal alles hier ein!</p> <p class=\"line-1 anim-typewriter2\">Nutze dafür die For-Schleife!</p>"
    },
    level11: {
      description: "<h3>Level 11</h3> <br /><p class=\"line-1 anim-typewriter1\">Das Muster sieht doch schön aus!</p> <p class=\"line-1 anim-typewriter2\">Es ist wichtig selbst recherchieren zu können!</p> <p class=\"line-1 anim-typewriter3\">Informiere dich nun selbständig über if-Abfragen!</p> <p class=\"line-1 anim-typewriter4\">Die werden dir hier helfen!</p>  <p class=\"line-1 anim-typewriter5\">Nutze auch hier nochmal die For-Schleife!</p>"
    },
    level12: {
      description: "<h3>Level 12</h3> <br /><p class=\"line-1 anim-typewriter1\">Löse dieses Level bitte mit einer For-Schleife!</p> <p class=\"line-1 anim-typewriter2\">Viel Spaß!</p>"
    },
    level13: {
      description: "<h3>Level 13</h3> <br /><p class=\"line-1 anim-typewriter1\">Löse dieses Level bitte mit einer do-while-Schleife!</p> <p class=\"line-1 anim-typewriter2\">Viel Spaß!</p>"
    },
    level14: {
      description: "<h3>Level 14</h3> <br /><p class=\"line-1 anim-typewriter1\">Bilde ein Schachbrettmuster mithilfe von For-Schleifen ab!</p> <p class=\"line-1 anim-typewriter2\">Tipp: Modulo hilft dir dabei!</p>"
    },
    level15: {
      description: "<h3>Level 15</h3> <br /><p class=\"line-1 anim-typewriter1\">Schreibe eine Funktion die dir bei der</p> <p class=\"line-1 anim-typewriter2\">Lösung der Aufgabe helfen wird!</p>"
    },
  },
  alerts: {
    continue: 'Weiter!',
    succes: {
      successTitle: 'Hervorragend!',
      successText: 'Du hast das Level gemeistert! Nun kannst du dich an an dem nächsten Level versuchen!',
      successConfirm: 'Nächstes Level!',
      successCancel: 'Zur Levelauswahl!',
      successAlertTutorial: 'successpopup.jpg',
    },
    failure: {
      failureTitle: 'Beim nächsten Mal...!',
      failureText: 'Leider hast du die Aufgabe nicht der Anforderungen entsprechend erfüllt!',
      failureTextFalseSol: 'Löse die Aufgabe mit dem folgenden: <b>',
      failureConfirm: 'Level wiederholen!',
      failureCancel: 'Zur Levelauswahl!',
    },
    missing: {
      missingTitle: 'Nichts eingetragen!',
      missingText: 'Klicke in das schwarze Code-Editor-Feld und benutze die Funktion paint(x, y), um ein Kästchen auf dem Kachelfeld einzuzeichen!',
    },
    locked: {
      title: 'Noch nicht freigeschaltet!',
      textV1: 'Schließe erst Level ',
      textV2: ' ab, um das <b>Level ',
      textV3: '</b> spielen zu können!'
    }
  },
  codeInput: {
    editor: 'Editor',
    console: 'Konsole',
    run: 'Ausführen',
    validate: 'Validieren',
    validateTip: 'Klicke auf Validieren um zu sehen ob deine Lösung richtig ist!',
    runTip: 'Klicke auf Ausführen um deinen Code zu zeichen!',
    howToDraw: 'Wie zeichne ich?',
    reset: 'Neustart',
    color: 'Farbenauswahl',
    help: 'Hilfen',
    codeToRun: '/*Geben Deinen eigenen Code ein!*/',
    errorMessages: {
      syntax: 'Da stimmt etwas mit deiner Syntax nicht!',
      type: 'Ein oder Mehrere Parameter wurden nicht übergeben oder sind vom falschen Typ:',
      reference: 'Folgender Ausdruck ist nicht definiert:',
      tooManyParameters: 'Falsche Anzahl an Parametern angegeben für die Methode paint.',
      missingPaint: 'Rufe die paint(x,y) Methode aus um Felder anzumalen!',
      falseLoop: 'Kein korrekter Aufbau einer While oder Do..While Schleife!',
      infinityError: 'Diese Schleife ist zu lang oder unendlich!',
      correct: 'Keine Fehlermeldung!',
      paramValue: 'Der/Die angegebene Parameter entsprechen nicht der Feldgröße',
    },
  },
  gameView: {
    requirement: 'Anforderung',
    requirementTipV1: 'Du musst eine ',
    requirementTipV2: ' benutzen, um das Level ',
    requirementTipV3: ' abzuschließen',
  },
  gameViewFreeMode: {
    gridSize: 'Verändere die Größe des Feldes:',
    savepng: 'Bild speichern!',
    title: 'Freier Modus',
    infotext: 'Du befindest dich im freien Modus. Hier kannst du ganz nach Belieben deine eigenen Muster zusammenstellen, Schleifen ausprobieren, Funktionen testen oder dich auf kommende Level vorbereiten. Viel Spaß!',
  },
  template: {
    coords: 'Koordinaten',
    coordsShow: 'anzeigen',
    coordsHide: 'verstecken'
  },
  navigation: {
    homepage: 'Startseite',
    lvlSelect: 'Level Auswahl',
    tutorial: 'Tutorial',
    helpHeader: 'Hilfen',
    learningGoals: 'Lernziele',
  },
  footer: {
    footerText: 'Ein Projekt aus dem Fachbereich IEM-Medieninformatik!'
  },
  lvlSelect: {
    freeMode: 'Freier Modus',
    difficulty: 'Schwierigkeit',
    start: 'Start',
    quickStart: 'Schnellstart',
    minutes: 'Minuten',
    seconds: 'Sekunden',
    bestTime: 'Bestzeit',
    lvlCompletedTitle: 'Du hast das Level bereits gemeistert!',
    lvlCompletedText: 'Spiele es gerne erneut, um deine Fähigkeiten zu verbessern!'
  },
  whyDrawIT: {
    whyDrawIT: 'Warum DrawIT?',
    whyHeader1: 'SPIELERISCHES VERTIEFEN',
    whyHeader2: 'ÜBERSICHTLICH',
    whyHeader3: 'SCHNELL NUTZBAR',
    whyText1: 'Draw IT ermöglicht dir einen spaßigen Einstieg in die Programmierwelt. Dadurch wirst du zwar gefordert, allerdings nicht überfordet. Bunte Farben und Rätsel bringen dich immer wieder ins Grübeln!',
    whyText2: 'Programmierung kann (nicht nur) für Neulinge ziemlich monoton und kompliziert aussehen. Um das einzudämmen zeigen wir dir deine Codeeingaben auf der Stelle und geben dir ggf. Tipps und Hilfestellungen.',
    whyText3: 'Draw IT ist auf einer vielzahl von Geräten nutzbar und es ist keine Installation nötig! Lediglich Internet solltest du haben.',
  },
  goals: {
    programmingSkills: 'Programmierskills',
    accuracy: 'Genauigkeit',
    analyticalThinking: 'Analytisches Denkvermögen',
    problemSolving: 'Problemlösungskompetenz',
    effectiveness: 'Effektivität',
    programmingSkillsText: 'Mit DrawIT kannst Du du Programmierungsskills in der Skriptsprache JavaScript vertiefen und Deine Programmierungskenntnisse erweitern!',
    accuracyText: 'In der Programmierung sind nicht nur Programmierskills gefragt. Als Programmierer musst Du genau zuhören und Anforderungen präzise und Gewissenhaft umsetzen können. DrawIT gibt dir Aufgaben vor, die einer präzisen Bearbeitung bedarf!',
    analyticalThinkingText: 'Mit DrawIT kannst Du Deine Fähigkeit verbessern, Probleme zu erkennen, in einzelne Teilaspekte zu untergliedern und selbstständig Lösungswege zu finden!',
    problemSolvingText: 'DrawIT hilft Dir dabei, Deine Fähigkeiten zu steigern, komplexe Problemsituationen oder Schwierigkeiten wahrzunehmen, zu verstehen und anschließend zu lösen. Der einfachste Weg muss nicht immer der geforderte oder beste sein!',
    effectivenessText: 'Durch DrawIT wird die Fähigkeit vertieft, Code-Lösungen auf einfache und effiziente Weise zu implementieren und verschiedene Lösungsansätze aufgezeigt!',
  },
  help: {
    example: 'Beispiel',
    variables: {
      var: 'Variablen',
      varTitle: 'Was sind Variablen?',
      varTextSec1: 'Eine Variable lässt sich am besten mit einem Behälter, der genau einen Wert aufnehmen kann, vergleichen. Der Behälter ist ein logischer Speicherplatz mit einem (unveränderlichen) Namen und einem Wert, der verändert werden kann.',
      varSubHeader: 'Verschiedene Arten von Variablen',
      varSubText: 'In JavaScript gibt es drei verschiedene Möglichkeiten Variablen zu deklarieren: const: Symbolische Konstante; deklariert eine unveränderliche Variable || let: deklariert eine lokale Variable im Block Scope || var: deklariert eine Variable unabhängig von ihrem Scope (Gültigkeitsbereich).',
      varExampleText: 'In der ersten Deklaration wird die Konstante PI-Deklariert. Während der Lauzeit kann diese Konstante nicht verändert, aber an beliebigen Stellen verwendet werden. Nach Deklaration einer Variable mit let oder var kann die Variable während der Lauzeit sowohl verändert werden, als auch von beliebigen Stellen genutzt werden.',
    },
    function: {
      function: 'Funktionen',
      functionTitle: 'Was sind Funktionen?',
      functionTextSec1: 'Funktionen sind ein Block von Anweisungen unter einem Namen. Der Funktionsblock wird einmal definiert, dann können die Javascript-Befehle der Funktion über den Namen mehrfach im Programm aufgerufen werden. Das Zusammenfassen von Befehlen in einer Funktion verbessert die Lesbarkeit des Scripts und verhindert Fehler.',
      functionSubHeader: 'Ablauf von Funktionen und Funktionsaufrufen',
      functionSubText: 'Eine JavaScript-Funktion wird mit dem Schlüsselwort function definiert, gefolgt von einem selbstdefinierten Namen, gefolgt von Klammern. Funktionsnamen können Buchstaben, Ziffern, Unterstriche und Dollarzeichen enthalten (dieselben Regeln wie bei Variablen). Die Klammern können durch Kommas getrennte Parameternamen enthalten:( parameter1, parameter2, ... ). Der von der Funktion auszuführende Code steht in geschweiften Klammern: {}. Der Javascript-Interpreter führt die Anweisungen im Block der Funktion erst beim Funktionsaufruf aus.',
      functionExampleText: 'Anhand der in die Funktion übergebene Parameter kann das Element ermittelt und dem jeweiligen Element die Klasse "painted" zugewiesen werden. Der Funktionsaufruf geschieht über den Namen der Funktion und passender Parameterübergabe.',
    },
    for: {
      for: 'For-Schleife',
      forTitle: 'Was sind For-Schleifen?',
      forTextSec1: 'Die for-Schleife wird verwendet, wenn eine bestimmte Anzahl an Durchläufen benötigt wird. Der Schleifenkopf fasst die Vorbereitung der ganzen Schleife, die Schleifenbedingung und die nötigen Berechnungen zur Fortsetzung der Schleife zusammen.',
      forSubHeader: 'Syntax einer for-Schleife',
      forSubText: 'Sie notieren also zunächst das Schlüsselwort for und öffnen eine runde Klammer. Es folgen drei Code-Stücke, die die Schleife steuern und durch ein Semikolon voneinander getrennt werden. Danach notieren Sie eine schließende runde Klammer und es folgen eine oder mehrere Anweisungen, die durch geschweifte Klammern zusammengefasst werden. Initialisierung: Sie geschieht als erstes, und nur ein einziges Mal. Hier können Sie beispielsweise einen Zähler auf seinen Anfangswert setzen. Schleifenbedingung: Sie wird vor jedem Schleifendurchlauf ausgewertet und muss true liefern, damit der Schleifenrumpf ausgeführt wird. Sie können hier prüfen, ob der Endwert Ihres Zählers noch nicht erreicht ist. Fortsetzung: Sie wird nach jedem Schleifendurchlauf ausgewertet. Ihr Zähler könnte hier um 1 erhöht werden. Grundsätzlich handelt es sich bei der for-Schleife um eine Form von syntaktischem Zucker, denn man könnte, von einer Kleinigkeit abgesehen, auf die wir noch eingehen, die for-Schleife genauso gut als while-Schleife aufschreiben:',
      forExampleText: 'Im Beispiel wird eine result Variable deklariert. Die for-Schleife beginnt bei 0 und läuft solange, bis der Initialwert i kleiner als 5 ist. i wird bei jedem Schleifendurchlauf um einen Punkt erhöht. In diesem Beispiel wird die Schleife also 4x ausgeführt. Wenn die Schleife den 5. Schritt ebenfalls ausführen soll, dann muss die Abbruchbedingung ein <= aufweisen.',
    },
    while: {
      while: 'While-Schleifen',
      whileTitle: 'Was sind While-Schleifen?',
      whileTextSec1: 'Die While-Schleife wertet zunächst die Schleifenbedingung aus. Ergibt sich dabei der Wert true (oder ein true-artiger Wert), wird der Schleifenrumpf ausgeführt. Danach beginnt der Ablauf von vorn. Dieser Schleifentyp eignet sich wenn Sie im Voraus nicht wissen, wie oft die Schleife zu durchlaufen ist.',
      whileSubHeader: 'Syntax einer While-Schleife',
      whileSubText: 'Eine while-Schleife beginnt mit dem Schlüsselwort while (while = solange). Dahinter folgt, in runden Klammern ( und ) stehend, die Schleifenbedingung. Um eine Bedingung zu formulieren, brauchen Sie beispielsweise Vergleichsoperatoren oder logische Operatoren. Danach folgt der Schleifenrumpf, der eine einzelne JavaScript-Anweisung sein kann oder ein Block aus mehreren Anweisungen, die in geschweifte Klammern { und } gesetzt werden.',
      whileExampleText: 'Anders als bei der for-Schleife muss die Zählvariable i hier außerhalb der Schleife angelegt werden, und innerhalb der Schleife zur Abbruchbedingung beigetragen werden. Innerhalb des Schleifen-blocks wird der gewünschte Code ausgeführt. Besonders bei einer while-Schleife muss Vorsicht geboten sein, denn die Zusammenhänge für die Abbruchbedingungen sind uneindeutiger als bei der for-Schleife, wodurch es leichter zu Endlosschleifen kommt.',
    },
    dowhile: {
      do: 'Do-While-Schleifen',
      doTitle: 'Was sind Do-While-Schleifen?',
      doTextSec1: 'Die do-while-Schleife verhält sich ähnlich wie die while-Schleife, wertet aber die Schleifenbedingung erst nach Ausführung des Schleifenrumpfes aus. Dieser Schleifentyp eignet sich dann, wenn Sie mindestens einmal durch den Schleifenrumpf durchlaufen müssen, um entscheiden zu können, ob der Rumpf wiederholt werden muss oder nicht.',
      doSubHeader: 'Syntax einer do-While-Schleife',
      doSubText: 'Eine do-while-Schleife beginnt mit dem Schlüsselwort do (do = tue etwas). Hinter dem do folgt eine einzelne Anweisung oder ein Anweisungsblock in geschweiften Klammern { und }. Darauf folgt als nächstes das Schlüsselwort while, hinter dem in runden Klammern ( und ) die Schleifenbedingung steht. Der Aufbau der do-while-Schleife ist eigentlich seltsam. Zum einen ist das do technisch gar nicht nötig, es ist eher eine Lesehilfe für Sie, damit Sie nicht unvermittelt vor dem Beginn eines Anweisungsblocks stehen. Andererseits, wenn man es schon einmal hat, könnte man auch ganz auf die geschweiften Klammern verzichten. Das geht aber wie in jeder anderen Kontrollstruktur nur, wenn der Schleifenrumpf nur aus einer einzelnen Anweisung besteht. JavaScript orientiert sich hier schlicht an seinem Vorbild, der Programmiersprache C.',
      doExampleText: 'Bei der do-while-Schleife wird die Zählvariable in der Regel ebenfalls außerhalb der Schleife deklariert. Bevor die Schleife prüft ob der Schleifendurchgang wiederholt werden muss, wird bei der do-while-Schleife jedoch der Code im do-Bereich vorher ausgeführt. Wir zählen das i also hoch und verrechnen dieses mit unserem Ergebnis. Im Anschluss überprüfen wir, ob i < 5 ist. Solange i also kleiner als 5 ist, wird der bereich in do-Block weiter ausgeführt.',  
    },
  }
}