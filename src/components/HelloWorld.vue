<template>
  <div>
    <div>
      <button v-on:click="chartType('PieChart')">Pie Chart</button>
      <button v-on:click="chartType('AreaChart')">Area Chart</button>
    </div>
    <div v-if="this.selectedChart === null">
      <h1>Select a Chart</h1>
    </div>

    <div v-if="this.selectedChart === 'PieChart'">
      <pie-chart></pie-chart>
    </div>

    <div v-if="this.selectedChart === 'AreaChart'">
      <area-chart></area-chart>
    </div>
  </div>
</template>

<script>
import pieChart from './PieChart.vue'
import areaChart from './AreaChart.vue'

export default {
  components: {
    pieChart,
    areaChart,
  },
  data: () => {
    return {
      selectedChart: 'AreaChart'
    }
  },
  methods: {
    chartType: function(value) {
      this.selectedChart = value
    }
  }
}
</script>