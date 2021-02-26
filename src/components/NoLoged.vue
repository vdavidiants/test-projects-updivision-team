<template>
  <v-overlay
    :absolute="true"
    :value="showNoLoged"
    :opacity="0.7"
  >
    <v-card
      light
      width="40vw"
      height="40vh"
    >
      <v-row
        justify="end"
        class="pt-4 pr-8"
      >
        <v-icon
          light
          @click="$emit('update:showNoLoged', false)"
        >
          $cross
        </v-icon>
      </v-row>
      <v-card
        flat
        height="50%"
        class="mt-16 d-flex justify-center align-center"
      >
        <h3 class="text-center">You are not registred.<br/>Register please and log In</h3>
      </v-card>
    </v-card>
  </v-overlay>
</template>

<script>
export default {
  name: 'NoLged',
  props: ['showNoLoged'],
};
</script>
