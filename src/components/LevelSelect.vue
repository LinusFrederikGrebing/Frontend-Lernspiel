<template>
    <div>
            
        <v-container fluid>
      <v-row justify="space-around">
        <v-col cols="5">
          <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.7" @click="this.$emit('closeLevelSelect')"></v-img>
        </v-col>
      </v-row>
    </v-container>
                            
       
    </div>
  </template>
  
  <script>
  export default {
    name: "LevelSelect",

    methods: {
      paint(first, second) {
        let element = document.getElementById("vx" + first + "vy" + second);
        element.classList.add("painted");
      },
      resetPaintedFields(){
        Array.from(document.querySelectorAll('.painted')).forEach((el) => {
          if(!el.id.includes("v")){
            el.classList.remove('painted');
          }
        }) 
      },
    },
    watch: {
      
    },
  };
  </script>
  <style scoped>
  </style>
  