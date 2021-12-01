<template>
  <div id="menu" :class="isMenuOpen ? 'active' : ''">
    <button
      type="button"
      id="menu__mobile-close-btn"
      @click="handleMenuButtonClick"
    >
      <span>{{ this.GetLabel(this, 'closex') }}</span>
      <i class="fal fa-times"></i>
    </button>
    <nav>
      <MenuItem to="/#" title="xtre" icon="fal fa-border-all" label="xtre" />
      <MenuItem
        to="/finance"
        title="finance"
        icon="fal fa-ballot"
        label="finance"
      />
      <MenuItem
        to="/expense"
        title="expense"
        icon="fal fa-receipt"
        label="expense"
      />
      <MenuItem
        to="/documents"
        title="documents"
        icon="fal fa-file-invoice"
        label="documents"
      />
      <MenuItem
        to="/timesheet"
        title="timesheet"
        icon="fal fa-calendar-edit"
        label="timesheet"
      />
      <MenuItem
        to="/pricing"
        title="pricing"
        icon="fal fa-tag"
        label="pricing"
      />
      <div id="menu__logout">
        <i class="fal fa-user"></i>
        <v-btn class="ma-2" outlined>
          {{ this.GetLabel(this, 'navbar_logout') }}</v-btn
        >
      </div>
    </nav>
  </div>
</template>
<script>
import MenuItem from './MenuItem.vue'
export default {
  name: 'LeftMenu',
  components: {
    MenuItem
  },
  props: {
    isMenuOpen: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleMenuButtonClick () {
      this.$emit('menuButtonClick')
    }
  }
}
</script>
<style>
#menu {
  max-width: 0;
  overflow: hidden;
  flex-shrink: 0;
  transition: max-width 300ms ease-in-out;
}
#menu__mobile-close-btn {
  display: none;
}
#menu.active {
  max-width: 100px;
}
#menu nav {
  display: flex;
  flex-direction: column;
}
#menu nav > * {
  width: 75px;
  margin-right: 25px;
}
#menu__logout {
  padding: 12.5px 0 3.5px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#menu__logout i {
  font-size: 26px;
  color: var(--blueDark);
  margin-bottom: 10px;
}
@media screen and (max-width: 1450px) {
  #menu {
    position: absolute;
    background: var(--white);
    z-index: 50;
    top: 0;
    bottom: 0;
    padding-top: var(--sxxl);
    left: 0;
  }
  #menu__mobile-close-btn {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 30px;
    border-bottom: 1px solid var(--blueLight);
    text-transform: uppercase;
    font-size: var(--fxxs);
  }
  #menu nav {
    border-right: 1px solid var(--blueLight);
  }
  #menu nav > * {
    margin: 0 12px;
  }
}
@media screen and (max-width: 60px) {
  #menu {
    padding-top: 15px;
  }
}
</style>
