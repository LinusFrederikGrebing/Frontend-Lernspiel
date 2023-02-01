<template>
  <v-footer app height="40" padless color="rgb(74, 92, 102)">
    <v-col class="text-center footerText" cols="12">
      {{ new Date().getFullYear() }} — {{ $t("footer.footerText") }}
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "footertemplate",
};
</script>

<style scoped>
/* CSS only for Footer-Template */
</style>