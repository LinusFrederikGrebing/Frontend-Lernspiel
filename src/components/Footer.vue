<template>
    <v-footer app class="footer" padless color="rgb(74, 92, 102)">
      <v-col
        class="text-center footerText"
        cols="12"
      >
        {{ new Date().getFullYear() }} —  Ein Projekt aus dem Fachbereich IEM-Medieninformatik! 
      </v-col>
    </v-footer>
</template>

<script>
export default {
  name: "footer"
}
</script>

<style scoped>

.footerText{
   color: white;
   font-size: 0.8em;
}
.footer{
  height: 2.5em;
 
}
</style>