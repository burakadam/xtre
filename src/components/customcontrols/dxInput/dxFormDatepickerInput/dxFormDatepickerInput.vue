<template>
  <div class="x-date-picker">
    <div :class="this.className">
      <!-- <label> {{this.GetLabel(this,placeholder) }}  </label> -->
      <input
        :type="type"
        :min-date="minDate"
        :max-date="maxDate"
        max="9999-12-31"
        :disabled="disabled"
        v-model="yourValue"
        :error="!dateIsValid"
        @change="validate(yourValue)"
      />
    </div>
  </div>
</template>

<script>
import CustomDateFormatter from '@/library/helpers/customdateformatter'
export default {
  name: 'dxFormDatepickerInput',
  props: {
    classType: String,
    type: {
      default: 'date'
    },
    value: {
      type: [String, Number]
    },
    placeholder: {
      type: String,
      required: false
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    minDate: {
      type: String
    },
    maxDate: {
      type: String
    },
    clear: {
      type: Boolean,
      required: false,
      default: false
    },
    hasBorder: {
      type: Boolean,
      required: false,
      default: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    fromComponent: {
      type: String,
      required: false
    },
    defaultValue: {
      type: String,
      required: false,
      default: ''
    }
  },
  data: function () {
    return {
      className: this.classType,
      yourValue: '',
      dateIsValid: true,
      dateIsValidForFQ: true,
      menu: false,
      textRules: [
        (v) => !!v || '*' + this.GetLabel(this, 'required_field') + ' '
      ]
    }
  },
  // created () {
  //   // this.yourValue = this.$props.value
  // },
  watch: {
    dateIsValid: function (input) {
      if (!input) {
        this.className = this.className + ' errors'
      } else {
        this.className = this.className.replace('errors', '')
      }
    },
    value (val) {
      if (!val) {
        this.yourValue = null
      }
    },
    yourValue (newValue) {
      if (newValue) {
        this.$emit(
          'input',
          CustomDateFormatter.GetDate(new Date(newValue)).toString()
        )
      } else {
        this.$emit('input', null)
      }
    },
    defaultValue: {
      handler: function (input) {
        this.yourValue = input
      },
      immediate: true
    },
    clear: function (input) {
      if (input) {
        this.yourValue = null
      }
    }
  },
  methods: {
    validate: function () {
      if (this.isRequired && !this.disabled) {
        if (this.yourValue == null || this.yourValue === '') {
          this.dateIsValid = false
          return false
        } else {
          this.dateIsValid = true
          return true
        }
      } else {
        this.dateIsValid = true
        return true
      }
    }
  }
}
</script>

<style scoped>
.form-control {
  width: 197px;
  margin: 0;
  padding-left: 0;
  text-transform: uppercase;

  padding: 0 15px;
}
.sd-container {
  position: relative;
  float: left;
}

.sd {
  padding: 5px 10px;
  height: 30px;
  width: 150px;
}

.open-button {
  position: absolute;
  top: 5px;
  right: 11px;
  width: 25px;
  height: 25px;
  background: #fff;
  pointer-events: none;
}

.open-button button {
  border: none;
  background: transparent;
}
</style>
