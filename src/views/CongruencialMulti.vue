<template lang="pug">
    v-container(fluid)
        v-row
            v-col
                v-card(raised)
                    v-card-title Metodo del congruencial Multiplicativo
                    v-card-text
                        v-form
                            v-row
                                v-col()
                                    v-text-field(
                                        label="Semilla"
                                        v-model="seed"
                                    )
                                    v-text-field(
                                        label="Multiplicador A"
                                        v-model="a"
                                    )
                                v-col()
                                    v-text-field(
                                        label="modulo M"
                                        v-model="m"
                                    )
                                    v-text-field(
                                        label="Cantidad de numeros a generar"
                                        v-model="n"
                                    )
                    v-card-actions
                        v-spacer
                        v-btn( @click="generate" color="primary") Generar
            v-col
                v-card(raised)
                    v-data-table(
                        :headers="headers"
                        :items="numbers"
                        :items-per-page="5"
                    )
</template>
<script>
import axios from "@/api";
export default {
  name: "CongruencialMultiplicativo",
  data: () => ({
    seed: null,
    a: null,
    m: null,
    n: null,
    numbers: [],
    headers: [
      { text: "Indice", value: "index" },
      { text: "Numero", value: "number" },
    ],
  }),
  methods: {
    async generate() {
      let { data } = await axios.post("congruencialMultiplicativo", {
        seed: this.seed,
        m: this.m,
        a: this.a,
        n: this.n,
      });
      data = data.map((n, i) => ({ index: i + 1, number: n }));
      this.numbers = data;
    },
  },
};
</script>
