<template>
  <div div class="d-f">
    <v-btn color="accent" depressed elevation="1" outlined @click="editorActive=true; consoleActive=false">Editor</v-btn>
    <v-btn color="accent" depressed elevation="1" outlined @click="editorActive=false; consoleActive=true">Console</v-btn>
    
    <CodeEditor v-if="editorActive" height="30vh" width="25vw" v-model="codeToRun" @click="checkIfCodeFilled"></CodeEditor>
   
    <v-textarea v-if="consoleActive" v-model="errorMessage" :class="errorMessage === 'Keine Fehlermeldung!' ? 'consoleArea greenText' : 'consoleArea redText'"></v-textarea>
    <div> 
      <v-btn color="warning" depressed elevation="2" outlined> Validate </v-btn>
      <v-btn color="success" depressed elevation="2" outlined @click="runfunction"> Finished </v-btn>
    </div>
  </div>
</template>

<script>
import CodeEditor from 'simple-code-editor';
export default {
name: "GameGrid",
props: {error: String},
 components: {
    CodeEditor
 },
 data: () => {
    return {
      levelElements: [],
      paintedElements: [],
      editorActive: true,
      errorMessage: "Keine Fehlermeldung!",
      consoleActive: false,
      codeToRun: "/*Type your own code!*/",
    };
  },

  methods: {
    paint(first, second) {
      let element = document.getElementById("x" + first + "y" + second);
      element.classList.add("painted");
    },
    checkResult() {
      let allElements = document.getElementsByClassName("painted");
      for (let i = 0; i < allElements.length; i++) {
        if (allElements[i].id.includes("v")) {
          this.levelElements.push(allElements[i].id.replace(/\D/g, ""));
        } else {
          this.paintedElements.push(allElements[i].id.replace(/\D/g, ""));
        }
      }
      if (this.areEqual(this.levelElements, this.paintedElements)) {
       this.$emit('success');
      }
    },
    areEqual(array1, array2) {
      if (array1.length === array2.length) {
        return array1.every((element, index) => {
          if (element === array2[index]) {
            return true;
          }
          return false;
        });
      }
    },
    runfunction() {
      try {
        eval(this.codeToRun);
        this.errorMessage = "Keine Fehlermeldung!";
        this.checkResult();
      } catch {
        const first = this.codeToRun.match(/\d+/g)?.[0];
        const second = this.codeToRun.match(/\d+/g)?.[1];
        if (!second || !first) {
          this.errorMessage = "Es wurde keine zwei Koordinaten gefunden";
        }
      }
    },
    checkIfCodeFilled(){
      if(this.codeToRun === "/*Type your own code!*/"){
        this.codeToRun = '';
      }
    }
  },

  watch:{
   
  }
};
</script>

<style scoped>
.consoleArea{
  background-color: white;
}

.greenText{
  color: rgba(128,186,36, 1);
}
.redText{
  color: red;
}
</style>
