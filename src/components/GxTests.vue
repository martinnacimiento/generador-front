<template lang="pug">
    v-dialog( v-model="dialog" max-width="500px")
      template(v-slot:activator="{ on }")
        v-btn(icon v-on="on")
          v-icon(color="green") mdi-test-tube
      v-card
          v-card-title
              span.headline Tests de aleatoriedad
          v-card-text
              v-list
                  v-list-item
                      v-list-item-icon
                          v-progress-circular(v-if="loadingMonobits" size="25" color="primary" indeterminate)
                          v-icon(v-if="!loadingMonobits"  :color="colorMonobits" ) {{ iconMonobits }}
                      v-list-item-content Monobits
                  v-list-item
                      v-list-item-icon
                          v-progress-circular(v-if="loadingChiCuadrada" size="25"  color="primary" indeterminate)
                          v-icon(v-if="!loadingChiCuadrada"  :color="colorChiCuadrada" ) {{ iconChiCuadrada }}
                      v-list-item-content Chi-cuadrada
          v-card-actions
            v-spacer
            v-btn(color="primary" @click="tests" outlined ) Lanzar tests
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
    colorMonobits: "gray",
    colorChiCuadrada: "gray",
    iconMonobits: "mdi-circle-outline",
    iconChiCuadrada: "mdi-circle-outline",
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
              this.colorMonobits = "green";
              this.iconMonobits = "mdi-check-circle-outline";
              this.loadingMonobits = false;
            } else {
              this.colorMonobits = "red";
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
              this.colorChiCuadrada = "green";
              this.iconChiCuadrada = "mdi-check-circle-outline";
              this.loadingChiCuadrada = false;
            } else {
              this.colorChiCuadrada = "red";
              this.iconChiCuadrada = "mdi-close-circle-outline";
              this.loadingChiCuadrada = false;
            }
          });
      } else {
        alert("Debe generar una serie de números para hacer tests.");
      }
    },
  },
};
</script>
