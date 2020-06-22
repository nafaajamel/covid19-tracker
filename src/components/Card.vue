<template>
  <md-card :class="'card' + getClassName" md-with-hover>
    <md-ripple>
      <md-card-header>
        <div class="md-title">{{ title }}</div>
        <div class="md-subhead">
          <ICountUp
            :delay="4000"
            :endVal="subTitle || 0"
            :options="countOptions"
          />
        </div>
      </md-card-header>
      <md-card-content>{{ description }}</md-card-content>
    </md-ripple>
  </md-card>
</template>
<script>
import ICountUp from "vue-countup-v2";
export default {
  name: "Card",
  props: {
    title: String,
    subTitle: Number,
    description: String,
  },
  components: { ICountUp },
  data() {
    return {
      countOptions: {
        separator: " ",
      },
    };
  },
  computed: {
    getClassName() {
      let title = this.title.toLowerCase();
      return title === "infected"
        ? ` warning`
        : title === "recovered"
        ? ` success`
        : ` danger`;
    },
  },
};
</script>

<style scoped>
.card {
  margin: 15px 0;
  --danger: #dc3545;
  --warning: #ffc107;
  --success: #28a745;
}
.md-subhead {
  color: black 7_;
  font-weight: bold;
}
.danger {
  border-bottom: 5px inset var(--danger);
}

.warning {
  border-bottom: 5px inset var(--warning);
}

.success {
  border-bottom: 5px inset var(--success);
}
</style>
