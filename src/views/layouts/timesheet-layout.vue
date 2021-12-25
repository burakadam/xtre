<template>
  <TemplateBox>
    <template #header>
      <HeaderLink
        to="/timesheet"
        label="timesheet"
        title="timesheet"
        icon="fal fa-home"
      />
      <HeaderLink
        to="/timesheet/detail"
        label="timesheet-add"
        title="timesheet-add"
        icon="fal fa-calendar-edit"
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
  name: 'TimesheetLayout',
  components: {
    TemplateBox,
    HeaderLink
  }
}
</script>
