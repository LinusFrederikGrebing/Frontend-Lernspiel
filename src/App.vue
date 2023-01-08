<template>
  <v-app class="bg-color1">
    <v-main>
      <SideBar/>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
import SideBar from "./components/Navigation.vue";
export default {
  name: "App",
  components: {
    SideBar,
  },
  data: () => ({
  
  }),
  methods: {

  },
  mounted(){}
};
</script>
<style>
.bg-color1 {
  background-color: rgb(236, 236, 236) !important;
}
</style>