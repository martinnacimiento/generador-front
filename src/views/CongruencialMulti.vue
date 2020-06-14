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
                    v-card-title.word-break
                      span(class="title font-weight-light") Método de Congruencias Multiplicativo
                    v-card-text
                        v-form(
                          ref="form"
                          v-model="valid"
                          lazy-validation
                        )
                            v-row
                                v-col(cols="12" sm="6")
                                    v-text-field(
                                        label="Semilla"
                                        v-model="seed"
                                        hint="Se recomienda usar números primos"
                                        :rules="seedRules"
                                        validate-on-blur
                                        color="light-blue darken-4"
                                        filled
                                        rounded
                                        dense
                                    )
                                v-col(cols="12" sm="6")
                                    v-text-field(
                                        label="Multiplicador A"
                                        v-model="a"
                                        :rules="aRules"
                                        hint="Se recomienda usar números primos"
                                        validate-on-blur
                                        color="light-blue darken-4"
                                        filled
                                        rounded
                                        dense
                                    )
                                v-col(cols="12" sm="6")
                                    v-text-field(
                                        label="modulo M"
                                        v-model="m"
                                        :rules="mRules"
                                        validate-on-blur
                                        color="light-blue darken-4"
                                        filled
                                        rounded
                                        dense
                                    )
                                v-col(cols="12" sm="6")
                                    v-text-field(
                                        label="Cantidad de números a generar"
                                        v-model="n"
                                        :rules="nRules"
                                        validate-on-blur
                                        color="light-blue darken-4"
                                        filled
                                        rounded
                                        dense
                                    )
                    v-card-actions
                        v-spacer
                        vs-button(@click="validate" size="large" circle) Generar
                          template(#animate)
                            v-icon(small color="white") mdi-cog-counterclockwise
            v-col
                v-card(raised)
                    v-data-table(
                        :headers="headers"
                        :items="$store.getters.serie"
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
                          gx-tests( :serie="$store.state.serie" :k="m")
</template>
<script>
import axios from "@/api";
import GxTests from "@/components/GxTests";
export default {
  name: "CongruencialMultiplicativo",
  components: { GxTests },
  data() {
    return {
      seed: null,
      a: null,
      m: null,
      n: null,
      loading: false,
      headers: [
        { text: "Indice", value: "index" },
        { text: "Numero", value: "number" },
      ],
      valid: true,
      alert: true,
      snackbar: false,
      timeout: 2000,

      seedRules: [
        (v) => !!v || "La semilla es requerida",
        (v) =>
          Number.isInteger(parseInt(v)) ||
          "La semilla debe ser un numero entero",
        (v) =>
          !this.isDivisibility(v) ||
          "La semilla no debe ser divisible por 2 y 5",
        (v) => v > 0 || "La semilla debe ser mayor que 0",
      ],
      aRules: [
        (v) => !!v || "A es requerida",
        (v) => Number.isInteger(parseInt(v)) || "A debe ser un numero entero",
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
      this.$store.commit("setSerie", data);
      this.$store.commit("setDivider", this.m);
      this.$store.commit("setTransformated", false);
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
        if (parseInt(this.seed) < parseInt(this.m)) {
          this.generate();
        } else {
          alert("La semilla debe ser menor que el modulo M.");
        }
      }
    },
    copy() {
      let aux = document.createElement("input");
      aux.setAttribute("value", JSON.stringify(this.$store.state.serie));
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      this.snackbar = true;
    },
  },
};
</script>
<style scoped>
.word-break {
  word-break: normal;
}
</style>
