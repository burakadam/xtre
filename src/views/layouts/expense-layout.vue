<template>
  <TemplateBox>
    <template #header>
      <HeaderLink
        to="/expense"
        label="expense"
        title="expense"
        icon="fal fa-home"
      />

      <HeaderLink
        to="/reports"
        label="reports"
        title="reports"
        icon="fal fa-chart-bar"
      />
    </template>
    <template #renderbody>
      <router-view></router-view>
    </template>
  </TemplateBox>
</template>

<script>
import TemplateBox from '@/components/template/TemplateBox.vue'
import HeaderLink from '../../components/header/HeaderLink.vue'

export default {
  name: 'ExpenseLayout',
  components: {
    TemplateBox,
    HeaderLink
  }
}
</script>
