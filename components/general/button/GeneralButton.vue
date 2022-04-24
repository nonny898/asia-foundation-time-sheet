<template>
  <v-btn :block="isBlock" depressed v-bind="$attrs" v-on="$listeners">
    {{ text }}
  </v-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({
  inheritAttrs: false,
})
export default class GeneralButton extends Vue {
  @Prop({ required: true }) text!: string
  @Prop({ default: false }) isBlock!: boolean
}
</script>
