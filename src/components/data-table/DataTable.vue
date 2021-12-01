<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="itemsPerPage"
    :hide-default-footer="hideDefaultFooter"
    :mobile-breakpoint="null"
  >
    <template v-slot:item.actions="{ item }">
      <slot :item="item" />
    </template>
  </v-data-table>
</template>
<script>
export default {
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    itemsPerPage: {
      type: Number,
      default: 5
    },
    hideDefaultFooter: {
      type: Boolean,
      default: true
    }
  }
}
</script>
