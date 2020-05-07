<template lang="pug">
    v-container(fluid)
        v-row
            v-col
                v-card(raised)
                    v-card-title Metodo de Fibonacci
                    v-card-text
                        v-form
                            v-row
                                v-col()
                                    v-text-field(
                                        label="Semilla V1"
                                        @change="isDivisibility"
                                        v-model="seed1"
                                    )
                                    v-text-field(
                                        label="Multiplicador A"
                                        v-model="a"
                                    )
                                v-col()
                                    v-text-field(
                                        label="Semilla V2"
                                        @change="isDivisibility"
                                        v-model="seed2"
                                    )
                                    v-text-field(
                                        label="Cantidad de numeros a generar"
                                        v-model="n"
                                    )
                    v-card-actions
                        v-spacer
                        v-btn( @click="generate" color="primary") Generar
            v-col
                v-data-table(
                    :headers="headers"
                    :items="numbers"
                    :items-per-page="5"
                    class="elevation-1"
                )
</template>
<script>
import axios from "@/api";
export default {
  name: "Fibonacci",
  data: () => ({
    seed1: null,
    seed2: null,
    a: null,
    n: null,
    numbers: [],
    headers: [
      { text: "Indice", value: "index" },
      { text: "Numero", value: "number" },
    ],
  }),
  methods: {
    async generate() {
      let { data } = await axios.post("fibonacci", {
        v1: this.seed1,
        v2: this.seed2,
        a: this.a,
        n: this.n,
      });
      console.log(data);

      data = data.map((n, i) => ({ index: i + 1, number: n }));
      this.numbers = data;
    },
    /** Verifica la divisibilidad entre 2 y 5 */
    isDivisibility(seed) {
      if (seed && (seed % 2 == 0 || seed % 5 == 0)) {
        alert("Las semillas no deben ser por 2 y 5");
      }
    },
  },
};
</script>
