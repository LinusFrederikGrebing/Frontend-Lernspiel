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
        </div>
        <v-container class="bg-color1">
          <v-row no-gutters>
            <v-col cols="12" sm="6" md="8">
              <GameGrid />
            </v-col>
            <v-col cols="6" md="4">
              <TemplateGrid :currentLevel="currentLevel"/>
              <CodeInput @success="dialog = true; currentLevel.completed = true;"/>
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

export default {
  name: "App",

  components: {
    SideBar,
    GameGrid,
    CodeInput,
    TemplateGrid,
    LevelSelection
  },

  data: () => ({
    myFunction: null,
    error: null,
    dialog: false,
    levels: [],
    currentLevel: null,
    currentLevelId: null,
    levelSelect:false,
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
      this.currenLevel=level;
      this.currentLevelId = level.id;
    }
  },
  watch:{
    currentLevel(oldVal, newVal){
      console.log(oldVal, newVal)
    }
  },
  mounted(){
    this.levels = Object.values(Object.values(levels)[0]);
    this.currentLevel = this.levels[0];
    this.currentLevelId = this.currentLevel.id;
    console.log(this.$vuetify.breakpoint)
  }
};
</script>
<style>

.bg-color1 {
  background-color: rgba(179, 179, 179, 0.397) !important;
}
</style>
