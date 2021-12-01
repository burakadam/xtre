<template>
  <div>
    <div class="d-flex justify-space-between two-sides">
      <div class="two-sides__right">
        <div class="two-sides__right__item">
          <h4 class="fxs">{{ this.GetLabel(this, 'sort') }}</h4>
          <SelectBox
            :items="sortType"
            class="w-173"
            itemText="name"
            itemVelue="id"
            :defaultValue="{
              name: 'Yeniden eskiye',
              id: 1
            }"
          />
        </div>
      </div>
    </div>
    <ShadowContent class="full-m">
      <div class="table-div no-wrap">
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
          itemsPerPage="16"
        >
        </DxTableComponent>
      </div>
    </ShadowContent>
  </div>
</template>
<script>
import SelectBox from '../../components/form/SelectBox'
import ShadowContent from '../../components/shadow-content/ShadowContent'
import nData from '../../constants/notificationHelper'
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
          text: this.GetLabel(this, 'customer'),
          align: 'start',
          value: 'customer'
        },
        {
          text: this.GetLabel(this, 'project_management_table_column_project'),
          value: 'project'
        },
        {
          text: this.GetLabel(this, 'forecast'),
          value: 'forecast'
        },
        {
          text: this.GetLabel(this, 'related_person'),
          value: 'related_person'
        },
        {
          text: this.GetLabel(this, 'date'),
          value: 'date'
        },

        {
          text: this.GetLabel(this, 'info'),
          value: 'info'
        },
        {
          text: '',
          value: 'actions'
        }
      ]
    }
  },
  data () {
    return {
      currrentDate: CustomDateFormatter.dateFormat(new Date().toString()),
      headerRows: [],
      fakeDiv: [],
      data: nData,
      dataRows: [[], [], [], [], [], [], [], [], [], [], [], [], []],
      sortType: [
        {
          name: 'Yeniden eskiye',
          id: 1
        },
        {
          name: 'Eskiden Yeniye',
          id: 2
        }
      ],
      paymentType: [
        {
          name: 'Genel',
          id: 1
        },
        {
          name: 'Genel 2',
          id: 2
        }
      ],
      days: [
        {
          name: '1',
          id: 1
        },
        {
          name: '2',
          id: 12
        }
      ],
      years: [
        {
          name: '2021',
          id: 1
        },
        {
          name: '2020',
          id: 12
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
        vatAmount: '',
        search: ''
      }
    }
  },
  created () {
    this.GetInvoiceData()
  },
  methods: {
    GetInvoiceData: function (eventParams) {
      const response = aData

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
