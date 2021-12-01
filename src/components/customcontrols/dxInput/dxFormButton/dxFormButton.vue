<template>
  <v-btn
    v-if="isAuthorized"
    :disabled="disabled"
    :color="color"
    :text="text"
    @click="click"
    >{{ this.GetLabel(this, buttonText) }}
  </v-btn>
</template>

<script>
// import AuthHelper from 'Helpers/authhelper'

export default {
  name: 'dxFormButton',
  props: {
    buttonText: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    color: {
      type: String,
      required: false,
      default: 'blue darken-1'
    },
    text: {
      type: Boolean,
      required: false,
      default: false
    },
    authKey: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      isAuthorized: false
    }
  },
  created () {
    // this.checkAuthorize(this.authKey)
  },
  watch: {},
  methods: {
    // click () {
    //   this.$emit('click')
    // },
    // checkAuthorize (authKey) {
    //   if (authKey) {
    //     this.isAuthorized = AuthHelper.IsAuthorized(authKey)
    //   } else {
    //     this.isAuthorized = true
    //   }
    // }
  }
}
</script>

<style></style>
