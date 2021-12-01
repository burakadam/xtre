<template>
  <v-checkbox
    v-model="data"
    :value="value"
    :checked="checked"
    :disabled="disabled"
    :label="label"
    @change="change(data)"
    hide-details
      :on-icon="'fal fa-check'"
      :off-icon="'fal fa-square'"
  ></v-checkbox>
<!-- <div>
    <input type="checkbox"
      v-model="data"
       :value="label"
        :checked="checked"
          :disabled="disabled"
             @change="change(data)">
              <label>{{label}}</label>
</div> -->
</template>

<script>
export default {
  name: 'dxFormCheckboxInput',
  props: {
    value: {
      type: Number,
      required: false
    },
    label: {
      type: String,
      required: false
    },
    checked: {
      type: Boolean,
      required: false
    },
    clear: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    isCheckedshowPhoneBaseStation: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      data: this.$props.checked
    }
  },
  watch: {
    checked: function (value) {
      this.data = this.$props.checked
    },
    clear: function (input) {
      if (input) {
        this.data = false
      }
    }
  },
  methods: {
    change: function (input) {
      this.$emit('input', input)
    }
  }
}
</script>

<style>
</style>
