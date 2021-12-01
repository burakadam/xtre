<template>
  <TemplateBox>
    <template #header>
      <HeaderLink
        to="/finance"
        label="finance"
        title="finance"
        icon="fal fa-home"
      />
      <HeaderLink
        to="/accounting"
        label="accounting"
        title="accounting"
        icon="fal fa-money-check"
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
  name: 'FinanceLayout',
  components: {
    TemplateBox,
    HeaderLink
  }
}
</script>
