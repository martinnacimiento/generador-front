<template lang="pug">
    v-container(fluid)
        v-snackbar(
          v-model="snackbar"
          :timeout="timeout"
          bottom
          right
          color="success" 
        )
          v-icon(color="white" ) mdi-check-circle-outline
          | Copiado!
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
                                v-col(cols="12" sm="6")
                                    v-text-field(
                                        label="Semilla V1"
                                        :rules="seedRules"
                                        v-model="seed1"
                                        hint="Se recomienda usar números primos"
                                        validate-on-blur
                                    )
                                v-col(cols="12" sm="6")
                                    v-text-field(
                                        label="Semilla V2"
                                        v-model="seed2"
                                        :rules="seedRules"
                                        hint="Se recomienda usar números primos"
                                        validate-on-blur
                                    )
                                v-col(cols="12" sm="6")
                                    v-text-field(
                                        label="Multiplicador A"
                                        hint="Se recomienda usar números primos"
                                        :rules="aRules"
                                        v-model="a"
                                        validate-on-blur
                                    )
                                v-col(cols="12" sm="6")
                                    v-text-field(
                                        label="Cantidad de numeros a generar"
                                        v-model="n"
                                        :rules="nRules"
                                        validate-on-blur
                                    )
                    v-card-actions
                        v-spacer
                        v-btn( @click="validate" color="primary" outlined) Generar
            v-col
              v-card(raised)
                v-data-table(
                    :headers="headers"
                    :items="numbers"
                    :items-per-page="5"
                    :loading="loading"
                )
                  template(v-slot:top="{ items }")
                    v-expand-transition
                      v-alert(v-if="alert"  type="info" text dense ) 
                        | Ahora puede comprobar la calidad de la serie de números generada presionando en el botón 
                        v-icon(color="green" ) mdi-test-tube
                        v-row(no-gutters)
                          v-spacer
                          v-btn(color="info" outlined x-small @click="alert = false") Ok
                    v-toolbar(flat)
                      v-toolbar-title Serie de números aleatorios
                      v-divider.mx-4(inset vertical)
                      div.flex-grow-1
                      v-tooltip(left)
                        template(v-slot:activator="{ on }")
                          v-btn(icon v-on="on")
                            v-icon(@click="copy") mdi-content-copy
                        span Copiar serie
                      gx-tests( :serie="serie")
</template>
<script>
import axios from "@/api";
import GxTests from "@/components/GxTests";
export default {
  name: "Fibonacci",
  components: { GxTests },
  data() {
    return {
      seed1: null,
      seed2: null,
      a: null,
      n: null,
      numbers: [],
      serie: [],
      headers: [
        { text: "Indice", value: "index" },
        { text: "Numero", value: "number" },
      ],
      valid: true,
      loading: false,
      alert: true,
      snackbar: false,
      timeout: 2000,
      //rules
      seedRules: [
        (v) => !!v || "La semilla es requerida",
        (v) =>
          Number.isInteger(parseInt(v)) ||
          "La semilla debe ser un numero entero",
        (v) => v > 0 || "La semilla debe ser mayor que 0",
      ],
      aRules: [
        (v) => !!v || "A es requerida",
        (v) => Number.isInteger(parseInt(v)) || "A debe ser un numero entero",
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
      this.serie = data;
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
    copy() {
      let aux = document.createElement("input");
      aux.setAttribute("value", JSON.stringify(this.serie));
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      this.snackbar = true;
    },
  },
};
</script>
