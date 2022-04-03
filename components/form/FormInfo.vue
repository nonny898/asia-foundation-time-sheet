<template>
  <v-card>
    <v-card-title class="headline"> Main Information </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="3">
          <v-text-field
            v-model="$attrs.value.name"
            label="Name"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <v-text-field
            v-model="$attrs.value.payPeriod"
            label="Pay Period"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <v-text-field
            v-model="$attrs.value.chargeString"
            label="Charge String"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <v-text-field
            v-model="$attrs.value.date"
            label="Date"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class FormInfo extends Vue {}
</script>
