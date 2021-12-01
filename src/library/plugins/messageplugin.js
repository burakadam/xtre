import Vue from 'vue'

const messageplugin = {
  install (Vue, options) {
    Vue.mixin({
      methods: {
        GetMessage (ctx, message) {
          if (message) {
            return this.$t(message)
          } else {
            return message
          }
        },

        GetLabel (ctx, message) {
          if (message) {
            return this.$t('label_' + message)
          } else {
            return message
          }
        },

        GetLabelWithData (ctx, message, data) {
          if (message) {
            return this.$t('label_' + message) + data
          } else {
            return message
          }
        },

        GetErrorMessage (ctx, code, transactionCode) {
          if (transactionCode) {
            if (code) {
              return (
                this.$t('error_' + code) +
                '<br><p class="errorMessageStyle">' +
                this.$t('transaction_code') +
                transactionCode +
                '</p>'
              )
            } else {
              return this.$t('error_500')
            }
          } else {
            if (code) {
              return this.$t('error_' + code)
            } else {
              return this.$t('error_500')
            }
          }
        }
      }
    })
  }
}

Vue.use(messageplugin)

export default { messageplugin }
