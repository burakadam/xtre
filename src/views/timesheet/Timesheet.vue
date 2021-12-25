<template>
  <div>
    <div class="d-flex flex-wrap justify-space-between">
      <TimesheetChartCard
        v-for="(item, index) in datas"
        :key="index"
        :chartData="datas[index]"
        :chartTitle="datas[index].title"
        :chartIcon="datas[index].icon"
      />
    </div>
    <div>
      <timesheet-status-card
        title="annual-leave-balance"
        :usedDays="12"
        :remainsDays="7"
      />
    </div>
  </div>
</template>
<script>
import TimesheetChartCard from '../../components/timesheetChartCard/TimesheetChartCard.vue'
import TimesheetStatusCard from '../../components/timesheetStatusCard/TimesheetStatusCard.vue'

export default {
  components: { TimesheetChartCard, TimesheetStatusCard },
  data () {
    return {
      datas: [
        {
          title: 'month',
          icon: 'chart-pie',
          datasets: [
            {
              backgroundColor: ['#3B4FB4', '#3F9DB9', '#E99F28'],
              data: [45, 34, 20],
              names: ['Chargable', 'Unchargable', 'Others']
            }
          ]
        },
        {
          title: 'quarter-to-date',
          icon: 'chart-pie-alt',
          datasets: [
            {
              backgroundColor: ['#3B4FB4', '#3F9DB9', '#E99F28'],
              data: [15, 40, 10],
              names: ['Chargable', 'Unchargable', 'Others']
            }
          ]
        },
        {
          title: 'year-to-date',
          icon: 'chart-pie',
          datasets: [
            {
              backgroundColor: ['#3B4FB4', '#3F9DB9', '#E99F28'],
              data: [20, 10, 40],
              names: ['Chargable', 'Unchargable', 'Others']
            }
          ]
        }
      ]
    }
  }
}
</script>
