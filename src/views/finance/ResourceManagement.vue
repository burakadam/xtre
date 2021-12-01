<template>
  <div>
    <div class="d-flex justify-space-between two-sides">
      <div class="two-sides__left">
        <router-link to="/finance/forecast" class="two-sides__btn">
          {{ this.GetLabel(this, 'forecast') }}
          <i class="fal fa-list-alt"></i>
        </router-link>
        <router-link to="/finance/resourceManagement" class="two-sides__btn">
          {{ this.GetLabel(this, 'resource_management') }}
          <i class="fal fa-users-class"></i>
        </router-link>
        <router-link to="/finance/invoiceMamanagement" class="two-sides__btn">
          {{ this.GetLabel(this, 'invoice_management') }}
          <i class="fal fa-file-invoice"></i>
        </router-link>
      </div>
      <div class="two-sides__right">
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
          <p class="fxs">{{ this.GetLabel(this, 'date') }}</p>
          <div class="d-flex">
            <SelectBox
              :items="days"
              itemText="name"
              itemVelue="id"
              isSmaller
              :selectedItemValue="1"
            />
            <SelectBox
              :items="years"
              itemText="name"
              itemVelue="id"
              isSmaller
              :selectedItemValue="1"
            />
          </div>
        </div>
      </div>
    </div>
    <ShadowContent class="full-m">
      <div class="table-div">
        <div
          class="fake-div"
          :style="`width:${1302 / this.headerRows.length}px`"
        >
          <div v-for="(item, idx) in this.fakeDiv">
            <p :key="idx">{{ item.value }}</p>
          </div>
        </div>

        <DxTableComponent
          :headers="headers"
          :showToolbar="true"
          :showSearch="false"
          :showFooter="true"
          :showCheckbox="false"
          :showRowAction="true"
          :isDeletable="false"
          :isAddButtonVisible="false"
          :items="this.data"
        >
        </DxTableComponent>
      </div>
    </ShadowContent>

    <div>
      <div class="d-flex justify-space-between two-side footer-button-box">
        <div class="two-sides__left">
          <v-btn outlined>
            {{ this.GetLabel(this, 'add_resource') }}
            <i class="fal fa-plus-circle"></i>
          </v-btn>
        </div>
        <div class="two-sides__right">
          <v-btn>
            {{ this.GetLabel(this, 'cancel') }}
          </v-btn>
          <v-btn>
            {{ this.GetLabel(this, 'save') }}
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SelectBox from '../../components/form/SelectBox'
import ShadowContent from '../../components/shadow-content/ShadowContent'
import rData from '../../constants/recourseHelper'
import CustomDateFormatter from '@/library/helpers/customdateformatter'

export default {
  components: {
    SelectBox,
    ShadowContent,
    dxFormTextInput: () =>
      import('Customcontrols/dxInput/dxFormTextInput/dxFormTextInput'),
    dxFormCheckboxInput: () =>
      import('Customcontrols/dxInput/dxFormCheckboxInput/dxFormCheckboxInput'),
    dxFormCombobox: () =>
      import('Customcontrols/dxInput/dxFormCombobox/dxFormCombobox'),
    DxTableComponent: () =>
      import('Customcontrols/dxTableComponent/dxTableComponent.vue'),
    dxFormDatepickerInput: () =>
      import(
        'Customcontrols/dxInput/dxFormDatepickerInput/dxFormDatepickerInput'
      ),
    dxFormButton: () =>
      import('Customcontrols/dxInput/dxFormButton/dxFormButton'),
    dxFormTextareaInput: () =>
      import('Customcontrols/dxInput/dxFormTextareaInput/dxFormTextareaInput')
  },
  computed: {
    headers () {
      return [
        {
          text: this.GetLabel(this, 'people'),
          align: 'start',
          value: 'people'
        },
        {
          text: this.GetLabel(this, 'resource_management_level'),
          value: 'level'
        },
        {
          text: this.GetLabel(this, 'payroll_report_lcr'),
          value: 'lcr'
        },
        {
          text: this.GetLabel(this, 'forecast_jun'),
          value: 'jun'
        },
        {
          text: this.GetLabel(this, 'forecast_jul'),
          value: 'jul'
        },
        {
          text: this.GetLabel(this, 'forecast_aug'),
          value: 'aug'
        },
        {
          text: this.GetLabel(this, 'forecast_sep'),
          value: 'sep'
        },
        {
          text: this.GetLabel(this, 'forecast_oct'),
          value: 'oct'
        },
        {
          text: this.GetLabel(this, 'forecast_nov'),
          value: 'nov'
        },
        {
          text: this.GetLabel(this, 'forecast_dec'),
          value: 'dec'
        },
        {
          text: this.GetLabel(this, 'forecast_jan'),
          value: 'jan'
        },
        {
          text: this.GetLabel(this, 'forecast_feb'),
          value: 'feb'
        },
        {
          text: this.GetLabel(this, 'forecast_apr'),
          value: 'apr'
        },
        {
          text: this.GetLabel(this, 'forecast_may'),
          value: 'may'
        }
      ]
    }
  },
  data () {
    return {
      currrentDate: CustomDateFormatter.dateFormat(new Date().toString()),
      headerRows: [],
      fakeDiv: [],
      data: rData,
      dataRows: [[], [], [], [], [], [], [], [], [], [], [], [], []],

      timeType: [
        {
          label: 'Saat',
          value: 1
        },
        {
          label: 'Gün',
          value: 2
        }
      ],
      days: [
        {
          label: '1',
          value: 1
        },
        {
          label: '2',
          value: 12
        }
      ],
      years: [
        {
          label: '2021',
          value: 1
        },
        {
          name: '2020',
          value: 12
        }
      ],
      invoiceModel: {
        InvoiceTimePeriod: '-1',
        InvoiceNumber: '',
        Draft: true,
        Amount: '17.99',
        Currency: '-1',
        AmountWithTax: '',
        InvoiceTaxRate: '-1',
        WBS: '',
        CurrencyAmount: '',
        PaymentType: '-1',
        InvoiceDate: '29.06.2021',
        PaymentDate: '29.06.2021',
        InvoiceDate: '29.06.2021',
        InvoiceTo: '',
        Prepayment: '-1',
        Description: '',
        InvoiceHeader: '',
        vatRate: '',
        proformaDate: '',
        abouth: '',
        title: '',
        vatAmount: ''
      }
    }
  },
  created () {
    this.GetInvoiceData()
  },
  methods: {
    GetInvoiceData: function (eventParams) {
      const response = iData

      this.headerRows.push({
        text: this.GetLabel(this, 'forecast_category'),
        textOrigin: '',
        divStyle: '',
        pStyle: '',
        class: 'table-header'
      })
    }
  }
}
</script>
