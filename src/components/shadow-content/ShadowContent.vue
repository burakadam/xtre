<template>
  <div class="shadow-content">
    <div :class="`shadow-content__header ${isBigger ? 'big' : ''}`">
      <div v-if="title" class="shadow-content__header__title">
        <i v-if="titleIcon" :class="titleIcon"> </i>
        <h4 v-if="title">{{ this.GetLabel(this, title) }}</h4>
      </div>
      <router-link :to="to" :title="this.GetLabel(this, linkText)" v-if="to">
        {{ this.GetLabel(this, linkText) }}
      </router-link>
    </div>
    <div class="shadow-content__content shadow-box">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String
    },
    titleIcon: {
      type: String
    },
    to: {
      type: String,
      default: '/'
    },
    linkText: {
      type: String
    },
    isBigger: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style>
.shadow-content {
  width: 100%;
}
.shadow-content__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-right: 1.5em;
}
.shadow-content__header > a {
  text-decoration: none;
  color: var(--blueDark) !important;
  font-size: var(--fxs);
}
.shadow-content__header__title {
  display: flex;
  align-items: flex-end;
  color: var(--blueDark);
  text-transform: capitalize;
}
.shadow-content__header__title i {
  font-size: 18px;
  margin-right: 0.4em;
}
.big .shadow-content__header__title i {
  font-size: 28px;
  margin-left: 1em;
}

.big .shadow-content__header__title i + h4 {
  margin-bottom: 0.5em;
}

.shadow-content__content {
  padding: 32px 17px;
  border-radius: 20px;
  margin-top: 10px;
}
@media screen and (max-width: 1024px) {
  .shadow-content__header__title i {
    font-size: 16px;
  }
}

@media screen and (max-width: 600px) {
  .shadow-content.full-m .shadow-content__content {
    padding: 32px 0px;
  }
}
</style>
