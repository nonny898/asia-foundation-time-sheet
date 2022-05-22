<template>
  <div class="template__container">
    <div class="headline pa-4">
      <div class="d-flex align-center">
        <v-icon class="mr-2" color="primary"> mdi-calendar-range </v-icon>
        <span> Summary </span>
      </div>
      <v-divider class="mt-2" />
    </div>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <div>
          <div class="field-label">Total Hours</div>
          <general-input-text :value="totalHours" disabled></general-input-text>
        </div>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <div>
          <div class="field-label">Total Staffs</div>
          <general-input-text :value="totalStaff" disabled></general-input-text>
        </div>
      </v-col>
      <v-col cols="12" sm="6" md="3">
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
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <div>
          <div class="field-label">Date</div>
          <general-input-text
            :value="information.date"
            disabled
          ></general-input-text>
        </div>
      </v-col>
      <v-col cols="12">
        <general-button
          class="button-cta__add save"
          color="primary"
          :is-block="true"
          :text="'Save as PDF'"
          :disabled="information.name === ''"
          @click="handlePrint"
        />
        <div
          v-if="information.name === ''"
          class="button-hint d-flex align-center"
        >
          <v-icon small class="mr-2" color="rgba(255, 0, 0, 0.644)">
            mdi-alert-circle-outline
          </v-icon>
          <span> Name is missing from main information. </span>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { InformationInterface } from '~/pages/index.vue'
import { TaskDetailInterface } from '~/types/Task/task.types'
import * as PDFService from '~/utils/generate-pdf.utils.js'

@Component({})
export default class DetailSummary extends Vue {
  @Prop({ required: true }) tasks!: TaskDetailInterface[]
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
    const staffs = [
      ...new Set(
        this.tasks.filter((task) => task.staff !== '').map((task) => task.staff)
      ),
    ]
    return staffs.length
  }

  get totalDays() {
    return Math.floor(this.totalHours / 8)
  }

  async handlePrint() {
    const tasks = this.tasks.map((task) => {
      return {
        date: task.date,
        hours: task.hours,
        staff: task.staff,
        description: task.description,
      }
    })
    PDFService.generatePDf(
      tasks,
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
