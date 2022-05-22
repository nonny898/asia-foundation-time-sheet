<template>
  <div class="template__container">
    <div class="headline pa-4">
      <div class="d-flex align-center">
        <v-icon class="mr-2" color="primary"> mdi-calendar-range </v-icon>
        <span> Time Sheet </span>
      </div>
      <v-divider class="mt-2" />
    </div>
    <v-row>
      <v-col cols="12">
        <div class="template-table__container">
          <detail-table
            :items="tasks"
            v-bind="$attrs"
            :items-per-page="tasks.length"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { TaskDetailInterface } from '~/types/Task/task.types'

@Component({})
export default class DetailTemplate extends Vue {
  @Prop({ required: true }) tasks!: TaskDetailInterface[]
}
</script>
