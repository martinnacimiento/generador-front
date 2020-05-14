<template lang="pug">
  v-container( fluid )
    h1 Bienvenido al generador de números pseudoaleatorios
    v-text="Seleccione su metodo: "
    v-btn( @click="fibonacci" outlined color="warning" ).ma-2 Fibonacci
    v-btn( @click="congruencialMultiplicativo" outlined color="success").ma-2 Congruencias Multiplicativo
      
</template>

<script>
export default {
  name: "Home",
  methods: {
    fibonacci() {
      this.$router.push("/fibonacci");
    },
    congruencialMultiplicativo() {
      this.$router.push("/congruencial-multiplicativo");
    },
  },
};
</script>
