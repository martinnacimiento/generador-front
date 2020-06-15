<template lang="pug">
  div
    GxChart(v-if="dataset1" :chartdata="dataset1" labelX="Dias" labelY="m3/s")
    GxChart(v-if="dataset2" :chartdata="dataset2" labelX="Dias" labelY="Unidades")
</template>
<script>
import GxChart from "@/components/GxChart";
export default {
  name: "GxChartDam",
  components: { GxChart },
  props: {
    simulation: {
      type: Array,
      default: Array,
    },
    drainFlow: {
      type: String,
      default: "3000"
    }
  },
  data: () => ({
    dataset1: null,
    dataset2: null,
  }),
  created() {
    this.dataset1 = this.getDataSet1();
    this.dataset2 = this.getDataSet2();
  },
  methods: {
    getDataSet1() {
      return {
        labels: this.getLabels(),
        datasets: [this.getFlow(), this.getDrainedFlow()],
      };
    },
    getDataSet2() {
      return {
        labels: this.getLabels(),
        datasets: [this.getGateOpen(), this.getAlerts()],
      };
    },
    getLabels() {
      return this.simulation.map((day) => day.day);
    },
    getFlow() {
      return {
        label: "Caudal",
        backgroundColor: "#1976D2",
        borderColor: "#1976D2",
        fill: false,
        data: this.simulation.map((day) => day.flow),
      };
    },
    getDrainedFlow() {
      return {
        label: "Escurrido",
        backgroundColor: "#C62828",
        borderColor: "#C62828",
        fill: false,
        data: this.simulation.map((day) => day.gates.filter(g => g).length * parseInt(this.drainFlow)),
      };
    },
    getGateOpen() {
      return {
        label: "Compuertas abiertas",
        backgroundColor: "#388E3C",
        borderColor: "#388E3C",
        fill: false,
        data: this.simulation.map((day) => day.gates.filter(g => g).length),
      };
    },
    getAlerts() {
      return {
        label: "Alertas rojas",
        backgroundColor: "#C62828",
        borderColor: "#C62828",
        fill: false,
        data: this.simulation.map((day) => day.alert? 1: 0),
      };
    },
  },
};
</script>
