<template>
  <v-container>
    <div class="background-image"></div>
    <v-row>
      <v-col class="text-center my-8">
        <v-card
            elevation="24"
            outlined
            shaped
          >
        <h2 style="background: white; border-radius: 15px;" class="text-h2 text-md-h1 text-center my-4">
          Warum Draw IT?
        </h2>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
          v-for="(item, index) in items"
          :key="index"
          cols="12"
          md="4"
          class="text-center"
      >
        <v-card
            style="height: 25em"
            elevation="24"
            outlined
            shaped
        >
          <v-avatar size="100" class="ma-8">
            <v-img :src="item.link"></v-img>
          </v-avatar>
          <div class="title text-uppercase ma-4" v-text="item.title"></div>
          <p v-text="item.text" class="text-body-1 text-md-body-2 mx-6"></p>
        </v-card>
        <v-row no-gutters></v-row>
      </v-col>
    </v-row>
    <v-row no-gutters>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "OnePagerLearningGoals",
  data() {
    return {
      items: [
        {
          title: 'Spielerisches Lernen',
          text:
              'Draw IT ermöglicht dir einen spaßigen Einstieg in die Programmierwelt. Dadurch wirst du zwar gefordert, allerdings nicht überfordet. Bunte Farben und Rätsel bringen dich immer wieder ins Grübeln!',
          link: require("../assets/dice_httpswww.pngwing.comenfree-png-pvivu.png"),
        },
        {
          title: 'Übersichtlich',
          text:
              'Programmierung kann (nicht nur) für Neulinge ziemlich monoton und kompliziert aussehen. Um das einzudämmen zeigen wir dir deine Codeeingaben auf der Stelle und geben dir ggf. Tipps und Hilfestellungen.',
          link: require("../assets/nochaos_www.pngwing.comdefree-png-neyfo.png"),
        },
        {
          title: 'Schnell nutzbar',
          text:
              'Draw IT ist auf einer vielzahl von Geräten nutzbar und es ist keine Installation nötig! Lediglich Internet solltest du haben.',
          link: require("../assets/play-button-svgrepo-com (1).svg"),
        },
      ],
    }
  }
}
</script>

<style scoped>


.background-image {
  position: absolute;
  left: -100px;
  background-repeat: no-repeat;
  z-index: 0;
  display: block;
  /*background-image: url("../assets/");*/
  width: 1900px;
  height: 1100px;
  filter: blur(5px);
}

h2, p, *{
  color: #49403c;
  position: relative;
  z-index: 1;
}
</style>