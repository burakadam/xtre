<template>
  <div class="ts-form">
    <div class="ts-form__input day-box">
      <v-text-field :value="amount" type="number" />
    </div>
    <div class="ts-form__text">
      <v-text-field :value="title" />
    </div>
    <div class="ts-form-button-box">
      <v-btn icon x-small class="ts-form-edit">
        <i class="fa fa-edit"></i>
      </v-btn>
      <v-btn icon x-small class="ts-form-delete">
        <i class="fa fa-trash"></i>
      </v-btn>
    </div>
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
