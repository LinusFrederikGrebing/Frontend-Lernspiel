<template>
  <v-container>
    <v-card
      elevation="24"
      outlined
      shaped
      width="120em"
      height="5em"
      class="header">
       <h1 class="h1 font-weight-black"> - Tutorial - </h1>
    </v-card>
    <div class="d-flex justify-center tutorial">
    <div class="container2">
          <v-row no-gutters v-for="y in 2" :key="y">
                <v-col no-gutters v-for="x in 2" :key="x">
                  <transition>
                    <v-card class="" elevation="18" :id="'xTutorial' + (x - 1) + 'yTutorial' + (y - 1)"></v-card>
                  </transition>
                </v-col>
          </v-row>
    </div>
    <div class="editor">
    <CodeEditor
       :read_only="true"
        font_size="37px"
        height="440px"
        width="805px"
        v-model="actualCodeToRun"
      >
      </CodeEditor>
        <v-btn color="warning" depressed elevation="2">
          Validate
        </v-btn>
        <v-btn
          color="success"
          depressed
          elevation="2"
        >
          Finished
        </v-btn>
    </div>
  </div>
  </v-container>
</template>

<script>
import CodeEditor from "simple-code-editor";

export default {
  name: "OnePagerTutorialSection",
  components: {
    CodeEditor,
  },
  data: () => {
    return {
      codeToRun: "paint(1,1);",
      actualCodeToRun: ""
    };
  },
  methods: {
    delay(time) {
     return new Promise(resolve => setTimeout(resolve, time));
    },
    tutorialAnimation(){
        let steps = 250;
          for(let i = 0; i<=this.codeToRun.length; i++){
            this.delay(steps).then(() =>  this.actualCodeToRun = this.codeToRun.substring(0, i));
            steps=steps+500;
          };
          this.delay(6500).then(() => this.paintTutorialField(1,1));
          this.delay(10000).then(() => this.actualCodeToRun="" );
          this.delay(10000).then(() => this.resetPaintedFields());
          this.delay(10000).then(() => this.tutorialAnimation());
          
    },
    paintTutorialField(first, second) {
      let element = document.getElementById("xTutorial" + first + "yTutorial" + second);
      element.style.backgroundColor = '#80ba24';
      element.classList.add("painted");
    },
    resetPaintedFields() {
      Array.from(document.querySelectorAll(".painted")).forEach((el) => {
        if (el.id.includes("Tutorial")) {
          el.classList.remove("painted");
          el.style.backgroundColor = '#ffffff';
        }
      });
    },
  },
  mounted() { 
  this.tutorialAnimation()
  
  }
}
</script>

<style scoped>
.header {
  margin-top: 10em;
}
.tutorial {
  margin-top: 5em;
  margin-bottom: 10em;
}
.container{
  height: 100% !important;
}
.editor{
  margin-left: 4em;
}
.col {
  flex-basis: 0.1 !important;
  flex-grow: 0 !important;
  /* max-width: 100%; */
}

.container2 {
  margin-left: 3em;
  display: flex;
  flex-direction: column;
}
.v-card {
  width: 15em;
  height: 15em;
}

</style>