<template>
  <div
    data-app
    :class="`x-select-box border${borderColor} ${
      fontBold ? 'select-font-bold' : ''
    }`"
  >
    <div class="select__header">
      <span v-if="label">{{ this.GetLabel(this, label) }}</span>
    </div>
    <dxFormCombobox
      :name="name"
      :id="id"
      :items="items"
      :selectedValue="selectedValue"
      :class="isSmaller ? 'smaller-select' : ''"
      :selectedItemValue="selectedItemValue"
    />
    <span v-if="isError" class="v-messages error--text">{{ errorText }}</span>
  </div>
</template>
<script>
import dxFormCombobox from '../customcontrols/dxInput/dxFormCombobox/dxFormCombobox.vue'
export default {
  components: {
    dxFormCombobox
  },
  props: {
    name: String,
    id: String,
    items: {
      type: Array,
      default: () => []
    },
    itemText: {
      type: String,
      required: true
    },
    itemVelue: {
      type: String,
      required: true
    },
    label: {
      type: String
    },
    defaultValue: {
      type: Object
    },
    borderColor: {
      type: String,
      default: 'greyDark'
    },
    fontBold: {
      type: Boolean,
      default: false
    },
    selectedValue: {
      type: [String, Number],
      required: false
    },
    isSmaller: {
      type: Boolean,
      default: false
    },
    selectedItemValue: {
      type: [String, Number],
      default: -1
    },
    isError: {
      type: Boolean,
      default: false
    },
    errorText: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      select: this.defaultValue || ''
    }
  }
}
</script>
<style>
.v-text-field {
  margin-top: 0 !important;
  padding-top: 0 !important;
}
.v-select__selection.v-select__selection--comma {
  font-size: var(--fxmd);
}
.select-font-bold .v-select__selection.v-select__selection--comma {
  font-family: 'Avenir-Heavy';
}
.v-select--is-menu-active .v-menu {
  display: block;
}
.v-input__slot {
  margin-bottom: 0 !important;
  border: 1px solid var(--greyLight);
  height: 38px;
  padding: 0 10px;
  border-radius: 5px !important;
  background: var(--white);
}
.v-select.v-text-field input {
  width: 0;
}
.v-select .v-icon.v-icon {
  font-size: 15px !important;
}
.borderblue .v-input__slot {
  border: 1px solid var(--blue);
}
.v-text-field > .v-input__control > .v-input__slot:before,
.v-text-field > .v-input__control > .v-input__slot:after {
  display: none;
}
.v-text-field i {
  font-size: 18px !important;
  color: var(--blueDark) !important;
}
.select__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.select__header span {
  font-size: var(--fxxs);
  margin-bottom: 3px;
  margin-left: 16px;
}
</style>
