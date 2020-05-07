<template lang="pug">
    v-container(fluid)
        v-row
            v-col
                v-card(raised)
                    v-card-title Metodo del congruencial Multiplicativo
                    v-card-text
                        v-form(
                          ref="form"
                          v-model="valid"
                          lazy-validation
                        )
                            v-row
                                v-col()
                                    v-text-field(
                                        label="Semilla"
                                        v-model="seed"
                                        :rules="seedRules"
                                        validate-on-blur
                                    )
                                    v-text-field(
                                        label="Multiplicador A"
                                        v-model="a"
                                        :rules="aRules"
                                        validate-on-blur
                                    )
                                v-col()
                                    v-text-field(
                                        label="modulo M"
                                        v-model="m"
                                        :rules="mRules"
                                        validate-on-blur
                                    )
                                    v-text-field(
                                        label="Cantidad de números a generar"
                                        v-model="n"
                                        :rules="nRules"
                                        validate-on-blur
                                    )
                    v-card-actions
                        v-spacer
                        v-btn( @click="validate" color="primary") Generar
            v-col
                v-card(raised)
                    v-data-table(
                        :headers="headers"
                        :items="numbers"
                        :items-per-page="5"
                        :loading="loading"
                    )
</template>
<script>
import axios from "@/api";
export default {
  name: "CongruencialMultiplicativo",
  data() {
    return {
      seed: null,
      a: null,
      m: null,
      n: null,
      loading: false,
      numbers: [],
      headers: [
        { text: "Indice", value: "index" },
        { text: "Numero", value: "number" },
      ],
      valid: true,

      seedRules: [
        (v) => !!v || "La semilla es requerida",
        (v) =>
          Number.isInteger(parseInt(v)) ||
          "La semilla debe ser un numero entero",
        (v) => this.isPrime(v) || "La semilla debe ser primo",
        (v) =>
          !this.isDivisibility(v) ||
          "La semilla no debe ser divisible por 2 y 5",
        (v) => v > 0 || "La semilla debe ser mayor que 0",
      ],
      aRules: [
        (v) => !!v || "A es requerida",
        (v) => Number.isInteger(parseInt(v)) || "A debe ser un numero entero",
        (v) => this.isPrime(v) || "A debe ser primo",
        (v) => v > 0 || "A debe ser mayor que 0",
      ],
      mRules: [
        (v) => !!v || "M es requerida",
        (v) => Number.isInteger(parseInt(v)) || "M debe ser un numero entero",
        (v) => this.isPrime(v) || "M debe ser primo",
        (v) => v > 0 || "M debe ser mayor que 0",
      ],
      nRules: [
        (v) => !!v || "La cantidad es requerida",
        (v) =>
          Number.isInteger(parseInt(v)) ||
          "La cantidad debe ser un numero entero",
        (v) => v > 0 || "La cantidad debe ser mayor que 0",
      ],
    };
  },
  methods: {
    async generate() {
      this.loading = true;
      let { data } = await axios.post("congruencialMultiplicativo", {
        seed: this.seed,
        m: this.m,
        a: this.a,
        n: this.n,
      });
      data = data.map((n, i) => ({ index: i + 1, number: n }));
      this.numbers = data;
      this.loading = false;
    },
    isPrime(number) {
      if (number < 1) return;
      for (let i = 2; i < number; i++) {
        if (number % i === 0) {
          return false;
        }
      }
      return true;
    },
    /** Verifica la divisibilidad entre 2 y 5 */
    isDivisibility(seed) {
      if (seed % 2 == 0 || seed % 5 == 0) {
        return true;
      }
      return false;
    },
    validateSeed(seed) {
      this.isPrime(seed);
      this.isDivisibility(seed);
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.generate();
      }
    },
  },
};
</script>
