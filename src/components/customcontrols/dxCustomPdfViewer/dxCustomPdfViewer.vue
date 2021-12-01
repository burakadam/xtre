<template>
  <vue-pdf-app class="pdfViewer" style="display: list-item; height: 700px;" :pdf="showFileByteValue" />
</template>
<script>
import VuePdfApp from 'vue-pdf-app'
// import this to use default icons for buttons
import 'vue-pdf-app/dist/icons/main.css'
// import constants from 'Constant/constants'
import DocumentMixin from '@/mixins/document.mixin'
export default {
  name: 'dxCustomPdfViewer',
  mixins: [DocumentMixin],
  props: {
    correspondenceId: {
      type: Number,
      default: null,
      required: false
    }
  },
  data () {
    return {
      showFileByteValue: null,
      fileByte: '',
      fileName: ''
    }
  },
  components: {
    VuePdfApp
  },
  created () {
  },
  methods: {
    base64ToArrayBuffer: function (base64) {
      var binaryString = window.atob(base64)
      var len = binaryString.length
      var bytes = new Uint8Array(len)
      for (var i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }
      return bytes.buffer
    }
    // getDocumentView: function () {
    //   const request = {
    //     CorrespondenceId: parseInt(this.correspondenceId)
    //   }
    //   this.$store
    //     .dispatch(GET_DOCUMENT, request)
    //     .then((response) => {
    //       this.fileByte = response.data.Response.File
    //       this.showFileByteValue = this.base64ToArrayBuffer(this.fileByte)
    //     })
    //     .catch((errorObject) => {
    //       this.$dialog.alert(
    //         this.GetErrorMessage(this, errorObject.errorCode, errorObject.TransactionCode),
    //         this.alertoptions
    //       )
    //     })
    // }
  }
}
</script>
