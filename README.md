# DrawIT - Ein Projekt von: Max But (5325887), Anastasios Kistoglidis (5205868) & Linus Grebing (5323724)

## Project setup
Unsere Applikation läuft über das Frontend Framework Vue.js. Die verwendete Vue-Version ist: Vue 2.6.10. Eine Installationsanleitung finden Sie unter: https://cli.vuejs.org/guide/installation.html.
Desweiteren benutzen wir Vuetify.js als Matierial-Design-Framework basierend auf Vue.js.
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Pull submodule content
```
git submodule update --init
```

## Wie kann das Projekt ohne Vue geöffnet werden?

Navigieren Sie hierfür zu unserem Dist-Repository: https://git.thm.de/akgl69/fd-team-6-dist
Durch ein öffnen der index.html (bei uns mit dem vscode Extension: LiveServer), kann eine vorgebuildete Version unserer Anwendung geöffnet werden.

## Hinweise zu Besonderheiten von Vue.js
Vue ist ein Komponentenbasiertes Framework und verwendet ein Template-System, dass es ermöglicht HTML-basierte Benutzeroberflächen mit Daten aus JavaScript-Objekten zu rendern.

- Komponenten-basierte Architektur: Jede Komponente hat eine eigene Logik, eigene Daten und ein eigenes Template.
    -> Komponenten sollen insich möglichst unabhängig funktionieren können. Der Datenaustausch läuft über Properties. 
- Jede Komponente besteht aus einem HTML-Template Bereich, einem Script-Teil, der aus verschiedenen Zuständen bestehen kann und einem CSS-Teil. 
    -> Der scope des CSS- sowie Script-Bereiches befindet sich nur innerhalb der Komponente.  
    -> Durch vue und vuetify kann auf einige vordefinierte stylings zugegriffen werden. Beispiele hierfür sind (d-flex, ml-8, etc.). Unter Anderem gibt es HTML-inline Attribute wie "depressed" oder "elevation", die ohne extra Klasse verwendet werden.  
    -> Wenn Stylings von vue-Komponenten überschrieben werden soll, muss hinter das custom-CSS-Attribut ein "!important" geschrieben werden.
    -> Im style-Tag der Komponenten befindet sich das Keyword scoped. CSS-Eigenschaften werden wie oben beschrieben nur für die aktuelle Komponente angepasst.   
    -> In jedem Java-Script Bereich befinden sich verschiedene Abteile. (Folgend häufig von uns benutzt:)
        -> components: Bereich, in dem weitere Komponenten eigebunden werden
        -> Props: Dynamische Daten zum Datenaustausch verschiednener Komponenten
        -> Data: Bereich für Methodenübergreifende Variablen
        -> Methods: Bereich für Funktionen
        -> Mounted: Bereich, der beim Laden der Komponente ausgeführt wird
        -> Watch: Bereich, um bestimmte Eigenschaften zu Beobachten, und bei Änderung zu reagieren.
        -> Computed: Bereich, in dem berechnete Eigenschaften für die Komponente definiert werden können.
    -> Vue erlaubt dynamische Veränderungen von Attributen. Diese werden durch ein : vor dem Attributnamen gekennzeichnet (Beispiel :src="x"). Außerdem stellt Vue einige Direktive bereit, die bestimmte Verhaltensweisen definieren (Beispiel: v-if, v-for, v-bind).
    -> Vuetify stellt vordefinierte Breakpoints bereit. Ab wann auf welche Größe umgestellt wird, finden Sie in der folgenden Dokumntation: https://vuetifyjs.com/en/features/breakpoints/
- Zur besseren wartbarkeit haben wir einige Komponentenunabhängige Scrolltrigger-Animationen ausgelagert.        
- Die gemeinsame CSS-Datei finden Sie im Hauptverzeichnis unter main.css
- Alles an Bildern sind in src unter assets abgelegt
- Die Komponenten sind unter src in dem components-Ordner zu finden. Die Komponenten werden im Ordner views von den Hauptseiten verwendet. 
- Im Hauptverzeichnis findet sich der Ordner Data. Hier finden Sie die verwaltende Levels-Datei, sowie die Sprachfiles für Deutsch und Englisch. Eingebunden werden die Files in main.js
    -> die Texte werden durch: $t("identifierString.string") anhand der in Locals gespeicherten Sprache ausgelesen


