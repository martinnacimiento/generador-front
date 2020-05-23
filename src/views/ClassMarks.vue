<template lang="pug">
  v-container(fluid)
    v-row
      v-col
        v-card(raised)
          v-data-table(
              :headers="headers"
              :items="$store.getters.serie"
              :items-per-page="5"
              :loading="loading"
              dense
          )
            template(v-slot:top="{ items }")
              v-toolbar(flat)
                v-toolbar-title Serie de números aleatorios
                v-divider.mx-4(inset vertical)
                div.flex-grow-1
                v-tooltip(left)
                  template(v-slot:activator="{ on }")
                    v-btn(icon v-on="on")
                      v-icon(@click="copy") mdi-content-copy
                  span Copiar serie
    v-row
      v-col(cols="12" sm="6")
        v-text-field(
          label="Nº de marcas de clase"
          v-model="quantityClassMarks"
          @change="generateInputs"
          autofocus
          color="#010B40"
        )
    v-row(v-for="(m, index) in marks" :key="index")
      v-col(cols="12" sm="6")
        v-text-field(label="Nombre" v-model="m.name" filled color="#010B40")
      v-col(cols="12" sm="6")
        v-text-field(label="Probabilidad" v-model="m.probability" filled color="#010B40")

</template>
<script>
import mixin from "@/mixins/mixins.js";
export default {
  name: "ClassMarks",
  mixins: [mixin],
  data: () => ({
    marks: [],
    quantityClassMarks: null,
    headers: [
      { text: "Indice", value: "index" },
      { text: "Numero", value: "number" },
    ],
    loading: false
  }),
  methods: {
    generateInputs(n) {
      if (n >= 0 && n < 15) {
        this.marks = []
        for (let index = 0; index < n; index++) {
          this.marks.push({})
        }
      } else {
        this.marks = []
        this.quantityClassMarks = 0
      }
    }
  }
};
</script>