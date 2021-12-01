<template>
  <div class="mainDiv">
    <template v-for="(row, key) in rowCount + 1">
      <template v-if="key === 0">
        <div
          v-bind:key="_index"
          v-for="(column, _key, _index) in columnCount"
          :class="`partialDiv ${headerRows[_key].class}`"
          :style="
            headerRows[_key].divStyle + 'width:' + 100 / columnCount + '%;'
          "
        >
          <p :style="headerRows[_key].pStyle + 'text-align: center;'">
            {{ headerRows[_key].text }}
          </p>
        </div>
      </template>
      <template v-else>
        <div
          v-bind:key="_index"
          v-for="(column, _key, _index) in columnCount"
          :class="`partialDiv ${
            dataRowsData[key - 1][_key].class !== 'undefined'
              ? dataRowsData[key - 1][_key].class
              : ''
          }`"
          :style="
            dataRowsData[key - 1][_key].divStyle +
            'width:' +
            100 / columnCount +
            '% !important;'
          "
        >
          <p
            v-if="
              dataRowsData[key - 1][_key].type ===
                constants.GridFieldTypes.Label ||
              !dataRowsData[key - 1][_key].isEditable
            "
            @click="
              ClickCellEvent(dataRowsData[key - 1][_key].value, key - 1, _key)
            "
            :style="dataRowsData[key - 1][_key].pStyle + 'text-align: center;'"
          >
            {{ dataRowsData[key - 1][_key].value }}
          </p>
          <p
            v-if="
              dataRowsData[key - 1][_key].type === constants.GridFieldTypes.Link
            "
            @click="
              ClickCellEvent(dataRowsData[key - 1][_key].value, key - 1, _key)
            "
            :style="dataRowsData[key - 1][_key].pStyle + ''"
          >
            {{ dataRowsData[key - 1][_key].value }}
          </p>
          <input
            v-if="
              (dataRowsData[key - 1][_key].type ===
                constants.GridFieldTypes.Text ||
                dataRowsData[key - 1][_key].type ===
                  constants.GridFieldTypes.Percent) &&
              dataRowsData[key - 1][_key].isEditable
            "
            @click="
              ClickCellEvent(dataRowsData[key - 1][_key].value, key - 1, _key)
            "
            :style="dataRowsData[key - 1][_key].pStyle + 'text-align: center;'"
            @input="
              CellInputKeyEvent(
                constants.GridFieldTypes.Text,
                dataRowsData[key - 1][_key].value,
                key - 1,
                _key
              )
            "
            @keypress="CellKeyPressEvent(constants.GridFieldTypes.Text, $event)"
            type="text"
            v-mask="dataRowsData[key - 1][_key].format"
            v-model="dataRowsData[key - 1][_key].value"
          />
          <input
            v-if="
              dataRowsData[key - 1][_key].type ===
                constants.GridFieldTypes.Number &&
              dataRowsData[key - 1][_key].isEditable
            "
            @click="
              ClickCellEvent(dataRowsData[key - 1][_key].value, key - 1, _key)
            "
            :style="dataRowsData[key - 1][_key].pStyle + 'text-align: center;'"
            @input="
              CellInputKeyEvent(
                constants.GridFieldTypes.Number,
                dataRowsData[key - 1][_key].value,
                key - 1,
                _key
              )
            "
            @keypress="
              CellKeyPressEvent(constants.GridFieldTypes.Number, $event)
            "
            type="number"
            v-mask="dataRowsData[key - 1][_key].format"
            v-model="dataRowsData[key - 1][_key].value"
          />
          <input
            v-if="
              dataRowsData[key - 1][_key].type ===
                constants.GridFieldTypes.Money &&
              dataRowsData[key - 1][_key].isEditable
            "
            @click="
              ClickCellEvent(dataRowsData[key - 1][_key].value, key - 1, _key)
            "
            :style="dataRowsData[key - 1][_key].pStyle + 'text-align: center;'"
            @input="
              CellInputKeyEvent(
                constants.GridFieldTypes.Money,
                dataRowsData[key - 1][_key].value,
                key - 1,
                _key
              )
            "
            @keypress="
              CellKeyPressEvent(constants.GridFieldTypes.Money, $event)
            "
            type="text"
            v-mask="dataRowsData[key - 1][_key].format"
            v-model="dataRowsData[key - 1][_key].value"
          />
        </div>
      </template>
      <br />
    </template>
  </div>
</template>

<script>
import constants from '@/library/constants/constants'
import Forecasthelper from '@/library/helpers/forecasthelper'

export default {
  name: 'dxGrid',
  props: {
    columnCount: {
      type: Number,
      required: true
    },
    rowCount: {
      type: Number,
      required: true
    },
    headerRows: {
      type: Array,
      required: true
    },
    dataRows: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      dataRowsData: [],
      constants
    }
  },
  watch: {
    dataRows: {
      handler: function (input) {
        this.dataRowsData = input
      },
      immediate: true
    }
  },
  methods: {
    CellKeyPressEvent: function (type, event) {
      if (type === constants.GridFieldTypes.Money) {
        if (!/^[\d]+$/.test(event.key)) {
          event.preventDefault()
        }
      }
    },
    CellInputKeyEvent: function (type, model, row, column) {
      if (type === constants.GridFieldTypes.Money) {
        /* --- formatting data --- */
        if (this.dataRowsData[row][column].value) {
          this.dataRowsData[row][column].value = new Intl.NumberFormat(
            'de-DE'
          ).format(
            Forecasthelper.ReturnFloatFromMoney(
              this.dataRowsData[row][column].value
            )
          )
        } else {
          model = 0
          this.dataRowsData[row][column].value = new Intl.NumberFormat(
            'de-DE'
          ).format(Forecasthelper.ReturnFloatFromMoney('0'))
        }
      }
      /* --- de format ve tr'nin ki aynısı --- */
      this.$emit('CellInputKeyEvent', {
        Type: type,
        Model: model,
        Row: row,
        Column: column,
        ColumnTextOrigin: this.headerRows[column].textOrigin,
        ColumnText: this.headerRows[column].text,
        RowText: this.dataRowsData[row][0].value
      })
    },
    ClickCellEvent: function (model, row, column) {
      this.$emit('ClickCellEvent', {
        Model: model,
        Row: row,
        Column: column,
        ColumnText: this.headerRows[column],
        RowText: this.dataRowsData[row][0]
      })
    }
  }
}
</script>
<style scoped>
.mainDiv {
  padding: 15px 15px 15px 15px;
  border-radius: 20px;
}
.partialDiv {
  display: inline-block;
  vertical-align: top;
  height: 2rem;
}
</style>
