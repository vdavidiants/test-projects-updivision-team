<template>
  <v-overlay
    :absolute="true"
    :value="showSignIn"
    :opacity="0.7"
  >
    <v-card
      width="400px"
      flat
      class="login d-flex flex-column align-center"
    >
      <v-card
        :elevation="24"
        width="80%"
        height="75px"
        dark
        class="login-title rounded-lg d-flex justify-center align-center mt-n10"
      >
        Login
      </v-card>
      <v-card
        light
        width="100%"
        class="pt-16 pa-9"
      >
        <v-row>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            color="purple darken-1"
            label="Email..."
            prepend-icon="$email"
            required
          >
          </v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? '$eye' : '$eyeOff'"
            :rules="[rules.required, rules.min]"
            :type="showPassword ? 'text' : 'password'"
            color="purple darken-1"
            label="Password..."
            prepend-icon="$lock"
            @click:append="showPassword = !showPassword"
          >
          </v-text-field>
        </v-row>
        <v-row
          justify="space-between"
        >
          <v-btn
            text
            plain
            @click="$emit('update:showSignIn', false)"
          >
            CANSEL
          </v-btn>
          <v-btn
            :disabled="!email.length || !password.length || password.length < 8"
            text
            plain
            color="pink darken-1"
            @click="logIn()"
          >
            LETS GO
          </v-btn>
        </v-row>
      </v-card>
    </v-card>
  </v-overlay>
</template>

<script>
export default {
  name: 'SignIn',
  props: {
    showSignIn: Boolean,
    isLogin: Boolean,
  },
  data() {
    return {
      showPassword: false,
      password: '',
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 8 || 'Min 8 characters',
      },
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    };
  },
  methods: {
    logIn() {
      if (localStorage.getItem('users')) {
        const users = JSON.parse(localStorage.getItem('users'));
        const logInUser = users.find((item) => item.email === this.email);
        if (logInUser) {
          if (logInUser.password === this.password) {
            this.$emit('update:isLogin', true);
          }
        }
        this.$emit('update:showSignIn', false);
        this.password = '';
        this.email = '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .bg-login{
    background: #00000000 !important;
  }
  .login{
    position: relative;
    background: #00000000 !important;
  }
  .login-title{
    position: absolute;
    z-index: 2;
    background: linear-gradient(to right, #a844ba, #7b24a0);
  }
</style>
