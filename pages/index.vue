<template>
  <div>
    <v-row>
      <v-col cols="auto">
        <form-period v-model="monthPicker" @change="handlePeriodChange" />
      </v-col>
      <v-col>
        <form-info v-model="information" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <detail-template
          :tasks="tasks"
          :edit-item="handleEditTask"
          :delete-item="handleDeleteTask"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <form-task
          v-model="newTask"
          :start-month-date="startMonthDate"
          :end-month-date="endMonthDate"
          :loading-confirm-add="loadingConfirmAdd"
          @click="handleConfirm"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <detail-summary
          :information="information"
          :tasks="tasks"
          :import-tasks="importTasks"
        />
      </v-col>
    </v-row>
    <general-dialog v-model="editDialog" :max-width="750" persistent>
      <template #dialog-content>
        <form-task
          v-model="existingTask"
          class="form-task__container"
          :is-edit="true"
          :handle-cancel="handleCancel"
          :start-month-date="startMonthDate"
          :end-month-date="endMonthDate"
          :loading-confirm-edit="loadingConfirmEdit"
          @click="handleConfirm"
        />
      </template>
    </general-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import dayjs from 'dayjs'
import { TaskDetailInterface } from '~/types/Task/task.types'
import * as PeriodService from '~/services/period.service'
import * as TaskService from '~/services/task.service'
import { PeriodDetailInterface } from '~/types/Period/period.types'
import userModule from '~/store/user-module'

export interface InformationInterface {
  name: string
  payPeriod: string
  chargeString: string
  date: string
}

@Component({})
export default class MainPage extends Vue {
  tasks: TaskDetailInterface[] = []

  period: PeriodDetailInterface = {
    id: '',
    month: '',
    year: '',
    userId: '',
  }

  monthPicker: string = ''

  information: InformationInterface = {
    name: '',
    payPeriod: '',
    chargeString: '',
    date: '',
  }

  newTask: TaskDetailInterface = {
    date: '',
    hours: 0,
    staff: '',
    description: '',
  }

  existingTask: TaskDetailInterface | null = null

  isEdit: boolean = false
  editDialog: boolean = false

  loadingConfirmAdd: boolean = false
  loadingConfirmEdit: boolean = false

  get user() {
    return userModule.user
  }

  get userId() {
    const user = this.$fire.auth.currentUser
    if (user) {
      return user.uid
    }
    return ''
  }

  get startMonthDate() {
    return dayjs(this.monthPicker).startOf('month').format('YYYY-MM-DD')
  }

  get endMonthDate() {
    return dayjs(this.monthPicker).endOf('month').format('YYYY-MM-DD')
  }

  async created() {
    this.monthPicker = dayjs().format('YYYY-MM')
    this.information.date = dayjs().format('DD MMMM YYYY')
    await this.handlePeriodChange(this.monthPicker)
  }

  setNewTaskStartDate() {
    this.newTask.date = this.startMonthDate
  }

  async importTasks() {
    const data = await TaskService.getTasks(this.userId, this.period.id)
    if (data) {
      this.tasks = data.sort((a, b) =>
        dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1
      )
      this.setNewTaskStartDate()
    }
  }

  async handlePeriodChange(value: string) {
    const period = dayjs(value).format('MMMM-YYYY').split('-')
    if (period.length > 1) {
      const data = await PeriodService.getPeriod({
        month: period[0],
        year: period[1],
        userId: this.userId,
      })
      if (data) {
        this.period = data
        this.information.payPeriod = `${this.period.month} - ${this.period.year}`
        await this.importTasks()
      }
    }
  }

  async handleAddTask(form: TaskDetailInterface) {
    this.loadingConfirmAdd = true
    const data = await TaskService.createTask({
      ...form,
      periodId: this.period.id,
      userId: this.userId,
    })
    if (data) {
      this.tasks.push(data)
      this.tasks.sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1))
    }
    this.loadingConfirmAdd = false
  }

  handleEditTask(payload: TaskDetailInterface) {
    this.existingTask = Object.assign({}, payload)
    this.isEdit = true
    this.editDialog = true
  }

  handleCancel() {
    console.log('🚀 ~ MainPage ~ handleCancel ~ handleCancel')
    this.isEdit = false
    this.editDialog = false
  }

  async handleUpdateTask() {
    console.log('🚀 ~ MainPage ~ handleUpdateTask ~ handleUpdateTask')
    this.loadingConfirmEdit = true
    if (this.existingTask && this.existingTask.id) {
      await TaskService.updateTask(this.existingTask.id, this.existingTask)
      this.tasks = this.tasks
        .map((task) => {
          if (this.existingTask!.id === task.id) {
            return this.existingTask as TaskDetailInterface
          }
          return task
        })
        .sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1))
    }
    this.isEdit = false
    this.editDialog = false
    this.loadingConfirmEdit = false
  }

  handleConfirm() {
    if (this.isEdit) {
      this.handleUpdateTask()
    } else {
      this.handleAddTask(this.newTask)
      this.newTask = {
        date: this.startMonthDate,
        hours: 0,
        staff: '',
        description: '',
      }
    }
  }

  async handleDeleteTask(id?: string) {
    if (id) {
      await TaskService.deleteTask(id)
      this.tasks = this.tasks.filter((task) => task.id !== id)
    }
  }
}
</script>
