<template>
  <div>
    <v-toolbar dense>
      <v-toolbar-title>
        <v-btn
          dark
          color="pink darken-1"
          class="rounded-pill"
          @click="singOut"
        >
          Sign Out
        </v-btn>
      </v-toolbar-title>
      <v-spacer/>
      <v-btn
        icon
        class="mr-10"
        @click="openBasketPopUp = !openBasketPopUp"
      >
        <v-badge
          :content="shoppingBasket.length"
          :value="shoppingBasket.length"
          color="pink darken-1"
          overlap
        >
          <v-icon>$cart</v-icon>
        </v-badge>
      </v-btn>
    </v-toolbar>
    <v-container class="d-flex justify-center mb-5">
      <v-card
        flat
        max-width="1200px"
      >
        <v-row class="mt-5">
          <v-col
            v-for="commodity in commodities" :key="commodity.commodityId"
            cols="12"
            class="col-sm-6 col-md-3"
          >
            <v-card class="my-5 d-flex flex-column align-center rounded-lg" >
              <v-card
                width="85%"
                :elevation="8"
                class="mt-n8 rounded-lg"
              >
                <img width="100%" :src="commodity.imgUrl" alt="">
              </v-card>
              <v-card-title class="mt-5">
                <h3>{{ commodity.brand }}</h3>
              </v-card-title>
              <v-card
                flat
                width="100%"
                class="d-flex justify-space-between align-center pa-3 pt-0"
              >
                <v-card-text>
                  <p class="mb-0 subtitle-1">$ {{ commodity.price }}</p>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    dark
                    color="pink darken-1"
                    class="rounded-pill"
                    @click="showActiveCommodityPopUp(commodity.commodityId)"
                  >
                    DETAILS
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <CommodityInformationPopUp
        :activeCommodityId="activeCommodityId"
        :commodities="commodities"
        :shoppingBasket.sync="shoppingBasket"
        :openPopUp.sync="openPopUp"
      />
      <BasketPopUp
        :commodities="commodities"
        :shoppingBasket.sync="shoppingBasket"
        :openBasketPopUp.sync="openBasketPopUp"
      />
    </v-container>
  </div>
</template>

<script>
import CommodityInformationPopUp from './CommodityInformationPopUp.vue';
import BasketPopUp from './BasketPopUp.vue';
import commodities from '../data/mockData';

export default {
  name: 'Products',
  props: ['showProducts', 'isLogin'],
  components: {
    CommodityInformationPopUp,
    BasketPopUp,
  },
  data: () => ({
    openPopUp: false,
    openBasketPopUp: false,
    activeCommodityId: '',
    commodities,
    shoppingBasket: [],
  }),
  methods: {
    showActiveCommodityPopUp(commodityId) {
      this.openPopUp = !this.openPopUp;
      this.activeCommodityId = commodityId;
    },
    singOut() {
      this.$emit('update:isLogin', false);
      this.$emit('update:showProducts', false);
    },
  },
};
</script>
