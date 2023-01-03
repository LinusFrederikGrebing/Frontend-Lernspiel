<template>
  <div>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="text-h5 green"> Level completed </v-card-title>
          <v-card-text>
            Du hast das Level gemeistert! Nun kannst du dich an einem
            schwierigerem Level versuchen!
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="
                dialog = false;
                nextLevel(currentLevelId);
              "
            >
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
            <v-btn
              color="primary"
              text
              @click="
                dialogFalse = false;
                setSelectedLevel(currentLevel);
              "
            >
              Go back
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="
                dialogFalse = false;
                levelSelect = true;
              "
            >
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
          <TemplateGrid :currentLevel="currentLevel" />
          <CodeInput
            @success="
              dialog = true;
              currentLevel.completed = true;
            "
            @failure="dialogFalse = true"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CodeInput from "../components/CodeInput.vue";
import GameGrid from "../components/GameGrid.vue";
import TemplateGrid from "../components/TemplateGrid.vue";
import levels from "../../data/levels.json";
export default {
  name: "GameView",
  components: {
    GameGrid,
    CodeInput,
    TemplateGrid,
  },

  data: () => ({
    error: null,
    dialog: false,
    dialogFalse: false,
    levels: [],
    currentLevel: null,
    currentLevelId: null,
    hilfenTemp: false,
    accessibleLevels: [],
  }),
  methods: {
    nextLevel(indexNextLevel) {
      this.levels[indexNextLevel - 1].completed = true;
      this.currentLevel = this.levels[indexNextLevel];
      this.currentLevelId = this.currentLevel.id;
      localStorage.setItem("levels", JSON.stringify(this.levels));
    },
  },
  mounted() {
    if (localStorage.getItem("levels") !== null) {
      this.levels = JSON.parse(localStorage.getItem("levels"));
    } else {
      this.levels = Object.values(Object.values(levels)[0]);
    }

    this.currentLevel = this.$route.params.level;
    this.currentLevelId = this.currentLevel.id;
  },

  watch: {
    currentLevel(newVal, oldVal) {
      let newValIndex = this.accessibleLevels.findIndex((level) => {
        return newVal.id === level.id;
      });
      let oldValIndex = this.accessibleLevels.findIndex((level) => {
        return oldVal.id === level.id;
      });
      if (oldVal !== null && oldVal !== undefined) {
        if (JSON.parse(localStorage.getItem("accessibleLevels")) !== null) {
          this.accessibleLevels = JSON.parse(
            localStorage.getItem("accessibleLevels")
          );
        }
        if (oldValIndex === -1) {
          this.accessibleLevels.push(oldVal);
        } else if (oldValIndex !== -1) {
          this.accessibleLevels[oldValIndex].completed = true;
        }
        if (newValIndex === -1) {
          this.accessibleLevels.push(newVal);
        }
      }
    },
    accessibleLevels() {
      console.log(this.accessibleLevels);
      localStorage.setItem(
        "accessibleLevels",
        JSON.stringify(this.accessibleLevels)
      );
    },
  },
};
</script>

<style></style>
