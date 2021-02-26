<template>
  <v-overlay
    :absolute="true"
    :value="openBasketPopUp"
    :opacity="0.7"
  >
    <v-card
      light
      class="d-flex flex-column col-12 pa-8"
      v-if="!shoppingBasket.length"
    >
      <v-row
        justify="end"
        align="start"
        class="pt-4 pr-8"
      >
        <v-icon
          light
          class="mt-4"
          @click="$emit('update:openBasketPopUp', false)"
        >
          $cross
        </v-icon>
      </v-row>
      <v-row
        justify='center'
      >
        <h1>
          Your basket is empty. Go to the store to fill it.
        </h1>
      </v-row>
      <v-row
        justify='center'
      >
        <v-btn
          dark
          color="pink darken-1"
          class="rounded-pill"
          @click="$emit('update:openBasketPopUp', false)"
        >
          Store
        </v-btn>
      </v-row>
    </v-card>
    <v-card
      light
      class="col-12  pa-8"
      v-else
    >
      <v-row
        justify="end"
        class="pt-4 pr-8"
      >
        <v-icon
          light
          @click="$emit('update:openBasketPopUp', false)"
        >
          $cross
        </v-icon>
      </v-row>
      <v-row
        justify='center'
      >
        <h1 class="headline font-weight-light">
          Basket
        </h1>
      </v-row>
      <v-row
        v-for="commodity in shoppingBasket" :key="commodity.commodityId"
        class="mb-5 d-flex align-center"
      >
        <v-col
          cols="12"
          class="d-flex justify-center col-lg-2"
        >
          <img height="80px" :src="commodity.imgUrl" alt="">
        </v-col>
        <v-col
          cols="12"
          class="col-lg-6"
        >
          <h3 class="headline font-weight-light text-center">{{ commodity.name }}</h3>
        </v-col>
        <v-col
          cols="6"
          class="d-flex justify-center col-lg-2"
        >
          <p class="subtitle-1 ma-0">$ {{ commodity.price }}</p>
        </v-col>
        <v-col
          cols="6"
          class="d-flex justify-center col-lg-2"
        >
          <v-btn
            icon
            color="red lighten-2"
            @click="removeFromShoppingBasket(commodity.commodityId)"
          >
            <v-icon>$trash</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row
        justify='center'
        class="d-flex align-self-end"
      >
        <h3 class="headline font-weight-light mb-5">
          All Price: ${{ allPrice.toFixed(2) }}
        </h3>
      </v-row>
    </v-card>
  </v-overlay>
</template>

<script>
export default {
  name: 'BasketPopUp',
  props: ['openBasketPopUp', 'commodities', 'shoppingBasket'],
  data: () => ({
    //
  }),
  computed: {
    allPrice() {
      let allPrise = 0;
      this.shoppingBasket.forEach((item) => {
        allPrise += item.price;
      });
      return allPrise;
    },
  },
  methods: {
    removeFromShoppingBasket(commodityId) {
      const arr = this.shoppingBasket.filter((item) => item.commodityId !== commodityId);
      this.$emit('update:shoppingBasket', arr);
    },
  },
};
</script>
