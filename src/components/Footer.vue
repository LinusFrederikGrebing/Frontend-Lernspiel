<template>
    <v-footer padless  height="100em" color="rgb(74, 92, 102)">
      <v-col
        class="text-center footer"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong> Ein Projekt aus Fachbereich IEM-Medieninformatik! </strong>
      </v-col>
    </v-footer>
</template>

<script>
export default {
  name: "footer"
}
</script>

<style scoped>
.footer{
    color: white;
}
</style>