<template>
  <div v-if="!showProducts">
    <v-card class="first-screen d-flex flex-column justify-center ma-0 pa-0">
      <v-row
        justify="center"
        class="ma-0 pa-0"
      >
        <v-btn
          color="white"
          elevation="20"
          x-large
          outlined
          class="ma-5"
          @click="showSignIn = !showSignIn"
        >SignIn</v-btn>
        <v-btn
          color="white"
          elevation="20"
          x-large
          outlined
          class="ma-5"
          @click="showSignUp = !showSignUp"
        >SignUp</v-btn>
      </v-row>
      <v-row
        justify="center"
        class="ma-0 pa-0"
      >
        <v-btn
          class="ma-5"
          color="white"
          elevation="20"
          x-large
          outlined
          @click="checkShowProducts()"
        >Go To Products</v-btn>
      </v-row>
    </v-card>
    <SignIn
      :showSignIn.sync="showSignIn"
      :isLogin.sync="isLogin"
    />
    <SignUp
      :showSignUp.sync="showSignUp"
    />
    <NoLoged
      :showNoLoged.sync="showNoLoged"
     />
  </div>
</template>

<script>
import SignIn from './SignIn.vue';
import SignUp from './SignUp.vue';
import NoLoged from './NoLoged.vue';

export default {
  name: 'FirstScreen',
  props: ['showProducts', 'isLogin'],
  components: {
    SignIn,
    SignUp,
    NoLoged,
  },
  data: () => ({
    showSignIn: false,
    showSignUp: false,
    showNoLoged: false,
  }),
  methods: {
    checkShowProducts() {
      if (this.isLogin) {
        this.$emit('update:showProducts', true);
      } else {
        this.showNoLoged = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .first-screen{
    width: 100vw;
    height: 100vh;
    background-image: url(../assets/start-page-bg.jpg);
    background-size: cover;
    background-position: center center;
  }
</style>
