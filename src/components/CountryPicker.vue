<template>
  <div class="md-layout-item">
    <md-field>
      <label for="countries">by country</label>
      <md-select v-model="selectedCountry" name="countries" id="countries">
        <md-option value="all">all</md-option>
        <md-option :key="country" v-for="country in countries" :value="country">{{country}}</md-option>
      </md-select>
    </md-field>
  </div>
</template>
<script>
export default {
  name: "CityPicker",
  props: {
    countries: Array
  },
  data() {
    return {
      selectedCountry: ""
    };
  },
  watch: {
    selectedCountry() {
      this.$emit("selectCountry",this.selectedCountry);
    }
  }
};
</script>

<style>
</style>
