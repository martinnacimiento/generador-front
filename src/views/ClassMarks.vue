<template lang="pug">
  v-container(fluid)
    v-snackbar(
          v-model="snackbar"
          :timeout="timeout"
          bottom
          right
          color="error" 
        ) La suma de las probabilidades debe ser 100%
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
        v-text-field(label="Nombre" :rules="rules" v-model="m.name" filled color="#010B40")
      v-col(cols="12" sm="6")
        v-text-field(label="Probabilidad"  suffix="%" :rules="rules" v-model="m.expectedProbability" v-mask="'##'" filled color="#010B40")
    v-row
      v-col
        v-spacer
        v-btn(@click="getClassMarks" outlined color="#010B40") Generar marcas de clases
    v-row(v-if="dataset")
      v-col
        GxChart(:chartdata="dataset")
</template>
<script>
import mixin from "@/mixins/mixins.js";
import GxChart from "@/components/GxChart";
import axios from "@/api";
export default {
  name: "ClassMarks",
  mixins: [mixin],
  components: { GxChart },
  data: () => ({
    snackbar: false,
    timeout: 2000,
    marks: [],
    quantityClassMarks: null,
    headers: [
      { text: "Indice", value: "index" },
      { text: "Numero", value: "number" },
    ],
    loading: false,
    dataset: null,
    classMarks: null,
    rules: [(v) => !!v || "El campo es requerido."],
  }),
  methods: {
    async getClassMarks() {
      if (this.validate()) {
        let marks = JSON.parse(JSON.stringify(this.marks));
        marks.map((m) => {
          m.expectedProbability = parseInt(m.expectedProbability) / 100;
          return m;
        });
        let { data } = await axios.post("classMarks", {
          classMarks: marks,
          serie: this.$store.state.serie,
          minimum: this.$store.state.interval.min,
          maximum: this.$store.state.interval.max,
        });
        this.classMarks = data;
        this.dataset = this.getDataSet();
      } else {
        this.snackbar = true;
      }
    },
    generateInputs(n) {
      if (n >= 0 && n < 15) {
        this.marks = [];
        for (let index = 0; index < n; index++) {
          this.marks.push({});
        }
      } else {
        this.marks = [];
        this.quantityClassMarks = 0;
      }
    },
    getDataSet() {
      return {
        labels: this.getLabels(),
        datasets: [this.getExpected(), this.getObtained()],
      };
    },
    getLabels() {
      return this.classMarks.map((cm) => cm.name);
    },
    getExpected() {
      return {
        label: "Probabilidad esperada",
        backgroundColor: "#010B40",
        data: this.classMarks.map((cm) => cm.expectedProbability),
        fill: false,
        borderColor: "#010B40"
      };
    },
    getObtained() {
      return {
        label: "Probabilidad obtenida",
        backgroundColor: "#8BBF56",
        data: this.classMarks.map((cm) => cm.obtainedProbability),
        fill: false,
        borderColor: "#8BBF56"
      };
    },
    validate() {
      let result = 0;
      this.marks.forEach((m) => {
        result += parseInt(m.expectedProbability);
      });
      return result == 100;
    },
  },
};
</script>
