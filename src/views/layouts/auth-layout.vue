<template>
  <div id="auth-container">
    <div id="auth-content">
      <v-img
        alt="Xtre"
        class="header__logo"
        src="@/assets/images/xtre-icon.svg"
        id="auth-logo"
      ></v-img>

      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AuthLayout'
}
</script>
<style scoped>
#auth-container {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#auth-content {
  width: 100%;
  height: 100%;
  max-width: 400px;
  background: var(--white);
  border-radius: 5px;
  padding: 20px;
  box-shadow: 2px 2px 12px rgb(0 0 0 / 30%);
}
#auth-logo {
  width: 70px;
  flex-grow: 0;
  margin-bottom: 20px;
}
</style>
