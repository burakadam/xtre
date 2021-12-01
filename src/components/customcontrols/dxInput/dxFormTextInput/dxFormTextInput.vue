<template>
  <div>
    <v-text-field
      v-if="
        this.$props.type !== 'password' &&
        this.$props.type !== 'email' &&
        this.$props.type !== 'money'
      "
      :id="id"
      :type="type"
      @blur="validate()"
      v-model.trim="inputVal"
      :placeholder="this.GetLabel(this, placeholder)"
      borderType
      clearable
      :rules="isRequired ? textRules : []"
      :required="isRequired"
      :disabled="disabled"
      :maxlength="characterSize"
      outlined
      dense
      :messages="!disabled ? this.GetMessage(this, warning) : ''"
      :hide-details="hideDetails"
      :append-icon="appendIcon"
    ></v-text-field>
    <v-text-field
      v-if="type === 'email'"
      :id="id"
      :type="type"
      @blur="validate()"
      v-model="inputVal"
      :label="this.GetLabel(this, placeholder)"
      clearable
      :required="isRequired"
      :rules="isRequired ? emailRules : []"
      :disabled="disabled"
      outlined
      dense
      :hide-details="hideDetails"
      :append-icon="appendIcon"
    ></v-text-field>
    <v-text-field
      v-if="type === 'password'"
      :id="id"
      @blur="validate()"
      v-model="inputVal"
      :label="this.GetLabel(this, placeholder)"
      :append-icon="show ? 'fa fa-eye' : 'fa fa-eye-slash'"
      @click:append="show = !show"
      :type="show ? 'text' : 'password'"
      clearable
      :required="isRequired"
      :rules="isRequired ? passwordRules : []"
      :disabled="disabled"
      outlined
      dense
      :hide-details="hideDetails"
    ></v-text-field>
    <v-text-field
      v-if="this.$props.type === 'money'"
      :id="id"
      :type="'text'"
      @blur="validate()"
      @keypress="keyPress($event)"
      v-model.trim="inputVal"
      :label="this.GetLabel(this, placeholder)"
      borderType
      clearable
      :rules="isRequired ? textRules : []"
      :required="isRequired"
      :disabled="disabled"
      :maxlength="characterSize"
      outlined
      dense
      :messages="!disabled ? this.GetMessage(this, warning) : ''"
      :hide-details="hideDetails"
      :append-icon="appendIcon"
    ></v-text-field>
    <span v-if="!phoneIsValid" class="form-text text-danger">
      *{{ this.GetLabel(this, 'wrong_phone_format') }}
    </span>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import HtmlTagRemover from 'Helpers/htmltagRemover'
import Forecasthelper from '@/library/helpers/forecasthelper'
import constants from '@/library/constants/constants'
export default {
  mixins: [validationMixin],
  name: 'dxFormTextInput',
  props: {
    value: [String, Number],
    inputType: String,
    id: {
      type: String,
      required: false,
      default: ''
    },
    showLabel: {
      type: Boolean,
      required: false,
      default: false
    },
    labelText: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    placeholder: {
      type: String,
      required: false
    },
    isRequired: {
      type: Boolean,
      required: false,
      default: false
    },
    clear: {
      type: Boolean,
      required: false,
      default: false
    },
    isPhone: {
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
    characterSize: {
      type: String,
      required: false,
      default: '500'
    },
    warning: {
      type: String,
      required: false,
      default: ''
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    appendIcon: {
      type: String
    }
  },
  data () {
    return {
      inputVal: '',
      phoneIsValid: true,
      showRequired: false,
      show: false,
      textRules: [(v) => !!v || ''],
      emailRules: [
        (v) => !!v || '*' + this.GetLabel(this, 'required_field') + ' ',
        (v) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || '*' + this.GetLabel(this, 'wrong_email_format') + ' '
      ],
      passwordRules: [
        (v) => !!v || '*' + this.GetLabel(this, 'required_field') + ' '
      ],
      captchaRules: [
        (v) => !!v || '*' + this.GetLabel(this, 'required_field') + ' '
      ]
    }
  },
  validations () {
    if (this.type === 'email') {
      return {
        inputVal: { required, email }
      }
    } else {
      return {
        inputVal: { required }
      }
    }
  },
  watch: {
    inputVal: function (input) {
      if (input) {
        if (this.type === 'money') {
          this.inputVal = Forecasthelper.GetValueofField({
            VariableType: constants.ForecastServiceFieldTypes.Money,
            Value: Forecasthelper.ReturnFloatFromMoney(input)
          })
          this.$emit('input', this.inputVal)
        }
        if (typeof input !== 'number' && this.type !== 'money') {
          this.$emit('input', input.trim())
        }
        if (this.isPhone) {
          this.phonenumber(input)
        } else {
          this.phoneIsValid = true
        }
      } else {
        if (this.type === 'money') {
          this.inputVal = '0,00'
        }
        this.$emit('input', input)
        this.phoneIsValid = true
      }
    },
    value: {
      handler: function (input) {
        if (this.clearHtml && input !== null) {
          this.inputVal = HtmlTagRemover.removeHtmlTags(input)
        } else {
          this.inputVal = input
        }
      },
      immediate: true
    },
    isRequired: {
      handler: function (input) {
        this.isRequired = input
      },
      immediate: true
    },
    clear: function (input) {
      if (input) {
        this.inputVal = ''
      }
    }
  },
  computed: {},
  created () {
    this.inputVal = this.value
  },
  methods: {
    keyPress: function (event) {
      if (this.type === 'money') {
        if (!/^[\d]+$/.test(event.key)) {
          event.preventDefault()
        }
      }
    },
    phonenumber: function (inputVal) {
      var phoneno = /^[5]{1}[0-9]{2}[0-9]{3}[0-9]{4}$/
      if (!inputVal.match(phoneno)) {
        this.phoneIsValid = false
      } else {
        this.phoneIsValid = true
      }
    },
    validate: function () {
      if (this.isRequired && !this.disabled) {
        this.$v.inputVal.$touch()
        if (this.$v.inputVal.$invalid || !this.phoneIsValid) {
          return false
        } else {
          if (this.type === 'email') {
            this.validEmail(this.$v.inputVal.email)
            return this.$v.inputVal.email
          } else {
            return true
          }
        }
      } else {
        return true
      }
    },
    validEmail: function (email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    }
  }
}
</script>
