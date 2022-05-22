<template>
  <div>
    <div class="headline pa-4">
      <div class="d-flex align-center">
        <v-icon class="mr-2" color="primary"> mdi-information-outline </v-icon>
        <span>Main Information</span>
      </div>
      <v-divider class="mt-2" />
    </div>
    <div>
      <v-row>
        <v-col cols="12" sm="6">
          <div class="field-label">Name</div>
          <general-input-text v-model="$attrs.value.name" hide-details />
        </v-col>
        <v-col cols="12" sm="6">
          <div class="field-label">Pay Period</div>
          <general-input-text
            v-model="$attrs.value.payPeriod"
            disabled
            hide-details
          />
        </v-col>
        <v-col cols="12" sm="6">
          <div class="field-label">Charge String</div>
          <general-input-text
            v-model="$attrs.value.chargeString"
            hide-details
          />
        </v-col>
        <v-col cols="12" sm="6">
          <div class="field-label">Last Modified</div>
          <general-input-text
            v-model="$attrs.value.date"
            disabled
            hide-details
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  inheritAttrs: false,
})
export default class FormInfo extends Vue {}
</script>
