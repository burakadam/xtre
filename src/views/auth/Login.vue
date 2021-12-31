<template>
  <div>
    <div>
      <dxFormTextInput
        class="flex-grow-1"
        id="email-input"
        ref="emailRef"
        v-model="loginModel.email"
        placeholder="email"
        :clear="true"
        type="text"
        :hasBorder="true"
      />
    </div>
    <div>
      <dxFormTextInput
        class="flex-grow-1"
        id="password-input"
        ref="passwordRef"
        v-model="loginModel.password"
        placeholder="password"
        :clear="true"
        type="password"
      />
      <div class="right-sided">
        <v-btn text>
          {{ this.GetLabel(this, 'forgot-password') }}
        </v-btn>
      </div>
    </div>
    <div class="right-sided">
      <v-btn>
        {{ this.GetLabel(this, 'login') }}
      </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    dxFormTextInput: () =>
      import('Customcontrols/dxInput/dxFormTextInput/dxFormTextInput')
  },
  data () {
    return {
      loginModel: {
        email: '',
        password: ''
      }
    }
  }
}
</script>
<style scoped>
.right-sided {
  display: flex;
  justify-content: flex-end;
}

.flex-grow-1 + .right-sided {
  margin-bottom: 20px;
}

.flex-grow-1 + .right-sided .v-btn {
  padding: 0;
  height: auto !important;
}
</style>
