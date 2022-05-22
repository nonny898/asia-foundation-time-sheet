<template>
  <div>
    <v-data-table
      class="template-table"
      :headers="headers"
      v-bind="$attrs"
      hide-default-footer
      disable-sort
    >
      <template #item.edit="{ item }">
        <v-icon small color="primary" class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
      </template>
      <template #item.delete="{ item }">
        <v-icon small color="error" @click="handleDelete(item.id)">
          mdi-delete
        </v-icon>
      </template>
      <template #item.staff="{ item }">
        <span v-if="item.staff === ''"> - </span>
        <span v-else> {{ item.staff }} </span>
      </template>
    </v-data-table>

    <general-dialog v-model="deleteDialog" :max-width="400" persistent>
      <template #dialog-content>
        <v-row class="form-task__container">
          <v-col cols="12">
            <div>Delete Task?</div>
          </v-col>
          <v-col cols="12">
            Please confirm your operation in deleting the selected task
          </v-col>
          <v-col cols="12" sm="6">
            <general-button :text="'Cancel'" @click="handleCancel" />
          </v-col>
          <v-col cols="12" sm="6" align="end">
            <general-button
              color="error"
              :text="'Confirm'"
              @click="confirmDelete"
            />
          </v-col>
        </v-row>
      </template>
    </general-dialog>
  </div>
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
  @Prop({ required: true }) deleteItem!: (id: string) => void

  deleteDialog: boolean = false

  deleteItemId: string = ''

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

  handleDelete(id: string) {
    this.deleteItemId = id
    this.deleteDialog = true
  }

  handleCancel() {
    this.deleteItemId = ''
    this.deleteDialog = false
  }

  confirmDelete() {
    if (this.deleteItemId !== '') {
      this.deleteItem(this.deleteItemId)
    }
    this.deleteDialog = false
  }
}
</script>
