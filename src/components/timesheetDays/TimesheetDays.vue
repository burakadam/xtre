<template>
  <div class="d-flex">
    <div v-for="(item, index) in dates" class="day-box date">
      <p :key="index">
        {{ item.day }}
        {{ item.name }}
      </p>
    </div>
    <div class="day-box date">
      <p>{{ this.GetLabel(this, 'total') }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dates: {
      type: Array,
      default: () => []
    }
  }
}
</script>
