<template>
  <v-data-table :headers="headers" v-bind="$attrs" hide-default-footer>
  </v-data-table>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { DataTableHeader } from 'vuetify'

@Component({
  inheritAttrs: false,
})
export default class DetailTable extends Vue {
  headers: DataTableHeader[] = [
    {
      text: 'Date',
      value: 'date',
      width: '150px',
    },
    { text: 'Hours Worked', value: 'hours', width: '150px' },
    { text: 'Work with Staff', value: 'staff', width: '150px' },
    { text: 'Desciption of Work Completed', value: 'description' },
  ]
}
</script>
