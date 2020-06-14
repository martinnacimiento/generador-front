<template lang="pug">
  v-stepper(v-model="step")
    v-stepper-header
      v-stepper-step(
        color="#8BBF56"
        editable
        :complete="step > 1"
        step="1"
      ) Generar serie
      v-divider
      v-stepper-step(
        color="#8BBF56"
        :editable="step > 2"
        :complete="step > 2"
        step="2"
      ) Transformar serie
        small Opcional
      v-divider
      v-stepper-step(
        color="#8BBF56"
        editable
        :complete="step > 3"
        step="3"
      ) Marcas de clase
      v-divider
      v-stepper-step(
        color="#8BBF56"
        step="4"
      ) Simulación
    v-stepper-items
      v-stepper-content(step="1")
        v-select(
          :items="methods"
          label="Metodo generadores de serie"
          v-model="methodSelected"
        )
        CongruenciasMultiplicativo(v-if="methodSelected == 1")
        Fibonacci(v-if="methodSelected == 2")
        v-btn(@click="next(2)" outlined color="light-blue darken-4") Siguiente
      v-stepper-content(step="2")
        Transformation
        v-btn(@click="next(3)" outlined color="light-blue darken-4") Siguiente
      v-stepper-content(step="3")
        ClassMarks
        v-btn(@click="next(4)" outlined color="light-blue darken-4") Siguiente
      v-stepper-content(step="4")
        Dam
</template>
<script>
// Metodos generadores de series
import CongruenciasMultiplicativo from "./CongruencialMulti";
import Fibonacci from "./Fibonacci";

// Transformador de series
import Transformation from "./Transformation";

// Marcas de clase
import ClassMarks from "./ClassMarks";

// Represa
import Dam from "./Dam";

import mixin from "@/mixins/mixins.js";
export default {
  name: "Stepper",
  mixins: [mixin],
  components: {
    CongruenciasMultiplicativo,
    Fibonacci,
    Transformation,
    ClassMarks,
    Dam,
  },
  data: () => ({
    step: 1,
    methodSelected: 1,
    methods: [
      { text: "Congurencias Multiplicativo", value: 1 },
      { text: "Fibonacci", value: 2 },
    ],
  }),
  watch: {
    step(step) {
      if (step == 3 && !this.$store.state.transformated) {
        let serie = this.$store.state.serie.map((na) =>
          this.transformate(na, 0, 99)
        );
        this.$store.commit("setSerie", serie);
        this.$store.commit("setInterval", {
          min: 0,
          max: 99,
        });
      }
    },
  },
  methods: {
    next(step) {
      if (this.$store.state.serie.length > 0) {
        this.step = step;
      } else {
        alert("Debe generar una serie de numeros primero");
      }
    },
  },
};
</script>
