<template>
  <!-- <v-file-input
    ref="file"
    id="fileId"
    @change="handleImage"
    placeholder="Upload your documents"
    multiple
    prepend-icon="mdi-paperclip"
    dense
    outlined
    :clearable="clear"
    :accept="acceptType"
  >
    <template v-slot:selection="{ text }">
      <v-chip small label color="primary">
        {{ text }}
      </v-chip>
    </template>
     <template slot="label">
      <v-icon small>fa fa-upload</v-icon>
    </template>
  </v-file-input> -->
  <div class="x-checkbox">
    <div>
      <p>
        {{ this.GetLabel(this, 'forecast_upload') }}
      </p>
      <i class="fal fa-folder"></i>
      <input
        type="file"
        name="file upload"
        ref="file"
        :accept="acceptType"
        :multiple="multiple"
        @change="handleImage"
      />
    </div>
    <div class="x-checkbox__files">
      <div v-for="(file, idx) in fileName" :key="idx">
        <p>{{ file }}</p>
        <v-btn text>
          <i class="fal fa-times"></i>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dxFormFileInput',
  props: {
    clear: {
      type: Boolean,
      required: false,
      default: false
    },
    hasBorder: {
      type: Boolean,
      required: false,
      default: false
    },
    acceptType: {
      type: String,
      required: false
    },
    multiple: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      files: [],
      fileName: [],
      fileByteArray: []
    }
  },
  methods: {
    clearMethod: function () {
      this.$refs.file.value = null
      this.fileByteArray = []
      this.$emit('select-item', this.fileByteArray)
    },
    handleImage (e) {
      if (e.target.files.length > 0) {
        // console.log(e.target.files)
        // e.target.files.map((element) => {
        //   this.fileName = element.name
        //   this.createBase64File(element)
        //   // if (element.type === 'application/pdf') {
        //   //   this.fileName = element.name
        //   //   this.createBase64File(element)
        //   // }
        // })

        Promise.all(
          [...e.target.files].map((element) => {
            this.fileName = [...this.fileName, element.name]
            this.createBase64File(element)
          })
        )
      } else {
        this.fileByteArray = []
        this.selectUploadItem()
      }
    },
    createBase64File (fileObject) {
      var reader = new FileReader()
      reader.fileName = this.fileName
      reader.onload = (e) => {
        var data = new Uint8Array(e.target.result)
        var byteString = btoa(
          new Uint8Array(data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte)
          }, '')
        )
        this.fileByteArray.push({
          DocumentName: e.target.fileName,
          Document: byteString
        })
        this.selectUploadItem()
      }
      reader.readAsArrayBuffer(fileObject)
      this.fileByteArray = []
    },
    selectUploadItem () {
      this.$emit('select-item', this.fileByteArray)
    }
  }
}
</script>
