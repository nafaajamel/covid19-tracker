
<script>
import { Bar } from "vue-chartjs";
export default {
  name: "BarChart",
  extends: Bar,
  mounted() {
    this.getChartData();
  },
  data() {
    return {
      options: {
        responsive: true,
        legend: false,
        maintainAspectRatio: false,
        title: { display: true, text: `COVID-19 in ${this.country}` }
      }
    };
  },
  watch: {
    country() {
      this.getChartData();
    }
  },
  methods: {
    getChartData() {
      this.renderChart(this.chartData, this.options);
    }
  },
  props: { country: String, chartData: Object }
};
</script>
