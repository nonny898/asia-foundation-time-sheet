<template>
  <div class="template__container">
    <div class="headline pa-4">
      <span>
        <v-icon color="primary"> mdi-calendar-range </v-icon>
        <span> Time Sheet </span>
        {{ title }}
      </span>
      <v-divider class="mt-2" />
    </div>
    <v-row>
      <v-col cols="12">
        <div class="template-table__container">
          <detail-table :items="tasks" v-bind="$attrs" />
        </div>
      </v-col>
    </v-row>
    <v-row class="template-footer__container">
      <!-- <v-col cols="2"> Total Hours: </v-col>
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
      </v-col> -->
    </v-row>
    <v-row justify="end">
      <v-col cols="12" sm="6">
        <div>
          <div class="field-label">Total Hours</div>
          <general-input-text :value="totalHours" disabled></general-input-text>
        </div>
        <div>
          <div class="field-label">Total Staffs</div>
          <general-input-text :value="totalStaff" disabled></general-input-text>
        </div>
        <div>
          <div class="field-label">
            Total Days
            <span class="label-remark"> (8 hours is 1 working day) </span>
          </div>
          <general-input-text
            :value="totalDays"
            hint=""
            persistent-hint
            disabled
          ></general-input-text>
        </div>
        <div>
          <div class="field-label">Date</div>
          <general-input-text
            :value="information.date"
            disabled
          ></general-input-text>
        </div>
        <general-button
          color="primary"
          :is-block="true"
          :text="'Save as PDF'"
          @click="handlePrint"
        />
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
  @Prop({ required: true }) importTasks!: () => Promise<void>

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

  async handlePrint() {
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
    await this.importTasks()
  }
}
</script>
