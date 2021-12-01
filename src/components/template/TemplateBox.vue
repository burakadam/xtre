<template>
  <MainContainer>
    <LeftMenu :isMenuOpen="isMenuOpen" @menuButtonClick="handleMenuClick" />
    <div id="content">
      <Header :isMenuOpen="isMenuOpen" @menuButtonClick="handleMenuClick">
        <slot name="header" />
      </Header>
      <div id="x-content">
        <slot name="renderbody" />
      </div>
    </div>
  </MainContainer>
</template>
<script>
import MainContainer from '../main-container/MainContainer'
import LeftMenu from '../left-menu/LeftMenu'
import Header from '../header/Header.vue'
export default {
  name: 'TemplateBox',
  components: {
    MainContainer,
    LeftMenu,
    Header
  },
  data () {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    handleMenuClick () {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
}
</script>
<style>
#content {
  width: 100%;
  transition: width 250ms ease-in-out;
}

@media screen and (min-width: 1450px) {
  #content {
    transition: width 300ms ease-in-out;
  }
  #menu.active + #content {
    width: calc(100% - 100px);
  }
}

#content > div {
  width: 100%;
}
#x-content {
  padding-left: 12px;
}

@media screen and (max-width: 768px) {
  #x-content {
    padding-left: 0;
  }
}
</style>
