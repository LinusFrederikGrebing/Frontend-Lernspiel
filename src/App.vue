<template>
  <v-app class="bg-color1">
    <v-main>
      <SideBar :currentLevelId="currentLevelId" @lvlSelection="levelSelect=true"/>
      <div v-if="!levelSelect">
        <div class="text-center">
          <v-dialog v-model="dialog" width="500">
            <v-card>
              <v-card-title class="text-h5 green">
                Level completed
              </v-card-title>

              <v-card-text>
                Du hast das Level gemeistert! Nun kannst du dich an einem
                schwierigerem Level versuchen!
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false; nextLevel(currentLevelId)">
                  Next level
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogFalse" width="500">
            <v-card>
              <v-card-title class="text-h5 red">
                Your answer is wrong.
              </v-card-title>

              <v-card-text>
                Deine Antwort entspricht leider nicht dem erwünschten Ergebnis.
                Versuche es nochmal oder probier ein anderes Level.
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialogFalse = false; setSelectedLevel(currentLevel)">
                  Go back
                </v-btn>
                <v-btn color="primary" text @click="dialogFalse = false; levelSelect = true;">
                  Level Selection
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <v-container class="bg-color1">
          <v-row no-gutters>
            <v-col cols="12" sm="6" md="8">
              <GameGrid />
            </v-col>
            <v-col cols="6" md="4">
              <TemplateGrid :currentLevel="currentLevel"/>
              <CodeInput @success="dialog = true; currentLevel.completed = true;" @failure="dialogFalse = true;"/>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <LevelSelection v-else :levels="levels" @setLevel="setSelectedLevel" />
    </v-main>
  </v-app>
</template>
<script>
import SideBar from "./components/Navigation.vue";
import CodeInput from "./components/CodeInput.vue";
import GameGrid from "./components/GameGrid.vue";
import TemplateGrid from "./components/TemplateGrid.vue";
import levels from "../data/levels.json"
import LevelSelection from "./components/LevelSelect.vue";
import Help from "./components/HelpTemplate.vue";

export default {
  name: "App",

  components: {
    SideBar,
    GameGrid,
    CodeInput,
    TemplateGrid,
    LevelSelection,
    Help
  },

  data: () => ({
    myFunction: null,
    error: null,
    dialog: false,
    dialogFalse: false,
    levels: [],
    currentLevel: null,
    currentLevelId: null,
    levelSelect: false,
  }),
  methods: {
    wieAuchImmer(item) {
      this.myFunction = item;
    },
    logError(error) {
      this.error = error;
    },
    nextLevel(indexNextLevel){
      this.currentLevel = this.levels[indexNextLevel];
      this.currentLevelId = this.currentLevel.id;
    },
    setSelectedLevel(level){
      this.levelSelect=false;
      this.currentLevel=level;
      this.currentLevelId = level.id;
      console.log(this.currentLevel)
    }
  },
  mounted(){
    this.levels = Object.values(Object.values(levels)[0]);
    this.currentLevel = this.levels[0];
    this.currentLevelId = this.currentLevel.id;
  }
};
</script>
<style>
.bg-color1 {
  background-color: rgb(236, 236, 236) !important;
}
</style>
