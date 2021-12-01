import constants from '../constants/constants'

export default class Forecasthelper {
  isMoneyWithComma = false

  static ConvertIntToMonthDotYear (mythis, date) {
    const monthArray = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
    return mythis.GetLabel(this, 'forecast_' + monthArray[Number(date.substring(date.length - 2)) - 1]) + '.' + date.substring(2, 4)
  }

  static GetTypeofField (element) {
    if (element.VariableType === constants.ForecastServiceFieldTypes.Money) {
      return constants.GridFieldTypes.Money
    } else if (element.VariableType === constants.ForecastServiceFieldTypes.Number) {
      return constants.GridFieldTypes.Number
    } else if (element.VariableType === constants.ForecastServiceFieldTypes.Text) {
      return constants.GridFieldTypes.Text
    } else if (element.VariableType === constants.ForecastServiceFieldTypes.Percent) {
      return constants.GridFieldTypes.Percent
    }
  }

  static GetValueofField (element) {
    if (element.VariableType === constants.ForecastServiceFieldTypes.Money) {
      if (this.isMoneyWithComma) {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(element.Value).toString().slice(0, -2)
      } else {
        return new Intl.NumberFormat('de-DE').format(element.Value)
      }
    } else if (element.VariableType === constants.ForecastServiceFieldTypes.Percent) {
      return element.Value.toString().concat('%')
    } else {
      return element.Value
    }
  }

  static GetTotalValueofIndexedColumn (data, startIndex, endIndex, columnNumber) {
    let result = 0
    for (let i = startIndex; i <= endIndex; i++) {
      result += this.ReturnFloatFromMoney(data[i][columnNumber].value)
    }

    return new Intl.NumberFormat('de-DE').format(result)
  }

  static ReturnFloatFromMoney (value) {
    var thousandSeparator = Intl.NumberFormat('de').format(11111).replace(/\p{Number}/gu, '')
    var decimalSeparator = Intl.NumberFormat('de').format(1.1).replace(/\p{Number}/gu, '')

    if (value !== 0 && value !== '0' && value !== '0,00') {
      return parseFloat(value.toString()
        .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
        .replace(new RegExp('\\' + decimalSeparator), '.')
      )
    } else {
      return 0
    }
  }

  // küsüratlar nokta şeklinde geliyor ama paraya çevirmede virgüllü string bir ifade kullanmak lazım.
  static ChangeDoubleDotToComma (value) {
    return value.replaceAll('.', ',')
  }

  static CalculateEAC (eventParams, data, eacIndex, oldValue) {
    let diff = 0
    if (data[eventParams.Row][eventParams.Column].type === constants.GridFieldTypes.Money) {
      diff = this.ReturnFloatFromMoney(data[eventParams.Row][eventParams.Column].value) - this.ReturnFloatFromMoney(oldValue)
      diff += this.ReturnFloatFromMoney(data[eventParams.Row][eacIndex].value)
      return new Intl.NumberFormat('de-DE').format(diff)
    } else if (data[eventParams.Row][eventParams.Column].type === constants.GridFieldTypes.Percent) {
      diff = parseFloat(data[eventParams.Row][eventParams.Column].value.toString().split('%')[0]) - parseFloat(oldValue.toString().split('%')[0])
      diff += parseFloat(data[eventParams.Row][eacIndex].value.toString().split('%')[0])
      return diff.toFixed(1).toString() + '%'
    } else {
      return diff
    }
  }

  static CalculateETC (eventParams, data, eacIndex, actualIndex) {
    let diff = 0
    if (data[eventParams.Row][eventParams.Column].type === constants.GridFieldTypes.Money) {
      diff = this.ReturnFloatFromMoney(data[eventParams.Row][eacIndex].value) - this.ReturnFloatFromMoney(data[eventParams.Row][actualIndex].value)
      return new Intl.NumberFormat('de-DE').format(diff)
    } else if (data[eventParams.Row][eventParams.Column].type === constants.GridFieldTypes.Percent) {
      diff = parseFloat(data[eventParams.Row][eacIndex].value.toString().split('%')[0]) - parseFloat(data[eventParams.Row][actualIndex].value.toString().split('%')[0])
      return diff.toFixed(1).toString() + '%'
    } else {
      return diff
    }
  }

  static CalculateDelta (type, eac, ode) {
    if (type === constants.GridFieldTypes.Money) {
      return new Intl.NumberFormat('de-DE').format(this.ReturnFloatFromMoney(eac) - this.ReturnFloatFromMoney(ode))
    } else if (type === constants.GridFieldTypes.Percent) {
      return parseFloat(eac.toString().split('%')[0]) - parseFloat(ode.toString().split('%')[0]).toFixed(1).toString() + '%'
    } else {
      return 0
    }
  }

  static CalculateCCI (revenue, totalCost) {
    let cci = 0
    let cciPercent = 0

    cci = this.ReturnFloatFromMoney(revenue) - this.ReturnFloatFromMoney(totalCost)
    cciPercent = (cci / this.ReturnFloatFromMoney(revenue)) * 100

    return {
      CCI: new Intl.NumberFormat('de-DE').format(cci),
      CCIPercent: cciPercent.toFixed(1).toString() + '%'
    }
  }
}
