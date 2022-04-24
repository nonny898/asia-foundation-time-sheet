<template>
  <v-dialog v-bind="$attrs" v-on="$listeners">
    <slot name="dialog-content" />
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  inheritAttrs: false,
  components: {},
})
export default class GeneralDialog extends Vue {}
</script>
