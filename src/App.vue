<template>
  <v-app>
    <v-main>
      <FirstScreen
        :showProducts.sync="showProducts"
        :isLogin.sync="isLogin"
      />
      <Products
        v-if="showProducts"
        :showProducts.sync="showProducts"
        :isLogin.sync="isLogin"
      />
    </v-main>
  </v-app>
</template>

<script>
import Products from './components/Products.vue';
import FirstScreen from './components/FirstScreen.vue';

export default {
  name: 'App',
  components: {
    Products,
    FirstScreen,
  },

  data: () => ({
    showProducts: false,
    isLogin: false,
  }),
};
</script>

<style lang="scss" scoped>

</style>
