<template>
  <v-app class="bg-color ">
    <v-main>
      <img id="mouse-cursor" src="./assets/mouse-cursor.png">
      <SideBar/>
      <router-view></router-view> 
      <FooterComponent />
    </v-main>
  </v-app>
</template>
<script>
import SideBar from "./components/Navigation.vue";
import FooterComponent from "./components/Footer.vue";
export default {
  name: "App",
  components: {
    SideBar,
    FooterComponent
  },
  data: () => ({
  
  }),
  methods: {

  },
  mounted(){}
};
</script>
<style>

.bg-color {
  background-color: rgb(236, 236, 236) !important;
}

#mouse-cursor {
  position: absolute;
  height: 3vh;
  width: 3vh;
  visibility: visible;
}

</style>