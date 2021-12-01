<template>
  <div :class="this.className">
    <select2
      :value="selectedItem"
      v-model="selectedItem"
      :disabled="disabled"
      :placeholder="this.GetLabel(this, placeholder)"
      :min-count-for-search="0"
      ref="comboboxMulticomponentref"
      @update="Update($event)"
      @keyup="Search($event)"
      :multiple="multiple"
      :data="items"
    />
  </div>
</template>

<script>
export default {
  name: 'dxFormCombobox',
  props: {
    name: String,
    id: String,
    classType: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      required: false
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
      type: [String, Number],
      required: false
    },
    selectedMultipleValue: {
      type: Array,
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
    fromComponent: {
      type: String,
      required: false
    },
    selectedItemValue: {
      type: [String, Number],
      default: -1
    }
  },
  data () {
    return {
      className: this.classType,
      selectedItem: this.selectedItemValue,
      isValid: true
      // rules: {
      //   select: [(v) => !!v || '*' + this.GetLabel(this, 'required_field') + ' '],
      //   select2: [(v) => v.length > 0 || '*' + this.GetLabel(this, 'required_field') + ' ']
      // }
    }
  }
}
</script>

<style>
.select2-container .select2-selection--single {
  height: 40px !important;
}
.select2-selection__rendered {
  line-height: 40px !important;
}
.select2-selection {
  border: 2px solid;
}
.select2-selection-invalid {
  border: 2px solid #ff5252 !important;
}
</style>
