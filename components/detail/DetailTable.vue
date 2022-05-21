<template>
  <v-data-table
    class="template-table"
    :headers="headers"
    v-bind="$attrs"
    hide-default-footer
  >
    <template #item.edit="{ item }">
      <v-icon small color="primary" class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
    </template>
    <template #item.delete="{ item }">
      <v-icon small color="error" @click="deleteItem(item.id)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { DataTableHeader } from 'vuetify'
import { TaskDetailInterface } from '~/types/Task/task.types'

@Component({
  inheritAttrs: false,
})
export default class DetailTable extends Vue {
  @Prop({ required: true }) editItem!: (task: TaskDetailInterface) => void
  @Prop({ required: true }) deleteItem!: (id: number) => void

  headers: DataTableHeader[] = [
    { text: '', value: 'edit', sortable: false, width: '20px' },
    {
      text: 'Date',
      value: 'date',
      width: '150px',
    },
    { text: 'Hours', value: 'hours', width: '125px' },
    { text: 'Staff', value: 'staff', width: '150px' },
    { text: 'Desciption of Work Completed', value: 'description' },
    { text: '', value: 'delete', sortable: false, width: '20px' },
  ]
}
</script>
