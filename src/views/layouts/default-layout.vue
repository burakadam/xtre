<template>
  <TemplateBox>
    <template #renderbody>
      <router-view></router-view>
    </template>
  </TemplateBox>
</template>

<script>
import TemplateBox from '@/components/template/TemplateBox.vue'

export default {
  name: 'DefaultLayout',
  components: {
    TemplateBox
  }
}
</script>
