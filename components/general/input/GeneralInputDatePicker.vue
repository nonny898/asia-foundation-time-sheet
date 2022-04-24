<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template #activator="{ on, attrs }">
        <general-input-text
          :value="getValue($attrs.value)"
          hide-details
          :clearable="!isRequired"
          :rules="isRequired ? requiredRules : []"
          readonly
          v-bind="attrs"
          v-on="{ ...on, ...$listeners }"
        >
          <v-icon slot="append" color="primary"> mdi-calendar </v-icon>
        </general-input-text>
      </template>
      <v-date-picker
        color="primary"
        no-title
        :show-current="false"
        v-bind="$attrs"
        @input="menu = false"
        v-on="$listeners"
      />
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import day from 'dayjs'

@Component({
  inheritAttrs: false,
})
export default class GeneralInputDatePicker extends Vue {
  @Prop({ default: false }) isRequired!: boolean
  @Prop({ default: '' }) placeholder!: string

  menu: boolean = false
  requiredRules = [(v: any) => !!v || 'Required field']

  getValue(value: string) {
    if (value) {
      return day(value).format('YYYY-MM-DD')
    }
    return ''
  }
}
</script>
