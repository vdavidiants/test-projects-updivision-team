import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    values: {
      email: 'mdi-email',
      lock: 'mdi-lock-outline',
      eye: 'mdi-eye',
      eyeOff: 'mdi-eye-off',
      calendar: 'mdi-calendar-blank',
      user: 'mdi-account',
      cross: 'mdi-close-thick',
      cart: 'mdi-cart',
      trash: 'mdi-trash-can-outline',
    },
  },
});
