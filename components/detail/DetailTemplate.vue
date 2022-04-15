<template>
  <div class="template__container">
    <div class="template-header__container">
      <div>The Asia Foundation</div>
      <div>Time Sheet</div>
    </div>
    <v-row class="template-info__container">
      <v-col cols="2"> Name: </v-col>
      <v-col cols="10">
        {{ information.name }}
      </v-col>
      <v-col cols="2"> Pay Period: </v-col>
      <v-col cols="10">
        {{ information.payPeriod }}
      </v-col>
      <v-col cols="2"> Charge String: </v-col>
      <v-col cols="10">
        {{ information.chargeString }}
      </v-col>
    </v-row>
    <v-row class="template-table__container">
      <v-col cols="12">
        <detail-table :items="tasks" v-bind="$attrs" />
      </v-col>
    </v-row>
    <v-row class="template-footer__container">
      <v-col cols="2"> Total Hours: </v-col>
      <v-col cols="10">
        {{ totalHours }}
      </v-col>
      <v-col cols="2"> Total Staffs: </v-col>
      <v-col cols="10">
        {{ totalStaff }}
      </v-col>
      <v-col cols="2"> Total Days: </v-col>
      <v-col cols="10">
        {{ totalDays }}
      </v-col>
      <v-col cols="12">*** Remark: 8 hours is 1 working day</v-col>
      <v-col cols="2"> Submitted By: </v-col>
      <v-col cols="10">
        {{ information.name }}
      </v-col>
      <v-col cols="2"> Date: </v-col>
      <v-col cols="10">
        {{ information.date }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn block @click="handlePrint">Print</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { InformationInterface } from '~/pages/index.vue'
import { TaskInterface } from '~/types/Task/task.types'
import * as PDFService from '~/utils/generate-pdf.utils.js'

@Component({})
export default class DetailTemplate extends Vue {
  @Prop({ required: true }) tasks!: TaskInterface[]
  @Prop({ required: true }) information!: InformationInterface

  get totalHours() {
    if (this.tasks.length > 0) {
      return this.tasks.reduce<number>((accum, task) => {
        return accum + task.hours
      }, 0)
    }
    return 0
  }

  get totalStaff() {
    const staffs = [...new Set(this.tasks.map((task) => task.staff))]
    return staffs.length
  }

  get totalDays() {
    return Math.floor(this.totalHours / 8)
  }

  handlePrint() {
    PDFService.generatePDf(
      this.tasks,
      this.information.name,
      this.information.payPeriod,
      this.information.chargeString,
      this.information.date,
      this.totalHours,
      this.totalStaff,
      this.totalDays
    )
  }
}
</script>
