<template>
  <v-app class="bg-color">
    <v-main>
      <SideBar />
      <router-view></router-view>
      <FooterComponent />
    </v-main>
  </v-app>
</template>
<script>
import SideBar from "./components/Navigation.vue";
import FooterComponent from "./components/FooterTemplate.vue";

export default {
  name: "App",
  components: {
    SideBar,
    FooterComponent,
  },
  data: () => ({}),
  methods: {},
  mounted() {},
};
</script>
<style scoped>
.bg-color {
  background-image: url("../src/assets/Hexagon3.svg"); 
}
</style>