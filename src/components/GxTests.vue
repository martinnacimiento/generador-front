<template lang="pug">
  .center
    v-btn(icon @click="dialog=!dialog")
      v-icon(color="green") mdi-test-tube
    vs-dialog(blur v-model="dialog")
      template(#header)
        h2.not-margin Tests de aleatoriedad
      vs-alert(v-model="alert" closable danger)
        template(#title) Opps!
        | Debe generar una serie de números de las cuales se puedan hacer los tests.
      v-list
        v-list-item
          v-list-item-icon
            v-progress-circular(v-if="loadingMonobits" size="25" color="primary" indeterminate)
            v-icon(v-if="!loadingMonobits" :color="colorMonobits" ) {{ iconMonobits }}
          v-list-item-content Monobits
        v-list-item
          v-list-item-icon
            v-progress-circular(v-if="loadingChiCuadrada" size="25"  color="primary" indeterminate)
            v-icon(v-if="!loadingChiCuadrada" :color="colorChiCuadrada" ) {{ iconChiCuadrada }}
          v-list-item-content Chi-cuadrada
      template(#footer)
        v-spacer
        vs-button(@click="tests" size="large" circle) Lanzar Tests
          template(#animate)
            i(class="bx bx-vial")
</template>
<script>
import axios from "@/api";

export default {
  props: {
    serie: {
      default: Array,
      type: Array,
    },
    k: {
      default: "10",
      type: String,
    },
  },
  data: () => ({
    dialog: false,
    loadingMonobits: false,
    loadingChiCuadrada: false,
    colorMonobits: "#607D8B",
    colorChiCuadrada: "#607D8B",
    iconMonobits: "mdi-check-circle-outline",
    iconChiCuadrada: "mdi-check-circle-outline",
    alert: false,
  }),
  methods: {
    tests() {
      if (this.serie.length > 0) {
        this.loadingMonobits = true;
        this.loadingChiCuadrada = true;
        axios
          .post("tests/monobits", {
            serie: this.serie,
          })
          .then((result) => {
            if (result.data) {
              this.colorMonobits = "#4CAF50";
              this.iconMonobits = "mdi-check-circle-outline";
              this.loadingMonobits = false;
            } else {
              this.colorMonobits = "#F44336";
              this.iconMonobits = "mdi-close-circle-outline";
              this.loadingMonobits = false;
            }
          });
        axios
          .post("tests/chicuadrada", {
            serie: this.serie,
            k: this.k,
          })
          .then((result) => {
            if (result.data) {
              this.colorChiCuadrada = "#4CAF50";
              this.iconChiCuadrada = "mdi-check-circle-outline";
              this.loadingChiCuadrada = false;
            } else {
              this.colorChiCuadrada = "#F44336";
              this.iconChiCuadrada = "mdi-close-circle-outline";
              this.loadingChiCuadrada = false;
            }
          });
      } else {
        this.alert = true;
      }
    },
  },
};
</script>
