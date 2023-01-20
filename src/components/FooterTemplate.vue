<template>
    <v-footer app height="40" padless color="rgb(74, 92, 102)">
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
  name: "footertemplate"
}
</script>

<style scoped>

.footerText{
   color: white;
   font-size: 0.8em;
}
</style>