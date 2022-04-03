<template>
  <v-card>
    <v-card-title class="headline"> New Task </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="2">
          <v-text-field
            v-model="form.date"
            label="Date"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="2">
          <v-text-field
            v-model.number="form.hours"
            type="number"
            label="Hours Worked"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="2">
          <v-text-field
            v-model="form.staff"
            label="Work with Staff"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.description"
            label="Description"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn block @click="handleConfirm">Add Task</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { TaskInterface } from '~/pages/index.vue'

@Component({})
export default class FormTask extends Vue {
  @Prop({ required: true }) addTask!: (task: TaskInterface) => void

  form: TaskInterface = {
    id: 0,
    date: '',
    hours: 0,
    staff: '',
    description: '',
  }

  handleConfirm() {
    this.addTask(this.form)
    this.form = {
      id: 0,
      date: '',
      hours: 0,
      staff: '',
      description: '',
    }
  }
}
</script>
