<template>
  <v-textarea
    solo
    flat
    :background-color="'#FFF'"
    :rows="row"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({
  inheritAttrs: false,
})
export default class GeneralInputText extends Vue {
  @Prop({ default: '10' }) row!: string
}
</script>
