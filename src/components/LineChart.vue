<script>
import { Line } from "vue-chartjs";
export default {
  name: "LineChart",
  extends: Line,
  mounted() {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
    };

    this.renderChart(this.chartData, options);
  },
  props: { chartData: Object },
};
</script>
