<template>
  <div class="template__container">
    <div class="template-header__container">
      <div>The Asia Foundation</div>
      <div>Time Sheet</div>
    </div>
    <div class="template-info__container">
      <div>Name: {{ information.name }}</div>
      <div>Pay Period: {{ information.payPeriod }}</div>
      <div>Charge String: {{ information.chargeString }}</div>
    </div>
    <div class="template-table__container">
      <detail-table :items="tasks" />
    </div>
    <div class="template-footer__container">
      <div>Total Hours: {{ totalHours }}</div>
      <div>Total Staffs: {{ totalStaff }}</div>
      <div>Total Days: {{ totalDays }}</div>
      <div>*** Remark: 8 hours is 1 working day</div>
      <div>Submitted By: {{ information.name }}</div>
      <div>Date: {{ information.date }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { InformationInterface, TaskInterface } from '~/pages/index.vue'

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
}
</script>
