<template>
 <v-treeview
    v-if="!selectable"
    v-model="selectedTreeModel"
    shaped
    hoverable
    activatable
    :items="items"
    open-on-click
    expand-icon="fa fa-chevron-down"
     @update:active="onUpdate"
     return-object
  ></v-treeview>
    <v-treeview
    v-else
    selectable
    :items="items"
    open-on-click
    return-object
    transition
    @update:active="onUpdate"
    v-model="selectedTreeModel"
    :on-icon="'fal fa-check'"
    :off-icon="'fal fa-square'"
    expand-icon="fa fa-chevron-down"
  ></v-treeview>
</template>

<script>

export default {
  name: 'dxTreeView',
  props: {
    items: {
      type: Array,
      required: false
    },
    selectable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      selectedTreeModel: []
    }
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    onUpdate: function (selection) {
      this.$emit('selected', selection)
    }
  }
}
</script>
