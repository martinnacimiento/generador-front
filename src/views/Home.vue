<template lang="pug">
  v-container( fluid )
    v-row
      v-col(cols="12" sm="6" md="12")
        img(:src="solution" :lazy-src="solution" width="375").mi-image
    v-row
      v-col(cols="12" sm="6" md="12")
        h1 Bienvenido al generador de números pseudoaleatorios
        v-btn( @click="to" outlined color="#8BBF56" ).ma-2 Generador
          v-icon mdi-cog-counterclockwise
</template>

<script>
import solution from "@/assets/solution.png"
export default {
  name: "Home",
  data: () => ({
    solution: solution
  }),
  methods: {
    to() {
      this.$router.push("/generador");
    },
  },
};
</script>
<style scoped>
.mi-image {
  background-position: center center;
}
</style>