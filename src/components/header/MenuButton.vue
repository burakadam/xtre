<template>
  <button
    type="button"
    id="menu-button"
    :class="isMenuOpen ? 'active' : ''"
    v-on="$listeners"
    v-bind="$attrs"
  >
    <span></span><span></span><span></span>
  </button>
</template>
<script>
export default {
  props: {
    isMenuOpen: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style>
#menu-button {
  width: 38px;
  height: 34px;
  position: relative;
}
#menu-button span {
  width: 20px;
  height: 1px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background-color: var(--blueDark);
  transform-origin: left;
  transition: transform 250ms ease-in-out, opacity 250ms ease-in-out;
}
#menu-button span:first-child {
  transform: translate3d(0, -7px, 0);
}
#menu-button span:last-child {
  transform: translate3d(0, 7px, 0);
}
#menu-button.active span:first-child {
  transform: translate3d(0, -7px, 0) rotate(45deg);
}
#menu-button.active span:last-child {
  transform: translate3d(0, 7px, 0) rotate(-45deg);
}
#menu-button.active span:nth-of-type(2) {
  opacity: 0;
}
</style>
