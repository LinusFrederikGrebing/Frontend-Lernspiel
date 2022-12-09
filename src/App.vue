<template>
  <v-app class="bg-color">
    <v-main>
      <SideBar />
      <div>
        <v-container class="grey lighten-5">
          <v-row no-gutters>
            <v-col cols="12" sm="6" md="8">
              <GameGrid :codeToRun="myFunction" />
            </v-col>
            <v-col cols="6" md="4">
              <TemplateGrid />
              <CodeInput @RunCode="wieAuchImmer" />
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
  }),
  methods: {
    wieAuchImmer(item) {
      this.myFunction = item;
      console.log(this.myFunction);
    },
  },
};
</script>
<style>
.bg-color{
  background-color: rgba(237,237,237, 1);
}
</style>