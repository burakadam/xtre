<template>
  <v-textarea
    style="margin-bottom: 15px"
    v-model="inputVal"
    clearable
    clear-icon="mdi-close-circle"
    :label="this.GetLabel(this, placeholder)"
    :rules="isRequired ? textRules : []"
    :required="isRequired"
    :disabled="disabled"
    :maxlength="characterSize"
    outlined
    auto-grow
    :rows="rows"
  ></v-textarea>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import HtmlTagRemover from 'Helpers/htmltagRemover'

export default {
  mixins: [validationMixin],
  name: 'dxFormTextareaInput',
  props: {
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
    readonly: {
      type: Boolean,
      required: false,
      default: false
    },
    value: {
      type: String,
      require: false
    },
    clear: {
      type: Boolean,
      required: false,
      default: false
    },
    placeholder: {
      type: String,
      required: false
    },
    hasBorder: {
      type: Boolean,
      required: false,
      default: true
    },
    isRequired: {
      type: Boolean,
      required: false,
      default: false
    },
    rows: {
      type: Number,
      default: 12
    }
  },
  data () {
    return {
      textRules: [
        (v) => !!v || '*' + this.GetLabel(this, 'required_field') + ' '
      ],
      inputVal: ''
    }
  },
  validations () {
    return {
      inputVal: { required }
    }
  },
  watch: {
    inputVal: function (input) {
      this.$emit('input', input)
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
    clear: function (input) {
      if (input) {
        this.inputVal = ''
      }
    }
  },
  methods: {
    validate: function () {
      if (this.isRequired && !this.disabled) {
        this.$v.inputVal.$touch()
        if (this.$v.inputVal.$invalid) {
          return false
        } else {
          return true
        }
      } else return true
    }
  }
}
</script>
