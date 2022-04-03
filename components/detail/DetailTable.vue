<template>
  <v-data-table :headers="headers" v-bind="$attrs" hide-default-footer>
    <template #item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item.id)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { DataTableHeader } from 'vuetify'
import { TaskInterface } from '~/types/Task/task.types'

@Component({
  inheritAttrs: false,
})
export default class DetailTable extends Vue {
  @Prop({ required: true }) editItem!: (task: TaskInterface) => void
  @Prop({ required: true }) deleteItem!: (id: number) => void

  headers: DataTableHeader[] = [
    { text: 'Actions', value: 'actions', sortable: false, width: '100px' },
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
