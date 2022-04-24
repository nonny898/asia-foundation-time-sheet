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
        <detail-template
          :information="information"
          :tasks="tasks"
          :edit-item="handleEditTask"
          :delete-item="handleDeleteTask"
          :import-tasks="importTasks"
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
import { PeriodInterface, TaskInterface } from '~/types/Task/task.types'

export interface InformationInterface {
  name: string
  payPeriod: string
  chargeString: string
  date: string
}

@Component({})
export default class MainPage extends Vue {
  tasks: TaskInterface[] = []

  period: PeriodInterface = {
    id: '',
    month: '',
    year: '',
  }

  monthPicker: string = ''

  information: InformationInterface = {
    name: '',
    payPeriod: '',
    chargeString: '',
    date: '',
  }

  newTask: TaskInterface = {
    date: '',
    hours: 0,
    staff: '',
    description: '',
  }

  existingTask: TaskInterface | null = null

  isEdit: boolean = false
  editDialog: boolean = false

  loadingConfirmAdd: boolean = false
  loadingConfirmEdit: boolean = false

  get userId() {
    const user = this.$supabase.auth.user()
    if (user) {
      return user.id
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
    const { data } = await this.$supabase
      .from('task')
      .select('id, date, hours, staff, description')
      .eq('user_id', this.userId)
      .eq('period_id', this.period.id)
    if (data) {
      this.tasks = data
      this.setNewTaskStartDate()
    }
  }

  async handlePeriodChange(value: string) {
    const period = dayjs(value).format('MMMM-YYYY').split('-')
    if (period.length > 1) {
      const { data } = await this.$supabase
        .from('period')
        .select('id, month, year')
        .eq('month', period[0])
        .eq('year', period[1])
        .eq('user_id', this.userId)
        .limit(1)
        .single()
      if (data) {
        this.period = data
        this.information.payPeriod = `${this.period.month} - ${this.period.year}`
        await this.importTasks()
      } else {
        this.createPeriod(period[0], period[1])
      }
    }
  }

  async createPeriod(month: string, year: string) {
    const { data } = await this.$supabase
      .from('period')
      .insert([{ month, year, user_id: this.userId }])
      .limit(1)
      .single()
    if (data) {
      this.period = data
      this.information.payPeriod = `${this.period.month} - ${this.period.year}`
      this.tasks = []
      this.setNewTaskStartDate()
    }
  }

  async handleAddTask(payload: TaskInterface) {
    this.loadingConfirmAdd = true
    const { data } = await this.$supabase
      .from('task')
      .insert([
        {
          ...payload,
          period_id: this.period.id,
          user_id: this.userId,
        },
      ])
      .limit(1)
      .single()
    if (data) {
      this.tasks.push(data)
    }
    this.loadingConfirmAdd = false
  }

  handleEditTask(payload: TaskInterface) {
    this.existingTask = Object.assign({}, payload)
    this.isEdit = true
    this.editDialog = true
  }

  handleCancel() {
    this.isEdit = false
    this.editDialog = false
  }

  async handleUpdateTask() {
    this.loadingConfirmEdit = true
    if (this.existingTask && this.existingTask.id) {
      await this.$supabase
        .from('task')
        .update({ ...this.existingTask })
        .match({ id: this.existingTask.id })
      this.tasks = this.tasks.map((task) => {
        if (this.existingTask!.id === task.id) {
          return this.existingTask as TaskInterface
        }
        return task
      })
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

  async handleDeleteTask(id?: number) {
    if (id) {
      await this.$supabase.from('task').delete().match({ id })
      this.tasks = this.tasks.filter((task) => task.id !== id)
    }
  }
}
</script>
