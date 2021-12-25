<template>
  <div class="w-half tsc-container">
    <shadow-content
      title="chargeability"
      titleIcon="fal fa-calendar-minus"
      :isBigger="true"
    >
      <div class="tsc-main">
        <p>{{ this.GetLabel(this, title) }}</p>
        <div class="tsc-status">
          <div
            :style="{
              width: (usedDays * 100) / (usedDays + remainsDays) + '%'
            }"
          >
            <span>{{ usedDays }} {{ this.GetLabel(this, 'days') }}</span>
          </div>
          <p>{{ remainsDays }} {{ this.GetLabel(this, 'days') }}</p>
        </div>
        <div>
          <span>{{ this.GetLabel(this, 'used') }}</span>
          <span>{{ this.GetLabel(this, 'remaning') }}</span>
        </div>
      </div>
    </shadow-content>
  </div>
</template>
<script>
import ShadowContent from '../shadow-content/ShadowContent.vue'

export default {
  components: { ShadowContent },
  props: {
    title: {
      type: String,
      default: 'a'
    },
    usedDays: {
      type: Number,
      default: 1
    },
    remainsDays: {
      type: Number,
      default: 1
    }
  }
}
</script>
<style scoped>
.tsc-container {
  margin-top: 38px;
}
.tsc-main {
  width: 100%;
  max-width: 455px;
  margin: 0 auto;
  font-size: 13px;
  color: #003462;
}
.tsc-status {
  width: 100%;
  height: 35px;
  background-color: #eceffa;
  border: 1px solid #979797;
  border-radius: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  padding-right: 15px;
  box-shadow: 0px 0px 6px rgb(0 0 0 / 30%);
}

.tsc-status p,
.tsc-status span,
.tsc-status + div span {
  margin-bottom: 0;
  font-family: 'Avenir-Black';
}
.tsc-status > div {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 10;
  background: #e99f28;
  border-radius: 5px;
  border: 1px solid #979797;
  display: flex;
  align-items: center;
  padding-left: 15px;
  color: #fff;
}
.tsc-status + div {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  margin-top: 15px;
  color: #003462;
}
</style>
