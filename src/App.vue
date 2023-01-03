<template>
  <v-app class="bg-color1">
    <v-main>
      <SideBar :currentLevelId="currentLevelId" @lvlSelection="levelSelect=true; hilfenTemp=false" @hilfen="hilfenTemp=true; levelSelect=false"/>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
import SideBar from "./components/Navigation.vue";
import levels from "../data/levels.json"

export default {
  name: "App",

  components: {
    SideBar,
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
    hilfenTemp: false,
  }),
  methods: {
    wieAuchImmer(item) {
      this.myFunction = item;
    },
    logError(error) {
      this.error = error;
    },
  },
  mounted(){
    if (localStorage.getItem("levels") !== null) {
      this.levels = JSON.parse(localStorage.getItem("levels"));
    } else {
      this.levels = Object.values(Object.values(levels)[0]);
    }
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