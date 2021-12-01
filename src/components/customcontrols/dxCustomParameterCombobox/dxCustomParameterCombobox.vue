<template>
  <!-- <v-select
    v-if="!multiple"
    @blur="validate()"
    v-model="selectedItem"
    :items="items"
    :label="this.GetLabel(this, placeholder)"
    :outlined="hasBorder"
    :clearable="clear"
    :required="isRequired"
    :rules="isRequired ? rules.select:[]"
    :disabled="disabled"
    :options="selectedItem"
    :placeholder="this.GetLabel(this, placeholder)"
  ></v-select>
  <v-select
    v-else
    multiple
    @blur="validate()"
    v-model="selectedItems"
    :options="selectedItems"
    :items="items"
    :key="items.value"
    :text="items.text"
    :value="items.value"
    :label="this.GetLabel(this, placeholder)"
    :outlined="hasBorder"
    :clearable="clear"
    :rules="isRequired ? rules.select : []"
    :required="isRequired"
    :disabled="disabled"
    :placeholder="this.GetLabel(this, placeholder)"
    chips
  ></v-select> -->
    <div :class="this.className" >
      <label> {{this.GetLabel(this,placeholder) }}  </label>
      <select v-if="!multiple" :name="name" :id="id"  :required="isRequired"  :disabled="disabled"  @blur="validate()"  v-model="selectedItem" >
        <option v-for="(data) in items" :key="data.value" :value="data.value" >{{ data.text }}</option>
      </select>
      <select v-else multiple @blur="validate()" v-model="selectedItem"  :disabled="disabled" >
        <option v-for="(data) in items" :key="data.value" :value="data.value" >{{ data.text }}</option>
      </select>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { LIST_PARAMETER } from '@/store/actions/parameter'
import { validationMixin } from 'vuelidate'
export default {
  mixins: [validationMixin],
  name: 'dxCustomParameterCombobox',
  props: {
    classType: String,
    name: String,
    id: String,
    multiple: {
      type: Boolean,
      default: false
    },
    clear: {
      type: Boolean,
      required: false,
      default: false
    },
    enableClear: {
      type: Boolean,
      default: true
    },
    isRequired: {
      type: Boolean,
      required: false,
      default: false
    },
    selectedValue: {
      type: String,
      required: false
    },
    hasBorder: {
      type: Boolean,
      required: false,
      default: false
    },
    placeholder: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    paramType: {
      type: Number,
      default: null,
      required: false
    },
    paramGroup: {
      type: Number,
      required: false
    }
  },
  data () {
    return {
      className: this.classType,
      selectedItem: '-1',
      selectedItems: [],
      isValid: true,
      items: []
      // rules: {
      //   select: [(v) => !!v || '*' + this.GetLabel(this, 'required_field') + ' '],
      //   select2: [(v) => v.length > 0 || '*' + this.GetLabel(this, 'required_field') + ' ']
      // }
    }
  },
  created () {
    this.getParameterValues()
    if (!this.$props.selectedValue || this.$props.selectedValue === '' || this.$props.selectedValue === '0') {
      this.selectedItem = '0'
    } else {
      this.selectedItem = this.$props.selectedValue
    }
  },
  mounted () {
    this.$watch(vm => [vm.paramType, vm.paramGroup], val => {
      this.selectedItem = '0'
      this.getParameterValues()
    })
  },
  watch: {
    selectedValue: function (input) {
      this.$emit('input', input)
      this.selectedItem = input
    },
    selectedItem: function (input) {
      this.$emit('input', input)
    },
    selectedItems: function (input) {
      this.$emit('input', input)
    },
    clear: function (input) {
      if (this.$props.enableClear) {
        if (input) {
          this.selectedItem = -1
        }
      }
    }
  },
  validations: {
    selectedItem: {
      required
    }
  },
  methods: {
    getParameterValues: function () {
      var ctx = this
      const request = {
        Type: parseInt(this.paramType),
        Group: this.paramGroup === null ? null : this.paramGroup.toString()
      }
      this.$store
        .dispatch(LIST_PARAMETER, request)
        .then(() => {
          if (ctx.$store.getters.parameterValues) {
            ctx.items =
              ctx.$store.getters.parameterValues.length > 0
                ? ctx.$store.getters.parameterValues.map(function (e) {
                  return {
                    text: e.Value,
                    value: e.Code.toString()
                  }
                })
                : [{ text: 'None', value: 0 }]
          }
          this.items.unshift({
            value: '0',
            text: this.GetLabel(this, 'choose')
          })
        })
        .catch((errorObject) => {
          this.$dialog.alert(
            this.GetErrorMessage(this, errorObject.ErrorCode, errorObject.TransactionCode),
            this.alertoptions
          )
        })
    },
    validate: function () {
      if (this.isRequired) {
        if (!this.selectedItem || this.selectedItem === '-1' || this.selectedItem === '0') {
          this.isValid = false
          return false
        } else {
          this.isValid = true
          return true
        }
      }
    }
  }
}
</script>

<style>
</style>
