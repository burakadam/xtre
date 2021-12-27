<template>
  <div class="d-flex justify-space-between day-content">
    <div class="d-flex tsr">
      <SelectBox
        :items="pList"
        itemText="name"
        itemVelue="id"
        class="w-173"
        isSmaller
        :selectedItemValue="selectedOptionId"
      />
      <v-btn>
        <i class="fa fa-edit"></i>
      </v-btn>
    </div>
    <div class="d-flex day-container">
      <div
        v-for="(item, index) in daysData"
        :key="index"
        :class="`day-box ${daysData[index].isWeekend ? 'weekend' : ''}`"
      >
        <v-text-field :value="item.total" />
      </div>
    </div>
  </div>
</template>
<script>
import SelectBox from '../form/SelectBox.vue'

export default {
  components: { SelectBox },
  props: {
    selectedOptionId: {
      type: Number,
      default: 0
    },
    daysData: {
      type: Array,
      default: () => {
        return [
          {
            total: 0,
            details: []
          },
          { total: 0, details: [] },
          {
            total: 0,
            details: []
          },
          { total: 0, details: [] },
          { total: 0, details: [] },
          {
            total: 0,
            details: [],
            isWeekend: true
          },
          { total: 0, details: [], isWeekend: true },
          {
            total: 0,
            details: []
          },
          { total: 0, details: [] },
          { total: 0, details: [] },
          {
            total: 0,
            details: []
          },
          { total: 0, details: [] },
          { total: 0, details: [], isWeekend: true },
          {
            total: 0,
            details: [],
            isWeekend: true
          },
          { total: 10 }
        ]
      }
    }
  },
  data () {
    return {
      pList: [
        {
          label: 'Select an option',
          value: 0
        },
        {
          label: 'NTS - ABC NTSPR2021',
          value: 1
        },
        {
          label: 'DXFJKFRBK - Trainer 21',
          value: 2
        }
      ]
    }
  }
}
</script>
<style scoped>
.tsr {
  flex: 1;
}
.tsr > div:first-child {
  flex: 1;
}
.tsr button {
  height: 27px !important;
  width: 32px;
  min-width: unset !important;
  margin: 0 9px;
}
.tsr button i {
  font-size: 13px;
}
@media screen and (max-width: 1024px) {
  .tsr {
    flex: none;
    margin-bottom: 14px;
  }
  .tsr > div:first-child {
    max-width: 375px;
  }
}
</style>
