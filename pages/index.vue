<template>
  <div>
    <v-row>
      <v-col cols="12">
        <form-info v-model="information" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <form-task :add-task="handleAddTask" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <detail-template :information="information" :tasks="tasks" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

export interface TaskInterface {
  id: number
  date: string
  hours: number
  staff: string
  description: string
}

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
}
</script>
