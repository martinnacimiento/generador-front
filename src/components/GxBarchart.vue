<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  props: {
    chartdata: {
      type: Object,
      default: null,
    },
    labelX: {
      type: String,
      default: "",
    },
    labelY: {
      type: String,
      default: "",
    },
    EventsInfo: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      options: {
        // tooltips: {
        //   callbacks: {
        //     label: (tooltipItem, data) => {
        //       if (this.EventsInfo) {
        //         var label = data.datasets[tooltipItem.datasetIndex].label || "";
        //         if (label) {
        //           label += ": ";
        //         }
        //         label += Math.round(tooltipItem.yLabel * 100) / 100;
        //         return label + " seg";
        //       }
        //       return (
        //         data.datasets[tooltipItem.datasetIndex].label +
        //           " " +
        //           tooltipItem.yLabel || ""
        //       );
        //     },
        //     footer: (tooltipItem) => {
        //       if (this.EventsInfo) {
        //         let cant_events = this.EventsInfo.groups[tooltipItem[0].index]
        //           .events.length;
        //         return (
        //           "entre " + cant_events + " eventos de " + this.EventsInfo.cant
        //         );
        //       }
        //     },
        //   },
        // },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: this.labelX,
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: this.labelY,
              },
            },
          ],
        },
      },
    };
  },
  watch: {
    chartdata() {
      this.$data._chart.update();
      this.renderChart(this.chartdata, this.options);
    },
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>