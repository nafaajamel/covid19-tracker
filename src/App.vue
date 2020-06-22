<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">Covid-19 Tracker</span>
      </md-app-toolbar>
      <md-app-content>
        <Cards :stats="stats" />
        <CountryPicker
          @selectCountry="getSelectedCountry"
          :countries="countries"
        />
        <Spinner v-if="loading" />
        <LineChart
          :chartData="chartData"
          v-else-if="selectedCountry === 'all'"
        />
        <BarChart :chartData="chartData" :country="selectedCountry" v-else />
      </md-app-content>
    </md-app>
  </div>
</template>
<script>
import Cards from "./components/Cards";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import { baseUrl, countriesUrl, dailyDataUrl } from "./consts/index";
import CountryPicker from "./components/CountryPicker";
import Spinner from "./components/Spinner";
export default {
  name: "App",
  components: {
    Cards,
    LineChart,
    CountryPicker,
    BarChart,
    Spinner,
  },
  data() {
    return {
      stats: {
        confirmed: {
          title: "Infected",
          description: "Number of active cases of COVID-19.",
          value: 0,
        },
        recovered: {
          title: "Recovered",
          description: "Number of recoveries from COVID-19.",
          value: 0,
        },
        deaths: {
          title: "Deaths",
          description: "Number of deaths caused by COVID-19",
          value: 0,
        },
      },
      countries: [],
      selectedCountry: "all",
      chartData: {},
      loading: true,
    };
  },
  watch: {
    selectedCountry() {
      this.fetchChartData();
    },
  },
  mounted() {
    this.fetchChartData();

    this.$http.get(countriesUrl).then(({ body: { countries } }) => {
      this.countries = countries.map((country) => country.name);
    });
  },
  methods: {
    getSelectedCountry(country) {
      this.selectedCountry = country;
    },
    fetchChartData() {
      this.loading = true;
      const colors = {
        danger: "#dc3545",
        warning: "#ffc107",
        success: "#28a745",
      };
      if (this.selectedCountry === "all") {
        this.$http.get(baseUrl).then(({ data }) => {
          this.stats = Object.keys(this.stats).reduce((acc, key) => {
            acc[key].value = data[key].value;
            return acc;
          }, this.stats);
        });
        this.$http.get(dailyDataUrl).then(({ body }) => {
          let [reportDate, infected, recovered, deaths] = body.reduce(
            (acc, { reportDate, totalConfirmed, recovered, deaths }) => {
              return [
                acc[0].concat(reportDate),
                acc[1].concat(totalConfirmed),
                acc[2].concat(recovered.total),
                acc[3].concat(deaths.total),
              ];
            },
            [[], [], [], []]
          );

          this.chartData = {
            labels: reportDate,
            datasets: [
              {
                label: "Infected",
                data: infected,
                borderColor: colors.warning,
              },
              {
                label: "Deaths",
                data: deaths,
                borderColor: colors.danger,
              },
              {
                label: "Recovered",
                data: recovered,
                borderColor: colors.success,
              },
            ],
          };
          this.loading = false;
        });
      } else {
        this.$http
          .get(`${countriesUrl}/${this.selectedCountry}`)
          .then(({ body: { confirmed, recovered, deaths } }) => {
            this.chartData = {
              labels: ["confirmed", "recovered", "deaths"],
              datasets: [
                {
                  backgroundColor: [
                    colors.warning,
                    colors.success,
                    colors.danger,
                  ],
                  data: [confirmed.value, recovered.value, deaths.value],
                },
              ],
            };
            this.stats.recovered.value = recovered.value;
            this.stats.confirmed.value = confirmed.value;
            this.stats.deaths.value = deaths.value;
            this.loading = false;
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>

<style scoped>
.md-app {
  margin: 0;
  border: 1px solid rgba(#000, 0.12);
}
</style>
