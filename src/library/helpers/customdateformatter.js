import constants from '../constants/constants'
export default class CustomDateFormatter {
  static dateFormat (date) {
    if (date === null) return ''

    return this.ConvertDateToServiceZone(new Date(date)).toISOString().substring(0, 10)
  }

  static ConvertDateToServiceZone (date) {
    if (date) {
      var offset = date.getTimezoneOffset() / 60
      var hours = date.getHours()

      date.setHours(hours - offset)
    }

    return date
  }

  static GetDate (date) {
    if (date) {
      var offset = date.getTimezoneOffset() / 60
      var hours = date.getHours()

      date.setHours(hours + offset)
    }
    return date
  }

  static CheckIfDateIsNull (date) {
    return (date == null || date.toISOString().split('T')[0] === '1970-01-01' || date.toISOString().split('T')[0] === '1969-12-31')
  }

  static SetSelectedHourToDate (date, input) {
    if (date !== null) {
      if (input) {
        let hour = ''
        const minute = input.split(':')[1].split(' ')[0]

        if (input.split(' ')[1] === 'pm') {
          hour = constants.timePm[Number(input.split(':')[0]) - 1]
        } else {
          hour = constants.timeAm[Number(input.split(':')[0]) - 1]
        }

        date.setHours(hour, Number(minute), 0)
      } else {
        date.setHours(12, 0, 0)
      }

      return date
    }
  }

  static GetFullYearAndGetMonth (date) {
    let year = ''
    let month = ''
    if (date !== null) {
      year = date.getFullYear()
      month = date.getMonth() + 1
      if (String(month).length === 1) {
        month = '0' + month
      }
    }
    return String(year) + String(month)
  }

  static ConvertDateToInt (date) {
    return Number(date.toISOString().split('T')[0].split('-')[0] + date.toISOString().split('T')[0].split('-')[1])
  }

  static ConvertDateToDefaultMonth (date) {
    return date.toISOString().split('T')[0].split('-')[0] + '-' + date.toISOString().split('T')[0].split('-')[1]
  }

  // 202120 to date.
  static ConvertIntToDate (date) {
    return date.toString().substring(0, 4) + '-' + date.toString().substring(4, 6)
  }
}
