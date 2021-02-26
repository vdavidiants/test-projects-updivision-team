<template>
  <v-overlay
    :absolute="true"
    :value="openPopUp"
    :opacity="0.7"
  >
    <v-card
      light
      class="col-md-8 offset-md-2"
    >
      <v-row
        justify="end"
        class="pt-4 pr-8"
      >
        <v-icon
          light
          @click="$emit('update:openPopUp', false)"
        >
          $cross
        </v-icon>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          class="d-flex justify-center align-center col-md-5"
        >
          <img height="60%" :src="activeCommodity.imgUrl" alt="">
        </v-col>
        <v-col
          cols="12"
          class="col-md-7"
        >
          <v-card
            flat
          >
            <v-card-title>
              <h1 class="display-1">{{ activeCommodity.name }}</h1>
            </v-card-title>
            <v-card-subtitle>
              <p class="headline font-weight-light mb-16">{{ activeCommodity.price }}</p>
            </v-card-subtitle>
            <v-card-text>
              <h4
                class="pink--text text--darken-1 font-weight-light mb-2"
              >Description</h4>
              <hr/>
              <p class="mt-2">{{ activeCommodity.description }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                dark
                large
                color="pink darken-1"
                class="rounded-pill pa-4 ml-2 mt-6 caption"
                @click="addToCard(activeCommodity.commodityId)"
              >
                ADD TO CART
                <v-icon class="ml-2">
                  $cart
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-overlay>
</template>

<script>
export default {
  name: 'CommodityInformationPopUp',
  props: ['openPopUp', 'commodities', 'activeCommodityId', 'shoppingBasket'],
  data: () => ({
    //
  }),
  computed: {
    activeCommodity() {
      return this.commodities.find((item) => item.commodityId === this.activeCommodityId);
    },
  },
  methods: {
    addToCard(commodityId) {
      if (!this.shoppingBasket.find((item) => item.commodityId === commodityId)) {
        this.shoppingBasket.push(this.commodities.find((item) => item.commodityId === commodityId));
      }
      this.$emit('update:openPopUp', false);
    },
  },
};
</script>
