<template>
  <v-app>
    <v-main>
      <SideBar />
      <div> <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="6"
          md="8"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
          <GameGrid :codeToRun = "myFunction"/> 
          </v-card>
        </v-col>
        <v-col
          cols="6"
          md="4"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
           <CodeInput @RunCode="wieAuchImmer"/>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
      

      </div>
     
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "./components/Navigation.vue"
import CodeInput from "./components/CodeInput.vue"
import GameGrid from './components/GameGrid.vue'

export default {
  name: 'App',

  components: {
    SideBar,
    GameGrid,
    CodeInput
  
  },

  data: () => ({
    myFunction: null,
  }),
  methods:{
    wieAuchImmer(item){
      this.myFunction = item;
      console.log(this.myFunction)
    }
  }
}
</script>
