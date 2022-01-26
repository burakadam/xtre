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
            class="w-61"
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
          <v-btn outlined icon>
            <i class="fas fa-chevron-left"></i>
          </v-btn>
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
          <v-btn outlined icon>
            <i class="fas fa-chevron-right"></i>
          </v-btn>

        </div>
      </div>
    </div>
    <ShadowContent class="full-m">
      <div class="table-div">
        <div
          class="fake-div small"
          :style="`width:${1302 / this.headerRows.length}px`"
        >
          <div v-for="(item, idx) in this.fakeDiv">
            <p :key="idx">{{ item.value }}</p>
          </div>
        </div>

        <div class="table-div__container">
          <dxGrid
            :columnCount="18"
            :rowCount="13"
            ref="gridComponentRef"
            :headerRows="headerRows"
            :dataRows="dataRows"
            @CellInputKeyEvent="ChangeForecastData"
          />
        </div>
      </div>
    </ShadowContent>
    <div>
      <div class="d-flex justify-space-between two-side footer-button-box">
        <div class="two-sides__left">
          <v-btn outlined>
            {{ this.GetLabel(this, 'forecast_create_new') }}
            <i class="fal fa-plus-circle"></i>
          </v-btn>
          <v-btn outlined>
            {{ this.GetLabel(this, 'forecast_copy') }}
            <i class="fal fa-clone"></i>
          </v-btn>
          <v-btn outlined>
            {{ this.GetLabel(this, 'forecast_edit') }}
            <i class="fal fa-edit"></i>
          </v-btn>
          <v-btn outlined>
            {{ this.GetLabel(this, 'forecast_export') }}
            <i class="fal fa-file-pdf"></i>
          </v-btn>
          <v-btn outlined>
            {{ this.GetLabel(this, 'forecast_upload') }}
            <i class="fal fa-file-spreadsheet"></i>
          </v-btn>
        </div>
        <div class="two-sides__right">
          <v-btn>
            {{ this.GetLabel(this, 'save') }}
          </v-btn>
          <v-btn>
            {{ this.GetLabel(this, 'forecast_approval') }}
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Forecasthelper from '@/library/helpers/forecasthelper'
import ForecastService from '@/services/ForecastService'
import constants from '@/library/constants/constants'
import fData from '../../constants/forecastHelper'
import SelectBox from '../../components/form/SelectBox.vue'
import ShadowContent from '../../components/shadow-content/ShadowContent.vue'

export default {
  name: 'Forecast',
  data () {
    return {
      forecastList: [],
      odeList: [],
      selectedForecast: 0,
      selectedOde: 0,
      forecastDate: null,
      headerRows: [],
      fakeDiv: [],
      dataRows: [[], [], [], [], [], [], [], [], [], [], [], [], []],
      foreCastOperationStatus: { Update: 1, Create: 2 },
      forecastFieldRequestType: [
        { type: 'Billings', value: 1 },
        { type: 'Revenues', value: 2 },
        { type: 'Collections', value: 3 },
        { type: 'Expense', value: 4 },
        { type: 'Other', value: 5 },
        { type: 'Solution Cont.', value: 6 },
        { type: 'Capital Charge', value: 7 },
        { type: 'Chargeable Expenses', value: 8 },
        { type: 'Payroll', value: 9 },
        { type: 'CCI', value: 10 },
        { type: 'CCI %', value: 11 },
        { type: 'Total Cost', value: 12 }
      ],
      etcIndex: 0,
      eacIndex: 0,
      actualIndex: 0,
      deltaIndex: 0,
      odeIndex: 0,
      totalCostIndex: 0,
      revenueIndex: 0,
      cciIndex: 0,
      cciPercentIndex: 0,
      moneyType: [
        {
          label: 'TRY',
          value: 1
        },
        {
          label: 'USD',
          value: 2
        }
      ],
      paymentType: [
        {
          label: 'Genel',
          value: 1
        },
        {
          label: 'Genel 2',
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
          label: '2020',
          value: 12
        }
      ]
    }
  },
  components: {
    SelectBox,
    ShadowContent,
    dxFormDatepickerInput: () =>
      import(
        'Customcontrols/dxInput/dxFormDatepickerInput/dxFormDatepickerInput'
      ),
    dxFormCombobox: () =>
      import('Customcontrols/dxInput/dxFormCombobox/dxFormCombobox'),
    dxFormButton: () =>
      import('Customcontrols/dxInput/dxFormButton/dxFormButton'),
    dxGrid: () => import('Customcontrols/dxGrid/dxGrid')
  },
  created () {
    this.GetForecastData()
  },
  methods: {
    ChangeForecastData: function (eventParams) {
      // ------------- Changed EAC of Row --------------
      this.ChangeEACOperation(eventParams)
      // ------------- Changed Delta of Row --------------
      this.ChangeDeltaOperation(eventParams)
      // ------------- Changed CCI of Row --------------
      if (eventParams.RowText === 'Revenues') {
        this.ChangeCCIOperation(eventParams)
      }
      // ------------- Changed Total Cost of Column --------------
      this.ChangeTotalCostOperation(eventParams)
      // ------------- Changed oldValue of Cell --------------
      this.dataRows[eventParams.Row][eventParams.Column].oldValue =
        this.dataRows[eventParams.Row][eventParams.Column].value
      this.dataRows[eventParams.Row][eventParams.Column].isChanged = true
    },
    GetForecastData: function () {
      const response = fData

      /* ------------ Headers Settlements --------------- */
      this.headerRows.push({
        text: this.GetLabel(this, 'forecast_category'),
        textOrigin: '',
        divStyle: '',
        pStyle: '',
        class: 'table-header'
      })
      this.fakeDiv.push({
        value: this.GetLabel(this, 'forecast_category'),
        textOrigin: '',
        divStyle: '',
        pStyle: '',
        class: 'table-header'
      })
      response.TimePeriodHead.forEach((element) => {
        this.headerRows.push({
          text: Forecasthelper.ConvertIntToMonthDotYear(this, element),
          textOrigin: element,
          divStyle: '',
          pStyle: '',
          class: 'table-header'
        })
      })
      this.headerRows.push({
        text: this.GetLabel(this, 'forecast_actual'),
        textOrigin: '',
        divStyle: '',
        pStyle: '',
        class: 'table-header'
      })
      this.headerRows.push({
        text: this.GetLabel(this, 'forecast_etc'),
        textOrigin: '',
        divStyle: '',
        pStyle: '',
        class: 'table-header'
      })
      this.headerRows.push({
        text: this.GetLabel(this, 'forecast_eac'),
        textOrigin: '',
        divStyle: '',
        pStyle: '',
        class: 'table-header'
      })
      this.headerRows.push({
        text: this.GetLabel(this, 'forecast_ode'),
        textOrigin: '',
        divStyle: '',
        pStyle: '',
        class: 'table-header'
      })
      this.headerRows.push({
        text: this.GetLabel(this, 'forecast_delta'),
        textOrigin: '',
        divStyle: '',
        pStyle: '',
        class: 'table-header'
      })

      Forecasthelper.isMoneyWithComma = false

      /* ------------ Billings Settlements --------------- */
      this.dataRows[0].push({
        value: 'Billings',
        oldValue: '',
        type: 'link',
        isEditable: true,
        isChanged: false,
        divStyle: '',
        class: 'table-first color',
        pStyle: ''
      })
      this.fakeDiv.push({
        value: 'Billings',
        oldValue: '',
        type: 'link',
        isEditable: true,
        isChanged: false,
        divStyle: '',
        class: 'table-first color',
        pStyle: ''
      })
      response.Billings.sort(function (a, b) {
        return a.ElementIndex - b.ElementIndex
      })
      response.Billings.forEach((element, index) => {
        index > 11
          ? this.dataRows[0].push({
            value: Forecasthelper.GetValueofField(element),
            isChanged: false,
            oldValue: Forecasthelper.GetValueofField(element),
            type: Forecasthelper.GetTypeofField(element),
            isEditable: element.IsEditable,
            format: '',
            divStyle: '',
            class: 'color',
            pStyle: ''
          })
          : this.dataRows[0].push({
            value: Forecasthelper.GetValueofField(element),
            isChanged: false,
            oldValue: Forecasthelper.GetValueofField(element),
            type: Forecasthelper.GetTypeofField(element),
            isEditable: element.IsEditable,
            format: '',
            divStyle: '',
            class: 'color',
            pStyle: ''
          })
      })

      /* ------------ Chargeable Expenses Settlements --------------- */
      this.dataRows[1].push({
        value: 'Chargeable Expenses',
        oldValue: '',
        type: 'link',
        isEditable: true,
        isChanged: false,
        divStyle: '',
        class: 'table-first',
        pStyle: ''
      })
      this.fakeDiv.push({
        value: 'Chargeable Expenses',
        oldValue: '',
        type: 'link',
        isEditable: true,
        isChanged: false,
        divStyle: '',
        class: 'table-first',
        pStyle: ''
      })
      response.ChargeableExpense.sort(function (a, b) {
        return a.ElementIndex - b.ElementIndex
      })
      response.ChargeableExpense.forEach((element, index) => {
        index > 11
          ? this.dataRows[1].push({
            value: Forecasthelper.GetValueofField(element),
            isChanged: false,
            oldValue: Forecasthelper.GetValueofField(element),
            type: Forecasthelper.GetTypeofField(element),
            isEditable: element.IsEditable,
            format: '',
            divStyle: '',

            pStyle: ''
          })
          : this.dataRows[1].push({
            value: Forecasthelper.GetValueofField(element),
            isChanged: false,
            oldValue: Forecasthelper.GetValueofField(element),
            type: Forecasthelper.GetTypeofField(element),
            isEditable: element.IsEditable,
            format: '',
            divStyle: '',
            pStyle: ''
          })
      })

      /* ------------ Revenues Settlements --------------- */
      this.dataRows[2].push({
        value: 'Revenues',
        oldValue: '',
        type: 'link',
        isEditable: true,
        isChanged: false,
        divStyle: '',
        class: 'table-first color',
        pStyle: ''
      })
      this.fakeDiv.push({
        value: 'Revenues',
        oldValue: '',
        type: 'link',
        isEditable: true,
        isChanged: false,
        divStyle: '',
        class: 'table-first color',
        pStyle: ''
      })
      response.Revenues.sort(function (a, b) {
        return a.ElementIndex - b.ElementIndex
      })
      response.Revenues.forEach((element, index) => {
        index > 11
          ? this.dataRows[2].push({
            value: Forecasthelper.GetValueofField(element),
            isChanged: false,
            oldValue: Forecasthelper.GetValueofField(element),
            type: Forecasthelper.GetTypeofField(element),
            isEditable: element.IsEditable,
            format: '',
            divStyle: '',
            class: 'color',
            pStyle: ''
          })
          : this.dataRows[2].push({
            value: Forecasthelper.GetValueofField(element),
            isChanged: false,
            oldValue: Forecasthelper.GetValueofField(element),
            type: Forecasthelper.GetTypeofField(element),
            isEditable: element.IsEditable,
            format: '',
            divStyle: '',
            class: 'color',
            pStyle: ''
          })
      })

      /* ------------ Collections Settlements --------------- */
      this.dataRows[3].push({
        value: 'Collections',
        oldValue: '',
        type: 'link',
        isEditable: true,
        isChanged: false,
        divStyle: '',
        class: 'table-first',
        pStyle: ''
      })
      this.fakeDiv.push({
        value: 'Collections',
        oldValue: '',
        type: 'link',
        isEditable: true,
        isChanged: false,
        divStyle: '',
        class: 'table-first',
        pStyle: ''
      })
      response.Collections.sort(function (a, b) {
        return a.ElementIndex - b.ElementIndex
      })
      response.Collections.forEach((element, index) => {
        index > 11
          ? this.dataRows[3].push({
            value: Forecasthelper.GetValueofField(element),
            isChanged: false,
            oldValue: Forecasthelper.GetValueofField(element),
            type: Forecasthelper.GetTypeofField(element),
            isEditable: element.IsEditable,
            format: '',
            divStyle: '',
            pStyle: ''
          })
          : this.dataRows[3].push({
            value: Forecasthelper.GetValueofField(element),
            isChanged: false,
            oldValue: Forecasthelper.GetValueofField(element),
            type: Forecasthelper.GetTypeofField(element),
            isEditable: element.IsEditable,
            format: '',
            divStyle: '',
            pStyle: ''
          })
      })

      /* ------------ Costs Settlements --------------- */
      this.dataRows[4].push({
        value: 'Costs',
        oldValue: '',
        type: 'link',
        isEditable: true,
        isChanged: false,
        divStyle: '',
        class: 'table-first color',
        pStyle: '; '
      })
      this.fakeDiv.push({
        value: 'Costs',
        oldValue: '',
        type: 'link',
        isEditable: true,
        isChanged: false,
        divStyle: '',
        class: 'table-first color',
        pStyle: '; '
      })
      for (let i = 0; i < 17; i++) {
        this.dataRows[4].push({
          value: '',
          oldValue: '',
          isChanged: false,
          type: constants.GridFieldTypes.Label,
          isEditable: false,
          divStyle: '',
          class: 'color',
          pStyle: ''
        })
      }

      /* ------------ Payroll Settlements --------------- */
      this.dataRows[5].push({
        value: 'Payroll',
        oldValue: '',
        type: 'link',
        isEditable: true,
        isChanged: false,
        divStyle: '',
        class: 'table-first',
        pStyle: ''
      })
      this.fakeDiv.push({
        value: 'Payroll',
        oldValue: '',
        type: 'link',
        isEditable: true,
        isChanged: false,
        divStyle: '',
        class: 'table-first',
        pStyle: ''
      })
      response.Payroll.sort(function (a, b) {
        return a.ElementIndex - b.ElementIndex
      })
      response.Payroll.forEach((element, index) => {
        index > 11
          ? this.dataRows[5].push({
            value: Forecasthelper.GetValueofField(element),
            isChanged: false,
            oldValue: Forecasthelper.GetValueofField(element),
            type: Forecasthelper.GetTypeofField(element),
            isEditable: element.IsEditable,
            format: '',
            divStyle: '',
            pStyle: ''
          })
          : this.dataRows[5].push({
            value: Forecasthelper.GetValueofField(element),
            isChanged: false,
            oldValue: Forecasthelper.GetValueofField(element),
            type: Forecasthelper.GetTypeofField(element),
            isEditable: element.IsEditable,
            format: '',
            divStyle: '',
            pStyle: ''
          })
      })

      /* ------------ Expense Settlements --------------- */
      this.dataRows[6].push({
        value: 'Expense',
        oldValue: '',
        type: 'link',
        isEditable: true,
        isChanged: false,
        divStyle: '',
        class: 'table-first color',
        pStyle: ''
      })
      this.fakeDiv.push({
        value: 'Expense',
        oldValue: '',
        type: 'link',
        isEditable: true,
        isChanged: false,
        divStyle: '',
        class: 'table-first color',
        pStyle: ''
      })
      response.Expense.sort(function (a, b) {
        return a.ElementIndex - b.ElementIndex
      })
      response.Expense.forEach((element, index) => {
        index > 11
          ? this.dataRows[6].push({
            value: Forecasthelper.GetValueofField(element),
            isChanged: false,
            oldValue: Forecasthelper.GetValueofField(element),
            type: Forecasthelper.GetTypeofField(element),
            isEditable: element.IsEditable,
            format: '',
            divStyle: '',
            class: 'color',
            pStyle: ''
          })
          : this.dataRows[6].push({
            value: Forecasthelper.GetValueofField(element),
            isChanged: false,
            oldValue: Forecasthelper.GetValueofField(element),
            type: Forecasthelper.GetTypeofField(element),
            isEditable: element.IsEditable,
            format: '',
            divStyle: '',
            class: 'color',
            pStyle: ''
          })
      })

      /* ------------ Other Settlements --------------- */
      this.dataRows[7].push({
        value: 'Other',
        oldValue: '',
        type: 'link',
        isEditable: true,
        isChanged: false,
        divStyle: '',
        class: 'table-first',
        pStyle: ''
      })
      this.fakeDiv.push({
        value: 'Other',
        oldValue: '',
        type: 'link',
        isEditable: true,
        isChanged: false,
        divStyle: '',
        class: 'table-first',
        pStyle: ''
      })
      response.Other.sort(function (a, b) {
        return a.ElementIndex - b.ElementIndex
      })
      response.Other.forEach((element, index) => {
        index > 11
          ? this.dataRows[7].push({
            value: Forecasthelper.GetValueofField(element),
            isChanged: false,
            oldValue: Forecasthelper.GetValueofField(element),
            type: Forecasthelper.GetTypeofField(element),
            isEditable: element.IsEditable,
            format: '',
            divStyle: '',
            pStyle: ''
          })
          : this.dataRows[7].push({
            value: Forecasthelper.GetValueofField(element),
            isChanged: false,
            oldValue: Forecasthelper.GetValueofField(element),
            type: Forecasthelper.GetTypeofField(element),
            isEditable: element.IsEditable,
            format: '',
            divStyle: '',
            pStyle: ''
          })
      })

      /* ------------ Solution Cont. Settlements --------------- */
      this.dataRows[8].push({
        value: 'Solution Cont.',
        oldValue: '',
        type: 'link',
        isEditable: true,
        isChanged: false,
        divStyle: '',
        class: 'table-first color',
        pStyle: ''
      })
      this.fakeDiv.push({
        value: 'Solution Cont.',
        oldValue: '',
        type: 'link',
        isEditable: true,
        isChanged: false,
        divStyle: '',
        class: 'table-first color',
        pStyle: ''
      })
      response.SolutionCont.sort(function (a, b) {
        return a.ElementIndex - b.ElementIndex
      })
      response.SolutionCont.forEach((element, index) => {
        index > 11
          ? this.dataRows[8].push({
            value: Forecasthelper.GetValueofField(element),
            isChanged: false,
            oldValue: Forecasthelper.GetValueofField(element),
            type: Forecasthelper.GetTypeofField(element),
            isEditable: element.IsEditable,
            format: '',
            divStyle: '',
            class: 'color',
            pStyle: ''
          })
          : this.dataRows[8].push({
            value: Forecasthelper.GetValueofField(element),
            isChanged: false,
            oldValue: Forecasthelper.GetValueofField(element),
            type: Forecasthelper.GetTypeofField(element),
            isEditable: element.IsEditable,
            format: '',
            divStyle: '',
            class: 'color',
            pStyle: ''
          })
      })

      /* ------------ Capital Charge Settlements --------------- */
      this.dataRows[9].push({
        value: 'Capital Charge',
        oldValue: '',
        type: 'link',
        isEditable: true,
        isChanged: false,
        divStyle: '',
        class: 'table-first',
        pStyle: ''
      })
      this.fakeDiv.push({
        value: 'Capital Charge',
        oldValue: '',
        type: 'link',
        isEditable: true,
        isChanged: false,
        divStyle: '',
        class: 'table-first',
        pStyle: ''
      })
      response.CapitalCharge.sort(function (a, b) {
        return a.ElementIndex - b.ElementIndex
      })
      response.CapitalCharge.forEach((element, index) => {
        index > 11
          ? this.dataRows[9].push({
            value: Forecasthelper.GetValueofField(element),
            isChanged: false,
            oldValue: Forecasthelper.GetValueofField(element),
            type: Forecasthelper.GetTypeofField(element),
            isEditable: element.IsEditable,
            format: '',
            divStyle: '',
            pStyle: ''
          })
          : this.dataRows[9].push({
            value: Forecasthelper.GetValueofField(element),
            isChanged: false,
            oldValue: Forecasthelper.GetValueofField(element),
            type: Forecasthelper.GetTypeofField(element),
            isEditable: element.IsEditable,
            format: '',
            divStyle: '',
            pStyle: ''
          })
      })

      /* ------------ TotalCost Settlements --------------- */
      this.dataRows[10].push({
        value: 'Total Cost',
        oldValue: '',
        type: 'link',
        isEditable: true,
        isChanged: false,
        divStyle: '',
        class: 'table-first color',
        pStyle: '; '
      })
      this.fakeDiv.push({
        value: 'Total Cost',
        oldValue: '',
        type: 'link',
        isEditable: true,
        isChanged: false,
        divStyle: '',
        class: 'table-first color',
        pStyle: '; '
      })
      response.TotalCost.sort(function (a, b) {
        return a.ElementIndex - b.ElementIndex
      })
      response.TotalCost.forEach((element, index) => {
        this.dataRows[10].push({
          value: Forecasthelper.GetValueofField(element),
          isChanged: false,
          oldValue: Forecasthelper.GetValueofField(element),
          type: Forecasthelper.GetTypeofField(element),
          isEditable: element.IsEditable,
          format: '',
          divStyle: '',
          class: 'color',
          pStyle: ''
        })
      })

      /* ------------ CCI Settlements --------------- */
      this.dataRows[11].push({
        value: 'CCI',
        oldValue: '',
        type: 'link',
        isEditable: true,
        isChanged: false,
        divStyle: '',
        class: 'table-first',
        pStyle: ''
      })
      this.fakeDiv.push({
        value: 'CCI',
        oldValue: '',
        type: 'link',
        isEditable: true,
        isChanged: false,
        divStyle: '',
        class: 'table-first',
        pStyle: ''
      })
      response.CCI.sort(function (a, b) {
        return a.ElementIndex - b.ElementIndex
      })
      response.CCI.forEach((element, index) => {
        index > 11
          ? this.dataRows[11].push({
            value: Forecasthelper.GetValueofField(element),
            isChanged: false,
            oldValue: Forecasthelper.GetValueofField(element),
            type: Forecasthelper.GetTypeofField(element),
            isEditable: element.IsEditable,
            format: '',
            divStyle: '',
            pStyle: ''
          })
          : this.dataRows[11].push({
            value: Forecasthelper.GetValueofField(element),
            isChanged: false,
            oldValue: Forecasthelper.GetValueofField(element),
            type: Forecasthelper.GetTypeofField(element),
            isEditable: element.IsEditable,
            format: '',
            divStyle: '',
            pStyle: ''
          })
      })

      /* ------------ CCI Percent Settlements --------------- */
      this.dataRows[12].push({
        value: 'CCI %',
        oldValue: '',
        type: 'link',
        isEditable: true,
        isChanged: false,
        divStyle: '',
        class: 'table-first color',
        pStyle: ''
      })
      this.fakeDiv.push({
        value: 'CCI %',
        oldValue: '',
        type: 'link',
        isEditable: true,
        isChanged: false,
        divStyle: '',
        class: 'table-first color',
        pStyle: ''
      })
      response.CCIPercent.sort(function (a, b) {
        return a.ElementIndex - b.ElementIndex
      })
      response.CCIPercent.forEach((element, index) => {
        index > 11
          ? this.dataRows[12].push({
            value: Forecasthelper.GetValueofField(element),
            isChanged: false,
            oldValue: Forecasthelper.GetValueofField(element),
            type: Forecasthelper.GetTypeofField(element),
            isEditable: element.IsEditable,
            format: '',
            divStyle: '',
            class: 'color',
            pStyle: ''
          })
          : this.dataRows[12].push({
            value: Forecasthelper.GetValueofField(element),
            isChanged: false,
            oldValue: Forecasthelper.GetValueofField(element),
            type: Forecasthelper.GetTypeofField(element),
            isEditable: element.IsEditable,
            format: '',
            divStyle: '',
            class: 'color',
            pStyle: ''
          })
      })

      this.eacIndex = this.headerRows.findIndex(
        (x) => x.text === this.GetLabel(this, 'forecast_eac')
      )
      this.etcIndex = this.headerRows.findIndex(
        (x) => x.text === this.GetLabel(this, 'forecast_etc')
      )
      this.actualIndex = this.headerRows.findIndex(
        (x) => x.text === this.GetLabel(this, 'forecast_actual')
      )
      this.deltaIndex = this.headerRows.findIndex(
        (x) => x.text === this.GetLabel(this, 'forecast_delta')
      )
      this.odeIndex = this.headerRows.findIndex(
        (x) => x.text === this.GetLabel(this, 'forecast_ode')
      )

      const mythis = this
      this.dataRows.forEach(function (element, index) {
        if (element[0].value === 'Total Cost') {
          mythis.totalCostIndex = index
        } else if (element[0].value === 'Revenues') {
          mythis.revenueIndex = index
        } else if (element[0].value === 'CCI') {
          mythis.cciIndex = index
        } else if (element[0].value === 'CCI %') {
          mythis.cciPercentIndex = index
        }
      })
    },
    ChangeEACOperation: function (eventParams) {
      this.dataRows[eventParams.Row][this.eacIndex].oldValue =
        this.dataRows[eventParams.Row][this.eacIndex].value
      this.dataRows[eventParams.Row][this.eacIndex].value =
        Forecasthelper.CalculateEAC(
          eventParams,
          this.dataRows,
          this.eacIndex,
          this.dataRows[eventParams.Row][eventParams.Column].oldValue
        )
      this.dataRows[eventParams.Row][this.eacIndex].isChanged = true

      this.ChangeETCOperation(eventParams)
    },
    ChangeETCOperation: function (eventParams) {
      this.dataRows[eventParams.Row][this.etcIndex].oldValue =
        this.dataRows[eventParams.Row][this.etcIndex].value
      this.dataRows[eventParams.Row][this.etcIndex].value =
        Forecasthelper.CalculateETC(
          eventParams,
          this.dataRows,
          this.eacIndex,
          this.actualIndex
        )
      this.dataRows[eventParams.Row][this.etcIndex].isChanged = true
    },
    ChangeDeltaOperation: function (eventParams) {
      this.dataRows[eventParams.Row][this.deltaIndex].oldValue =
        this.dataRows[eventParams.Row][this.deltaIndex].value
      this.dataRows[eventParams.Row][this.deltaIndex].value =
        Forecasthelper.CalculateDelta(
          this.dataRows[eventParams.Row][this.deltaIndex].type,
          this.dataRows[eventParams.Row][this.eacIndex].value,
          this.dataRows[eventParams.Row][this.odeIndex].value
        )
      this.dataRows[eventParams.Row][this.deltaIndex].isChanged = true
    },
    ChangeTotalCostOperation: function (eventParams) {
      if (
        eventParams.RowText === 'Payroll' ||
        eventParams.RowText === 'Expense' ||
        eventParams.RowText === 'Other' ||
        eventParams.RowText === 'Solution Cont.' ||
        eventParams.RowText === 'Capital Charge'
      ) {
        this.dataRows[this.totalCostIndex][eventParams.Column].oldValue =
          this.dataRows[this.totalCostIndex][eventParams.Column].value
        this.dataRows[this.totalCostIndex][eventParams.Column].value =
          Forecasthelper.GetTotalValueofIndexedColumn(
            this.dataRows,
            5,
            9,
            eventParams.Column
          )
        this.dataRows[this.totalCostIndex][eventParams.Column].isChanged = true

        // --------------- Change EAC and Delta of Total Cost ---------------
        this.ChangeEACOperation({
          Row: this.totalCostIndex,
          Column: eventParams.Column
        })
        this.ChangeDeltaOperation({
          Row: this.totalCostIndex,
          Column: eventParams.Column
        })

        // --------------- Change CCI of Total Cost ---------------
        this.ChangeCCIOperation({
          Row: this.totalCostIndex,
          Column: eventParams.Column
        })
      }
    },
    ChangeCCIOperation: function (eventParams) {
      const result = Forecasthelper.CalculateCCI(
        this.dataRows[this.revenueIndex][eventParams.Column].value,
        this.dataRows[this.totalCostIndex][eventParams.Column].value
      )

      this.dataRows[this.cciIndex][eventParams.Column].oldValue =
        this.dataRows[this.cciIndex][eventParams.Column].value
      this.dataRows[this.cciIndex][eventParams.Column].value = result.CCI
      this.dataRows[this.cciIndex][eventParams.Column].isChanged = true

      // --------------- Change EAC and Delta of CCI ---------------
      this.ChangeEACOperation({
        Row: this.cciIndex,
        Column: eventParams.Column
      })
      this.ChangeDeltaOperation({
        Row: this.cciIndex,
        Column: eventParams.Column
      })

      this.dataRows[this.cciPercentIndex][eventParams.Column].oldValue =
        this.dataRows[this.cciPercentIndex][eventParams.Column].value
      this.dataRows[this.cciPercentIndex][eventParams.Column].value =
        result.CCIPercent
      this.dataRows[this.cciPercentIndex][eventParams.Column].isChanged = true

      // --------------- Change EAC and Delta of CCI %---------------
      this.ChangeEACOperation({
        Row: this.cciPercentIndex,
        Column: eventParams.Column
      })
      this.ChangeDeltaOperation({
        Row: this.cciPercentIndex,
        Column: eventParams.Column
      })
    },
    SaveOrUpdateForecast: function () {
      const requestList = []
      const mythis = this

      for (const i in this.dataRows) {
        if (
          Number(i) !== mythis.totalCostIndex &&
          Number(i) !== mythis.cciIndex &&
          Number(i) !== mythis.cciPercentIndex
        ) {
          for (const j in mythis.dataRows[Number(i)]) {
            if (
              mythis.dataRows[Number(i)][Number(j)].isChanged &&
              Number(j) !== mythis.actualIndex &&
              Number(j) !== mythis.etcIndex &&
              Number(j) !== mythis.eacIndex &&
              Number(j) !== mythis.odeIndex &&
              Number(j) !== mythis.deltaIndex
            ) {
              requestList.push({
                ProjectId: 19,
                ForecastId: 8,
                OperationStatus: mythis.foreCastOperationStatus.Update,
                TimePeriod: Number(mythis.headerRows[Number(j)].textOrigin),
                Value: Forecasthelper.ReturnFloatFromMoney(
                  mythis.dataRows[Number(i)][Number(j)].value
                ),
                Field: mythis.forecastFieldRequestType.find(
                  (x) => x.type === mythis.dataRows[Number(i)][0].value
                )?.value
              })
            }
          }
        }
      }
      if (requestList.length === 0) {
        this.$dialog.alert(
          this.GetMessage(this, 'forecast_empty_array_update'),
          this.alertoptions
        )
        return
      }
      ForecastService.ForecastSimulationSaveOrUpdate(requestList)
        .then((response) => {})
        .catch((errorObject) => {
          this.$dialog.alert(
            this.GetErrorMessage(
              this,
              errorObject.ErrorCode,
              errorObject.TransactionCode
            ),
            this.alertoptions
          )
        })
    }
  }
}
</script>
