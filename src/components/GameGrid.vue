<template>
  <div>
    <v-container class="container">
      <v-row no-gutters v-for="y in 10" :key="y">
        <v-col no-gutters v-for="x in 10" :key="x"
          ><transition appear @before-enter="beforeEnter" @enter="enter">
            <v-card elevation="4" :id="'x' + (x - 1) + 'y' + (y - 1)"></v-card>
          </transition>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import gsap from "gsap";

export default {
  name: "GameGrid",
  props: {
    codeToRun: String,
  },
  data: () => {
    return {
      errorMessage: null,
      levelElements: [],
      paintedElements: [],
    };
  },
  watch: {
    codeToRun() {
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
    errorMessage() {
      this.$emit("error", this.errorMessage);
    },
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = "0";
      el.style.transform = "translateX(-100px)";
    },
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
    enter(el) {
      gsap.fromTo(
        el,
        {
          scale: 0.1,
          y: 0,
        },
        {
          duration: 5.5,
          scale: 1,
          y: 40,
          x: 0,
          opacity: 1,
          ease: "bounce.out",
        }
      );
    },
  },
  mounted() {},
};
</script>
<style scoped>
.v-card {
  width: 4vw;
  height: 4vw;
}
.painted {
  background-color: rgba(128, 186, 36, 1);
}
.v-col {
  flex-basis: 0;
  flex-grow: 0;
  /* max-width: 100%; */
}

.container {
  margin: auto;
}
</style>
