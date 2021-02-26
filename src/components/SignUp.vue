<template>
  <v-overlay
    :absolute="true"
    :value="showSignUp"
    :opacity="0.7"
    color="purple lighten-1"
  >
    <v-card
      flat
      width="400px"
      class="login d-flex flex-column align-center"
    >
      <v-card
        light
        width="100%"
        class=" pa-9"
      >
        <v-row justify="end">
          <v-icon
            light
            @click="$emit('update:showSignUp', false)"
          >
            $cross
          </v-icon>
        </v-row>
        <v-row ustify="center">
          <h3>Register</h3>
        </v-row>
        <v-row>
          <v-text-field
            v-model="registrationData.name"
            color="purple darken-1"
            label="Name"
            prepend-icon="$user"
            :rules="[rules.required]"
          />
        </v-row>
        <v-row>
          <v-text-field
            v-model="registrationData.email"
            color="purple darken-1"
            label="Email"
            prepend-icon="$email"
            :rules="emailRules"
          />
        </v-row>
        <v-row>
          <v-menu
            v-model="startDateMenu"
            :close-on-content-click="false"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="registrationData.startDate"
                color="purple darken-1"
                v-bind="attrs"
                v-on="on"
                type="text"
                readonly
                label="Education Start Date"
                prepend-icon="$calendar"
              />
            </template>
            <v-date-picker
              v-model="registrationData.startDate"
              @input="startDateMenu = false"
            />
          </v-menu>
        </v-row>
        <v-row>
          <v-menu
            v-model="endDateMenu"
            :close-on-content-click="false"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                color="purple darken-1"
                type="text"
                v-model="registrationData.endDate"
                readonly
                v-bind="attrs"
                v-on="on"
                label="Education End Date"
                prepend-icon="$calendar"
              />
            </template>
            <v-date-picker
              v-model="registrationData.endDate"
              @input="endDateMenu = false"
            />
          </v-menu>
        </v-row>
        <v-row>
          <v-text-field
            v-model="registrationData.password"
            :append-icon="showPassword ? '$eye' : '$eyeOff'"
            :rules="[rules.required, rules.min]"
            :type="showPassword ? 'text' : 'password'"
            color="purple darken-1"
            label="Password"
            prepend-icon="$lock"
            @click:append="showPassword = !showPassword"
          />
        </v-row>
        <v-row>
          <v-text-field
            v-model="registrationData.confirmPassword"
            :append-icon="showConfirmPassword ? '$eye' : '$eyeOff'"
            :rules="[rules.required, rules.min, rules.confirmPassword]"
            :type="showConfirmPassword ? 'text' : 'password'"
            color="purple darken-1"
            label="Confirm Password"
            prepend-icon="$lock"
            @click:append="showConfirmPassword = !showConfirmPassword"
          />
        </v-row>
        <v-row>
          <v-checkbox
            v-model="agryToTerms"
            light
            background-color="white"
            color="purple darken-1"
          >
            <template v-slot:label>
              <div>
                I agree to the
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <a
                      target="_blank"
                      href="https://en.wikipedia.org/wiki/Terms_of_service"
                      @click.stop
                      v-on="on"
                      color="purple darken-1"
                    >
                      terms and conditions
                    </a>
                  </template>
                  Opens in new window
                </v-tooltip>
              </div>
            </template>
          </v-checkbox>
        </v-row>
        <v-row
          justify="center"
        >
          <v-btn
            dark
            color="purple darken-1"
            :disabled="!registrationData.name.length
              || !registrationData.email.length
              || !registrationData.password.length
              || !registrationData.confirmPassword.length
              || !agryToTerms"
            class="rounded-pill"
            @click="checkIn(registrationData)"
          >
            GET STARTED
          </v-btn>
        </v-row>
      </v-card>
    </v-card>
  </v-overlay>
</template>

<script>
export default {
  name: 'SignUp',
  props: {
    showSignUp: Boolean,
  },
  data() {
    return {
      startDateMenu: false,
      endDateMenu: false,
      registrationData: {
        name: '',
        email: '',
        startDate: null,
        endDate: null,
        password: '',
        confirmPassword: '',
      },
      agryToTerms: false,
      showPassword: false,
      showConfirmPassword: false,
      rules: {
        confirmPassword: (value) => value === this.registrationData.password || 'Password mismatch',
        required: (value) => !!value || 'Required.',
        min: (value) => value.length >= 8 || 'Min 8 characters',
      },
      emailRules: [
        (value) => !!value || 'E-mail is required',
        (value) => /.+@.+/.test(value) || 'E-mail must be valid',
      ],
    };
  },
  methods: {
    checkIn(registrationData) {
      if (localStorage.getItem('users') === null) {
        localStorage.setItem('users', JSON.stringify([]));
      }
      const users = JSON.parse(localStorage.getItem('users'));
      if (!users.find((item) => item.email === registrationData.email)) {
        users.push(registrationData);
      }
      localStorage.setItem('users', JSON.stringify(users));
      this.registrationData.name = '';
      this.registrationData.email = '';
      this.registrationData.startDate = null;
      this.registrationData.endDate = null;
      this.registrationData.password = '';
      this.registrationData.confirmPassword = '';
      this.agryToTerms = false;
      this.$emit('update:showSignUp', false);
    },
  },
};
</script>

<style lang="scss" scoped>
  .theme--dark.v-btn.v-btn--disabled.v-btn--has-bg {
      background-color: rgba(0, 0, 0, 0.2) !important;
  }
  .theme--dark.v-btn.v-btn--disabled {
      color: rgba(255, 255, 255, 0.8) !important;
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
  .v-application a {
    color: #7b24a0;
    text-decoration: none;
  }
</style>
