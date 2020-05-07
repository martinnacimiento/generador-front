<template lang="pug">
    v-container(fluid)
        v-row
            v-col
                v-card(raised)
                    v-card-title Metodo de Fibonacci
                    v-card-text
                        v-form(
                          ref="form"
                          v-model="valid"
                          lazy-validation
                        )
                            v-row
                                v-col()
                                    v-text-field(
                                        label="Semilla V1"
                                        :rules="seedRules"
                                        v-model="seed1"
                                        validate-on-blur
                                    )
                                    v-text-field(
                                        label="Multiplicador A"
                                        @change="isPrime"
                                        :rules="aRules"
                                        v-model="a"
                                        validate-on-blur
                                    )
                                v-col()
                                    v-text-field(
                                        label="Semilla V2"
                                        v-model="seed2"
                                        :rules="seedRules"
                                        validate-on-blur
                                    )
                                    v-text-field(
                                        label="Cantidad de numeros a generar"
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
  name: "Fibonacci",
  data() {
    return {
      seed1: null,
      seed2: null,
      a: null,
      n: null,
      numbers: [],
      headers: [
        { text: "Indice", value: "index" },
        { text: "Numero", value: "number" },
      ],
      valid: true,
      loading: false,

      //rules
      seedRules: [
        (v) => !!v || "La semilla es requerida",
        (v) =>
          Number.isInteger(parseInt(v)) ||
          "La semilla debe ser un numero entero",
        (v) => this.isPrime(v) || "La semilla debe ser primo",
        (v) => v > 0 || "La semilla debe ser mayor que 0",
      ],
      aRules: [
        (v) => !!v || "A es requerida",
        (v) => Number.isInteger(parseInt(v)) || "A debe ser un numero entero",
        (v) => this.isPrime(v) || "A debe ser primo",
        (v) => v > 0 || "A debe ser mayor que 0",
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
      let { data } = await axios.post("fibonacci", {
        v1: this.seed1,
        v2: this.seed2,
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
    validate() {
      if (this.$refs.form.validate()) {
        if (
          parseInt(this.a) > parseInt(this.seed1) &&
          parseInt(this.a) > parseInt(this.seed2)
        ) {
          this.generate();
        } else {
          alert("A tiene que ser mayor que las semillas.");
        }
      }
    },
  },
};
</script>
