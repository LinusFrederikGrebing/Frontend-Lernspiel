<template>
  <v-app class="bg-color ">
    <v-main>
      <SideBar/>
      <router-view></router-view> 
      {{ $vuetify.breakpoint.name }}
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
<style scoped>

.bg-color {
  background-color: rgb(236, 236, 236) !important;
}
@media only screen and (min-device-width: 1900px) {
  .containerpadding{
      padding-bottom: 10em;
  }
}


</style>