<template>
  <v-date-picker
    type="month"
    :show-current="false"
    v-bind="$attrs"
    v-on="$listeners"
  ></v-date-picker>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  inheritAttrs: false,
})
export default class FormPeriod extends Vue {}
</script>
