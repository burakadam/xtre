<template>
  <div>
    <div class="images" v-viewer>
      <img v-for="src in images" :key="src" :src="src" />
    </div>
  </div>
</template>
<script>
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import Vue from 'vue'
Vue.use(VueViewer)
export default {
  props: {
    images: {
      typeof: Array,
      default: () => []
    }
  },
  methods: {
    show () {
      this.$viewerApi({
        images: this.images
      })
    }
  }
}
</script>
