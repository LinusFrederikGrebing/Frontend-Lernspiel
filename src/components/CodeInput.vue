<template>
  <div div class="d-f">
    <v-btn color="accent" depressed elevation="1" outlined>Editor</v-btn>
    <v-btn color="accent" depressed elevation="1" outlined>Console</v-btn>
    
    <CodeEditor height="30vh" ></CodeEditor>

    <div>
      <v-btn color="warning" depressed elevation="2" outlined> Validate </v-btn>
      <v-btn color="success" depressed elevation="2" outlined> Finished </v-btn>
    </div>
  </div>
</template>

<script>
import CodeEditor from 'simple-code-editor';
export default {
name: "GameGrid",
 components: {
    CodeEditor
 },
  

  data: () => ({
    gridShit: [],
    codeToRun: null,
  }),
  methods: {
    runfunction() {
      this.$emit("RunCode", this.codeToRun);
    },
  },
};
</script>

<style>
</style>
