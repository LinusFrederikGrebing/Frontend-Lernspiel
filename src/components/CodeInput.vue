<template>
  <div class="d-f">
    <v-text-field v-model="codeToRun"></v-text-field>
    <v-btn @click = "runfunction()">Run</v-btn>
  </div>
</template>

<script>
export default {
    name: 'GameGrid',

    data: () => ({
        gridShit: [],
        codeToRun: null,
    }),
    methods:{
        runfunction(){
            this.$emit('RunCode', this.codeToRun )
        }

        
    }
}
</script>

<style>

</style>