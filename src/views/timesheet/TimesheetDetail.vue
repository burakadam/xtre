<template>
  <div>
    <div class="d-flex justify-space-between two-sides">
      <div class="two-sides__left">
        <router-link to="/timesheet/detail" class="two-sides__btn">
          {{ this.GetLabel(this, 'timesheet-add') }}
          <i class="fal fa-list-alt"></i>
        </router-link>
        <router-link to="/finance/resourceManagement" class="two-sides__btn">
          {{ this.GetLabel(this, 'resource_management') }}
          <i class="fal fa-users-class"></i>
        </router-link>
      </div>
      <div class="two-sides__right">
        <div class="two-sides__right__item">
          <p class="fxs">{{ this.GetLabel(this, 'user_management_wbs') }}</p>
          <SelectBox
            :items="wbs"
            itemText="name"
            itemVelue="id"
            class="w-173"
            isSmaller
            :selectedItemValue="1"
          />
        </div>
        <div class="two-sides__right__item">
          <p class="fxs">
            {{ this.GetLabel(this, 'invoice_management_period') }}
          </p>
          <dxFormDatepickerInput
            v-model="dateModel"
            ref="paymentDateComponentRef"
            :clear="true"
            class="input-box small"
            :placeholder="'payment_invoice_date'"
            :defaultValue="this.currrentDate"
          />
        </div>
        <div class="two-sides__right__item">
          <p class="fxs">{{ this.GetLabel(this, 'time_unit') }}</p>
          <SelectBox
            :items="timeType"
            itemText="name"
            itemVelue="id"
            class="w-98"
            isSmaller
            :selectedItemValue="1"
          />
        </div>
        <div class="two-sides__right__item">
          <p class="fxs">{{ this.GetLabel(this, 'status') }}</p>
          <p class="status-box">{{ status }}</p>
        </div>
      </div>
    </div>
    <shadow-content class="full-m">
      <div class="d-flex justify-space-between align-center day-container">
        <p>wbs</p>
        <TimesheetDays :dates="days" />
      </div>
      <TimesheetRow :daysData="row1" />
    </shadow-content>
  </div>
</template>
<script>
import SelectBox from '../../components/form/SelectBox.vue'
import CustomDateFormatter from '@/library/helpers/customdateformatter'
import ShadowContent from '../../components/shadow-content/ShadowContent.vue'
import TimesheetRow from '../../components/timesheetRow/TimesheetRow.vue'
import TimesheetDays from '../../components/timesheetDays/TimesheetDays.vue'

export default {
  components: {
    SelectBox,
    TimesheetRow,
    TimesheetDays,
    dxFormDatepickerInput: () =>
      import(
        'Customcontrols/dxInput/dxFormDatepickerInput/dxFormDatepickerInput'
      ),
    ShadowContent
  },
  data () {
    return {
      wbs: [
        {
          label: 'Tümü',
          value: 1
        },
        {
          label: 'Wbs1',
          value: 2
        },
        {
          label: 'Wbs2',
          value: 3
        }
      ],
      dateModel: '01.01.2021',
      currrentDate: CustomDateFormatter.dateFormat(new Date().toString()),
      timeType: [
        {
          label: 'Gün',
          value: 1
        },
        {
          label: 'Saat',
          value: 2
        }
      ],
      status: 'ready',
      days: [
        {
          time: '01.12.2021',
          day: '01',
          name: this.GetLabel(this, 'monday'),
          isWeekend: false
        },
        {
          time: '02.12.2021',
          day: '02',
          name: this.GetLabel(this, 'tuesday'),
          isWeekend: false
        },
        {
          time: '03.12.2021',
          day: '03',
          name: this.GetLabel(this, 'wednesday'),
          isWeekend: false
        },
        {
          time: '04.12.2021',
          day: '04',
          name: this.GetLabel(this, 'thursday'),
          isWeekend: false
        },
        {
          time: '05.12.2021',
          day: '05',
          name: this.GetLabel(this, 'friday'),
          isWeekend: false
        },
        {
          time: '06.12.2021',
          day: '06',
          name: this.GetLabel(this, 'saturday'),
          isWeekend: true
        },
        {
          time: '07.12.2021',
          day: '07',
          name: this.GetLabel(this, 'sunday'),
          isWeekend: true
        },

        {
          time: '08.12.2021',
          day: '08',
          name: this.GetLabel(this, 'monday'),
          isWeekend: false
        },
        {
          time: '09.12.2021',
          day: '09',
          name: this.GetLabel(this, 'tuesday'),
          isWeekend: false
        },
        {
          time: '10.12.2021',
          day: '10',
          name: this.GetLabel(this, 'wednesday'),
          isWeekend: false
        },
        {
          time: '11.12.2021',
          day: '11',
          name: this.GetLabel(this, 'thursday'),
          isWeekend: false
        },
        {
          time: '12.12.2021',
          day: '12',
          name: this.GetLabel(this, 'friday'),
          isWeekend: false
        },
        {
          time: '13.12.2021',
          day: '13',
          name: this.GetLabel(this, 'saturday'),
          isWeekend: true
        },
        {
          time: '04.12.2021',
          day: '04',
          name: this.GetLabel(this, 'sunday'),
          isWeekend: true
        }
      ],
      row1: [
        {
          total: 5,
          details: [
            { amount: 3, text: 'Genel Değerlendirme Toplantısı' },
            { amount: 2, text: 'Tasarım Toplantısı' }
          ]
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
          total: 5,
          details: [
            { amount: 3, text: 'Genel Değerlendirme Toplantısı' },
            { amount: 2, text: 'Tasarım Toplantısı' }
          ]
        },
        { total: 0, details: [] },
        { total: 0, details: [] },
        { total: 0, details: [] },
        { total: 0, details: [] },
        { total: 0, details: [], isWeekend: true },
        { total: 0, details: [], isWeekend: true },
        { total: 10 }
      ]
    }
  }
}
</script>
