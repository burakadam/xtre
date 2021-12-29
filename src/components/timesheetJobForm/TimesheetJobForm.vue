<template>
  <div class="ts-form">
    <div class="ts-form__input day-box">
      <v-text-field :value="amount" type="number" />
    </div>
    <div class="ts-form__text">
      <v-text-field :value="title" />
    </div>
    <v-btn icon x-small class="ts-form-delete">
      <i class="fa fa-trash"></i>
    </v-btn>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String
    },
    amount: {
      type: Number
    }
  }
}
</script>
