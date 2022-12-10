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
  data: () => ({
    gridShit: [],
    editorActive: true,
    errorMessage: "Keine Fehlermeldung!",
    consoleActive: false,
    codeToRun: "/*Type your own code!*/",
  }),
  methods: {
    runfunction() {
      this.$emit("RunCode", this.codeToRun);
    },
    checkIfCodeFilled(){
      if(this.codeToRun === "/*Type your own code!*/"){
        this.codeToRun = '';
      }
    }
  },
  watch:{
    error(){
      this.errorMessage = this.error;
    }
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
