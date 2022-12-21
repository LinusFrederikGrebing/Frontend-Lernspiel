<template>
  <div>
    <v-carousel class="my-6 my-auto" height="550"  hide-delimiter-background show-arrows-on-hover>
      <template v-slot:prev="{ on, attrs }">
        <v-btn color="success" height="50" v-bind="attrs" v-on="on">   
          <v-icon>
           mdi-chevron-left
          </v-icon> 
        </v-btn>
      </template>
      <template v-slot:next="{ on, attrs }">
        <v-btn color="success" height="50" v-bind="attrs" v-on="on"> 
          <v-icon>
           mdi-chevron-right
          </v-icon> 
        </v-btn>
      </template>
      <template v-for="(item, index) in levels">
        <v-carousel-item class="my-10" v-if="(index + 1) % columns === 1 || columns === 1" :key="index">
          <v-row class="flex-nowrap" style="height:95%">
            <template class="flex-nowrap" v-for="(n, i) in columns">
              <template v-if="(index + i) < levels.length">
                <v-col  :key="i">
                  <v-sheet  v-if="(index + i) < levels.length" height="95%">
                    <v-row class="fill-height" align="center" justify="center">
                      <v-card  elevation="12" height="25em" width="30em "
                      :class="accessibleLevels.includes(levels[index + i]) ? 'mx-auto my-8' : 'locked mx-auto my-8'"
                      >
                       
                        <v-img class="white--text align-end" height="18em"
                          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"> 
                          <v-icon v-if="!accessibleLevels.includes(levels[index + i])" class="zentriert">mdi-lock</v-icon>
                          <v-card-title>Level {{ levels[index + i].id }} </v-card-title>
                        </v-img>

                        <v-card-subtitle class="pb-0">
                          Information zum Level vielleicht?
                        </v-card-subtitle>

                        <v-card-actions>
                          <v-btn  @click="setLevel(levels[index + i])" color="orange" text>
                            Start
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-row>
                  </v-sheet>
                </v-col>
              </template>
            </template>
          </v-row>
        </v-carousel-item>
      </template>
    </v-carousel>
  </div>
</template>

<script>
export default {
  name: "LevelSelect",
  props: { levels: Array },
  data: () => ({
    accessibleLevels: [],
  }),
  methods: {
    paint(first, second) {
      let element = document.getElementById("vx" + first + "vy" + second);
      element.classList.add("painted");
    },
    resetPaintedFields() {
      Array.from(document.querySelectorAll(".painted")).forEach((el) => {
        if (!el.id.includes("v")) {
          el.classList.remove("painted");
        }
      });
    },
    setLevel(level) {
      if (this.accessibleLevels.includes(level)) {
        this.$emit('setLevel', level)
      }
      console.log(level.completed)

    }
  },
  mounted() {
    this.accessibleLevels.push(this.levels[0]);
    this.levels.forEach((level) => {
      if (level.completed === true) {
        this.accessibleLevels.push(
          this.levels[
          this.levels.findIndex((nextLvl) => nextLvl.id === level.id) + 1
          ]
        );
      }
    });
    console.log(this.levels);
  },
  computed: {
    columns() {
       if (this.$vuetify.breakpoint.lgAndUp) {
        return 3;
      }

      if (this.$vuetify.breakpoint.md) {
        return 2;
      }

      return 1;
    }
  },
};
</script>
<style>

.locked{
  opacity: 0.5;
  
}
.zentriert{
  position: absolute;
  margin: 5em;
  width: 10em;
  top: 2em;
  opacity: 1 !important;
  scale: 10;
}
.row.fill-height.align-center.justify-center {
  background-color: rgb(236, 236, 236) !important;
}
   .v-carousel__controls__item{
      color:  rgba(128, 186, 36, 1) !important;
      opacity: 1 !important;
   }
</style>
