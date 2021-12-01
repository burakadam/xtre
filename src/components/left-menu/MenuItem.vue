<template>
  <router-link :to="to" :title="this.GetLabel(this, title)" class="nav__item">
    <i :class="icon" v-if="icon"></i>
    <span>{{ this.GetLabel(this, label) }}</span>
  </router-link>
</template>
<script>
export default {
  name: 'Link',
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>
<style>
.nav__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  border-bottom: 1px solid var(--greyDark);
  padding: 12.5px 0 3.5px 0;
}
.nav__item i {
  font-size: 26px;
  color: var(--blueDark);
}
.nav__item.active i {
  color: var(--blue);
  font-weight: 500;
}
.nav__item span {
  font-size: var(--fxxs);
  color: var(--black);
  display: block;
  margin-top: 3.5px;
}
</style>
