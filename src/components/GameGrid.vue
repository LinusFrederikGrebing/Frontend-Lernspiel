<template>
  <div>
    <v-container> 
    <v-row no-gutters>
        <v-col
          cols="12"
          sm="6"
          md="6"
        >        
        <v-text-field class="pr-4" label="x" v-model="gridX"></v-text-field>
        </v-col>
        <v-col cols="6" md="6">
          <v-text-field label="y"></v-text-field>
        </v-col>
      </v-row> 
  </v-container>
  <v-container>
      <v-row no-gutters v-for="y in 10" :key="y">
        <template v-for="x in 10" :key="x">
          <v-col >
            <v-card :id= "'x'+x+'y'+y">
              {{( x+ "," +y)}}
            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </div>
  
</template>

<script>
export default {
  name: 'GameGrid',
  props:{
    codeToRun: String
  },
  data: () => ({
    gridShit: [],
    gridX: 6,
    gridY:6,
  }),
  methods: {
    paint() {
      console.log("test")
      console.log(this.codeToRun)
      this.gridShit.forEach((point)=>{
        console.log(point);

        let fId = (point.id);
        let sId = (point.id % 10);
        for(let i = 2; i<=4; i++){
        for(let j = 2; j<4; j++){

          console.log(fId, sId)
          if(fId === i && sId ===j){
            point.painted = true;
          }
        }
      }
    })
  },
  getShit(shit){
    console.log(shit)
  },
  setShit(){
    this.gridShit = [];
    for(let x=0; x<6; x++){
      for(let y=0; y<6; y++){
        let  myPoint = {
        x: x,
        y: y,
        painted: false 
      };
      this.gridShit.push(myPoint);
    }
    }
  }
 },

 watch:{
  codeToRun(){
    this.paint()
  },
  gridX(newVal, oldVal){
    this.setShit()
    console.log("oldVal"+oldVal)
    console.log("newVal"+newVal)
  }
 },
 mounted(){
  this.setShit()
  }
}
</script>
<style scoped>
.redCard{
  background-color: red;
}
#x1y1{
  background-color: red;
}
</style>
