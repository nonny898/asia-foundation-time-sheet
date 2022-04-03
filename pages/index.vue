<template>
  <div>
    <v-row>
      <v-col cols="12">
        <form-info v-model="information" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <form-task v-model="newTask" @click="handleConfirm" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <detail-template
          :information="information"
          :tasks="tasks"
          :edit-item="handleEditTask"
          :delete-item="handleDeleteTask"
        />
      </v-col>
    </v-row>
    <general-dialog
      v-model="editDialog"
      :max-width="750"
      @click:outside="() => (isEdit = false)"
    >
      <template #dialog-content>
        <form-task
          v-model="existingTask"
          :is-edit="true"
          @click="handleConfirm"
        />
      </template>
    </general-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { TaskInterface } from '~/types/Task/task.types'

export interface InformationInterface {
  name: string
  payPeriod: string
  chargeString: string
  date: string
}

@Component({})
export default class MainPage extends Vue {
  tasks: TaskInterface[] = []

  information: InformationInterface = {
    name: '',
    payPeriod: '',
    chargeString: '',
    date: '',
  }

  newTask: TaskInterface = {
    id: 0,
    date: '',
    hours: 0,
    staff: '',
    description: '',
  }

  existingTask: TaskInterface | null = null

  isEdit: boolean = false
  editDialog: boolean = false

  resetId() {
    const newTaskList = []
    for (let id = 0; id < this.tasks.length; id++) {
      newTaskList.push({
        ...this.tasks[id],
        id,
      })
    }
    this.tasks = newTaskList
  }

  handleAddTask(payload: TaskInterface) {
    this.resetId()
    this.tasks.push({
      ...payload,
      id: this.tasks.length,
    })
  }

  handleEditTask(payload: TaskInterface) {
    this.existingTask = payload
    this.isEdit = true
    this.editDialog = true
  }

  handleConfirm() {
    if (this.isEdit) {
      this.tasks = this.tasks.map((task) => {
        if (this.existingTask && this.existingTask.id === task.id) {
          return this.existingTask
        }
        return task
      })
      this.isEdit = false
      this.editDialog = false
    } else {
      this.handleAddTask(this.newTask)
      this.newTask = {
        id: 0,
        date: '',
        hours: 0,
        staff: '',
        description: '',
      }
    }
  }

  handleDeleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id)
  }
}
</script>
