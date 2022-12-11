<template>
  <v-app class="bg-color">
    <v-main>
      <SideBar />
      <div>
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
                <v-btn color="primary" text @click="dialog = false; ">
                  Next level
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <v-container class="grey lighten-5">
          <v-row no-gutters>
            <v-col cols="12" sm="6" md="8">
              <GameGrid
                :codeToRun="myFunction"
                @error="logError"
                @success="dialog = true"
              />
            </v-col>
            <v-col cols="6" md="4">
              <TemplateGrid />
              <CodeInput @RunCode="wieAuchImmer" :error="error" />
              <VueTypedJs :strings="['First text', 'Second Text']">
                <h1 class="typing"></h1>
              </VueTypedJs>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "./components/Navigation.vue";
import CodeInput from "./components/CodeInput.vue";
import GameGrid from "./components/GameGrid.vue";
import TemplateGrid from "./components/TemplateGrid.vue";

export default {
  name: "App",

  components: {
    SideBar,
    GameGrid,
    CodeInput,
    TemplateGrid,
  },

  data: () => ({
    myFunction: null,
    error: null,
    dialog: false,
  }),
  methods: {
    wieAuchImmer(item) {
      this.myFunction = item;
    },
    logError(error) {
      this.error = error;
    },
  },
};
</script>
<style>
.bg-color {
  background-color: rgba(237, 237, 237, 1);
}
</style>
