<template>
  <div class="w-half">
    <shadow-content
      :title="chartTitle"
      :titleIcon="`fal fa-${chartIcon}`"
      :isBigger="true"
    >
      <div class="d-flex align-end chart-card">
        <div class="cc-chart">
          <timesheetChart
            ref="skills_chart"
            :chart-data="chartData"
            :options="options"
          >
          </timesheetChart>
        </div>
        <div class="chart-data">
          <div
            v-for="(item, index) in chartData.datasets[0].names"
            :key="index"
          >
            <p>{{ item }}</p>
            <span
              :style="{
                backgroundColor: chartData.datasets[0].backgroundColor[index]
              }"
            ></span>
          </div>
        </div>
      </div>
    </shadow-content>
  </div>
</template>
<script>
import ShadowContent from '../shadow-content/ShadowContent.vue'
import TimesheetChart from '../timesheetChart/TimesheetChart.vue'

export default {
  components: { TimesheetChart, ShadowContent },
  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          animateRotate: false
        },
        autoPadding: false
      },
      datacollection: {}
    }
  },
  props: {
    chartData: {
      type: Object,
      default: {}
    },
    chartTitle: {
      type: String,
      default: ''
    },
    chartIcon: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped>
.chart-card {
  padding: 0 30px;
}
.cc-chart {
  width: 250px;
  height: 250px;
}
.chart-data {
  padding: 0 30px;
  flex: 1;
}
.chart-data > div {
  width: 100%;
  max-width: 197px;
  padding: 11px 12px 11px 20px;
  background-color: #e5e9f9;
  border-radius: 5px;
  margin-bottom: 8px;
  display: flex;
}

.chart-data p {
  flex: 1;
  margin-bottom: 0;
  padding-right: 0.6em;
}

.chart-data p + span {
  width: 20px;
  height: 20px;
  border: 1px solid #fff;
  border-radius: 4px;
}
@media screen and (max-width: 1100px) {
  .cc-chart {
    width: 180px;
    height: 180px;
  }
}
@media screen and (max-width: 600px) {
  .chart-card {
    flex-direction: column;
    padding: 0;
    align-items: center !important;
  }
  .chart-data {
    width: 100%;
    margin-top: 20px;
    padding: 0;
  }

  .chart-data > div {
    max-width: unset;
  }
}
</style>
