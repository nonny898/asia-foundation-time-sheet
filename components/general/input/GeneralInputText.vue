<template>
  <v-text-field
    solo
    flat
    :background-color="isLogin ? '#F3F5F8' : '#FFF'"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template #append>
      <slot name="append" />
    </template>
  </v-text-field>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({
  inheritAttrs: false,
})
export default class GeneralInputText extends Vue {
  @Prop({ default: false }) isLogin!: boolean
}
</script>
