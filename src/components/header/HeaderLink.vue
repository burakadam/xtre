<template>
  <router-link
    :to="to"
    :title="this.GetLabel(this, title)"
    class="header__link"
  >
    <span class="header__link__text">{{ this.GetLabel(this, label) }}</span>
    <i :class="icon" v-if="icon"></i>
    <span v-if="bubble" class="header__link__bubble">{{ bubble }}</span>
  </router-link>
</template>
<script>
export default {
  name: 'HeaderLink',
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
    },
    bubble: {
      type: String
    }
  }
}
</script>
<style>
.header__link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--blueDark) !important;
  font-size: var(--fsm);
  margin-left: 18px;
  position: relative;
  text-transform: capitalize;
}
.header__link i {
  font-size: 18px;
  margin-left: 10px;
  color: var(--blueDark);
}
.header__link__bubble {
  height: 20px;
  line-height: 20px;
  position: absolute;
  background: var(--blue);
  color: var(--white);
  right: 0;
  top: 0;
  z-index: 20;
  border-radius: 10px;
  padding: 0 7px;
  font-size: var(--fxxxs);
  transform: translate3d(50%, -50%, 0);
}
.header__link.active {
  color: var(--blue) !important;
  font-weight: 600;
}
@media screen and (max-width: 1450px) {
  .header__link {
    margin-left: 10px;
  }
  .header__link__text {
    display: none;
  }
}
@media screen and (max-width: 700px) {
  .header__link {
    margin-left: 0;
  }
}
</style>
