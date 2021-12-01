<template>
  <div id="main-container" class="v-application">
    <slot />
  </div>
</template>
<style>
#main-container {
  width: 100%;
  max-width: 1400px;
  background: var(--white);
  margin: 0 auto;
  padding: 15px;
  border-radius: 15px;
  display: flex;
  min-height: calc(100vh - 52px);
  position: relative;
}
@media screen and (max-width: 600px) {
  #main-container {
    padding: 15px;
    min-height: calc(100vh - 16px);
  }
}
</style>
