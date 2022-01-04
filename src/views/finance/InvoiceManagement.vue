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
          <p class="fxs">{{ this.GetLabel(this, 'forecast_currency') }}</p>
          <SelectBox
            :items="moneyType"
            itemText="name"
            itemVelue="id"
            isSmaller
            :selectedItemValue="1"
          />
        </div>
        <div class="two-sides__right__item">
          <p class="fxs">{{ this.GetLabel(this, 'ode_period') }}</p>
          <SelectBox
            :items="paymentType"
            itemText="name"
            itemVelue="id"
            class="w-98"
            isSmaller
            :selectedItemValue="1"
          />
        </div>
        <div class="two-sides__right__item">
          <h4 class="fxs">{{ this.GetLabel(this, 'date') }}</h4>
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
    <ShadowContent class="mt-35">
      <v-form ref="form" class="d-flex x-form">
        <div class="w-33p">
          <div class="form-box">
            <p>
              {{
                this.GetLabel(
                  this,
                  'invoice_management_table_column_invoice_no'
                )
              }}
            </p>
            <dxFormTextInput
              class="flex-grow-1"
              id="invoice_no"
              ref="invoiceNoComponentRef"
              v-model="invoiceModel.InvoiceNumber"
              placeholder="invoice_management_table_column_invoice_no"
              :disabled="true"
              :clear="true"
              type="text"
              :hasBorder="true"
            />
            <v-checkbox
              v-model="checkbox"
              :label="this.GetLabel(this, 'draft')"
            ></v-checkbox>
          </div>
          <div class="form-box">
            <p>
              {{ this.GetLabel(this, 'user_management_wbs') }}
            </p>
            <dxFormTextInput
              class="flex-grow-1"
              :name="'wbs'"
              :id="'wbs'"
              :items="wbsList"
              placeholder="user_management_wbs"
              v-model="invoiceModel.WBS"
              :selectedValue="invoiceModel.WBS"
              ref="wbsComponentRef"
            />
          </div>
          <div class="form-box mrb-14">
            <p>
              {{
                this.GetLabel(
                  this,
                  'invoice_management_table_column_invoice_type'
                )
              }}
            </p>
            <SelectBox
              :items="moneyType"
              itemText="name"
              itemVelue="id"
              class="w-52p"
              :isError="true"
              errorText="Error text example"
              :defaultValue="{
                name: 'TRY',
                id: 1
              }"
            />
          </div>
          <div class="form-box">
            <p>
              {{
                this.GetLabel(
                  this,
                  'invoice_management_table_column_invoice_amount'
                )
              }}
            </p>
            <dxFormTextInput
              id="invoice_no"
              class="w-32p"
              ref="invoiceNoComponentRef"
              v-model="invoiceModel.Amount"
              placeholder="invoice_management_table_column_invoice_amount"
              :clear="true"
              type="text"
              :hasBorder="true"
            />
            <SelectBox
              class="w-18p mrl-2p"
              :items="moneyType"
              itemText="name"
              itemVelue="id"
              :defaultValue="{
                name: 'TRY',
                id: 1
              }"
            />
          </div>
          <div class="form-box">
            <p>
              {{ this.GetLabel(this, 'masraf_report_vat_rate') }}
            </p>
            <dxFormTextInput
              id="invoice_no"
              class="w-32p"
              ref="invoiceNoComponentRef"
              v-model="invoiceModel.vatRate"
              placeholder="masraf_report_vat_rate"
              :clear="true"
              type="text"
              :hasBorder="true"
            />
          </div>
          <div class="form-box">
            <p>
              {{ this.GetLabel(this, 'payment_invoice_kdv_amount') }}
            </p>
            <dxFormTextInput
              id="invoice_no"
              class="w-32p"
              ref="invoiceNoComponentRef"
              v-model="invoiceModel.vatAmount"
              placeholder="payment_invoice_kdv_amount"
              :clear="true"
              type="text"
              :hasBorder="true"
              :disabled="true"
            />
          </div>
        </div>
        <div class="w-33p">
          <div class="form-box">
            <p>
              {{ this.GetLabel(this, 'invoice_management_proforma_date') }}
            </p>
            <dxFormDatepickerInput
              v-model="invoiceModel.PaymentDate"
              ref="paymentDateComponentRef"
              :clear="true"
              class="input-box"
              :placeholder="'invoice_management_new_invoice_payment_date'"
              :defaultValue="this.currrentDate"
            />
            <v-checkbox
              v-model="checkbox"
              :label="this.GetLabel(this, 'draft')"
            ></v-checkbox>
          </div>
          <div class="form-box mrb-14">
            <p>
              {{ this.GetLabel(this, 'payment_invoice_date') }}
            </p>
            <dxFormDatepickerInput
              v-model="invoiceModel.InvoiceDate"
              ref="paymentDateComponentRef"
              :clear="true"
              class="input-box"
              :placeholder="'payment_invoice_date'"
              :defaultValue="this.currrentDate"
            />
          </div>
          <div class="form-box mrb-14">
            <p>
              {{
                this.GetLabel(
                  this,
                  'invoice_management_new_invoice_payment_date'
                )
              }}
            </p>
            <dxFormDatepickerInput
              v-model="invoiceModel.PaymentDate"
              ref="paymentDateComponentRef"
              :clear="true"
              class="input-box"
              :placeholder="'payment_invoice_date'"
              :defaultValue="this.currrentDate"
            />
          </div>
          <div class="form-box">
            <p>
              {{ this.GetLabel(this, 'abouth') }}
            </p>
            <dxFormTextInput
              class="flex-grow-1"
              id="invoice_no"
              ref="invoiceNoComponentRef"
              v-model="invoiceModel.abouth"
              placeholder="abouth"
              :disabled="false"
              :clear="true"
              type="text"
              :hasBorder="true"
            />
          </div>
          <div class="form-box">
            <p>
              {{ this.GetLabel(this, 'title') }}
            </p>
            <dxFormTextInput
              class="flex-grow-1"
              id="invoice_no"
              ref="invoiceNoComponentRef"
              v-model="invoiceModel.title"
              placeholder="title"
              :disabled="false"
              :clear="true"
              type="text"
              :hasBorder="true"
            />
          </div>
          <div class="form-box mrb-14">
            <p>
              {{ this.GetLabel(this, 'payment_invoice_prepayment') }}
            </p>
            <SelectBox
              :items="moneyType"
              itemText="name"
              itemVelue="id"
              class="w-52p"
              :defaultValue="{
                name: 'TRY',
                id: 1
              }"
            />
          </div>
        </div>
        <div class="w-33p">
          <div class="form-box column">
            <p>
              {{ this.GetLabel(this, 'invoice_management_new_invoice_desc') }}
            </p>
            <dxFormTextareaInput
              v-model="invoiceModel.Description"
              :value="invoiceModel.Description"
              placeholder="invoice_management_new_invoice_desc"
              ref="invoiceDescRef"
              id="invoice_desc"
              :clear="true"
            />
          </div>
        </div>
      </v-form>
    </ShadowContent>
    <div>
      <div class="d-flex justify-space-between two-side footer-button-box">
        <div class="two-sides__left">
          <v-btn outlined>
            {{ this.GetLabel(this, 'invoice_management_new_invoice') }}
            <i class="fal fa-plus-circle"></i>
          </v-btn>
        </div>
        <div class="two-sides__right">
          <v-btn>
            {{
              this.GetLabel(
                this,
                'button_project_management_project_clear_form'
              )
            }}
          </v-btn>
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
import iData from '../../constants/invoiceHelper'
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
          text: this.GetLabel(
            this,
            'invoice_management_table_column_invoice_no'
          ),
          align: 'start',
          value: 'InvoiceNumber'
        },
        {
          text: this.GetLabel(
            this,
            'invoice_management_table_column_invoice_date'
          ),
          value: 'InvoiceDate'
        },
        {
          text: this.GetLabel(
            this,
            'invoice_management_table_column_invoice_amount'
          ),
          value: 'Amount'
        },
        {
          text: this.GetLabel(
            this,
            'invoice_management_table_column_invoice_kdv_amount'
          ),
          value: 'AmountWithTax'
        },
        {
          text: this.GetLabel(
            this,
            'invoice_management_table_column_invoice_kdv_rate'
          ),
          value: 'InvoiceTaxRate'
        },
        {
          text: this.GetLabel(
            this,
            'invoice_management_table_column_invoice_currency'
          ),
          value: 'Currency'
        },
        {
          text: this.GetLabel(
            this,
            'invoice_management_table_column_invoice_estimated_payment_date'
          ),
          value: 'PossiblePaymentDate'
        },
        {
          text: this.GetLabel(
            this,
            'invoice_management_table_column_invoice_actual_payment_date'
          ),
          value: 'ActualPaymentDate'
        },
        {
          text: this.GetLabel(
            this,
            'invoice_management_table_column_invoice_status'
          ),
          value: 'Status'
        },
        {
          text: this.GetLabel(
            this,
            'invoice_management_table_column_invoice_type'
          ),
          value: 'PaymentType'
        },
        {
          text: this.GetLabel(
            this,
            'invoice_management_table_column_invoice_payment_id'
          ),
          value: 'AdvancedPaymentInvoiceId'
        }
      ]
    }
  },
  data () {
    return {
      currrentDate: CustomDateFormatter.dateFormat(new Date().toString()),
      headerRows: [],
      fakeDiv: [],
      data: iData,
      dataRows: [[], [], [], [], [], [], [], [], [], [], [], [], []],
      moneyType: [
        {
          name: 'TRY',
          id: 1
        },
        {
          name: 'USD',
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
