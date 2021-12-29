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
      <v-btn
        :class="`ts-row-edit-btn ${activeId !== null ? 'active' : ''}`"
        @click="closeEditItem"
      >
        <i class="fa fa-edit"></i>
      </v-btn>
    </div>
    <div>
      <div class="d-flex day-container flex-column">
        <div class="inline-days">
          <TimesheetDays :dates="dates" />
        </div>
        <div class="d-flex">
          <button
            type="button"
            v-for="(item, index) in daysData"
            :key="index"
            :class="`day-box ${daysData[index].isWeekend ? 'weekend' : ''} ${
              selectedId === item.id ? 'active' : ''
            }`"
            v-on:click="selectedId = item.id"
          >
            <v-text-field :value="item.total" type="number" />
            <div class="day-box-info">
              <p v-for="(detail, k) in daysData[index].details" :key="k">
                {{ detail.text }}
              </p>
              <v-btn
                x-small
                outlined
                color="#fff"
                class="day-box-info-edit"
                @click="updateActiveForm(item.id)"
              >
                Düzenle
              </v-btn>
            </div>
          </button>
        </div>
        <div class="d-flex">
          <div
            v-for="(item, index) in daysData"
            :key="index"
            :class="`day-box form ${index === activeId ? 'active' : ''}`"
          >
            <TimesheetJobForm
              v-for="(detail, k) in daysData[index].details"
              :key="k"
              :title="detail.text"
              :amount="detail.amount"
            />
            <TimesheetJobForm :amount="0" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SelectBox from '../form/SelectBox.vue'
import TimesheetDays from '../timesheetDays/TimesheetDays.vue'
import TimesheetJobForm from '../timesheetJobForm/TimesheetJobForm.vue'

export default {
  components: { SelectBox, TimesheetDays, TimesheetJobForm },
  props: {
    selectedOptionId: {
      type: Number,
      default: 0
    },

    dates: { type: Array, default: () => [] },
    daysData: {
      type: Array,
      default: () => {
        return [
          {
            total: 0,
            details: [],
            id: 1
          },
          { total: 0, details: [], id: 2 },
          {
            total: 0,
            details: [],
            id: 3
          },
          { total: 0, details: [], id: 4 },
          { total: 0, details: [], id: 5 },
          {
            total: 0,
            details: [],
            id: 6,
            isWeekend: true
          },
          { total: 0, details: [], isWeekend: true, id: 7 },
          {
            total: 0,
            details: [],
            id: 8
          },
          { total: 0, details: [], id: 9 },
          { total: 0, details: [], id: 10 },
          {
            total: 0,
            details: [],
            id: 11
          },
          { total: 0, details: [], id: 12 },
          { total: 0, details: [], isWeekend: true, id: 13 },
          {
            total: 0,
            details: [],
            isWeekend: true,
            id: 14
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
      ],
      selectedId: 1,
      activeId: null
    }
  },
  methods: {
    updateActiveForm: function (num) {
      this.activeId = num - 1
    },
    closeEditItem: function () {
      this.activeId = null
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
    max-width: 575px;
  }
}
@media screen and (max-width: 600px) {
  .tsr {
    width: 100%;
  }
}
</style>
