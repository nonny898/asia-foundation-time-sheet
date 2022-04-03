<template>
  <v-card>
    <v-card-title class="headline"> {{ title }} </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" :sm="isEdit ? 4 : 2">
          <v-text-field
            v-model="$attrs.value.date"
            label="Date"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" :sm="isEdit ? 4 : 2">
          <v-text-field
            v-model.number="$attrs.value.hours"
            type="number"
            label="Hours Worked"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" :sm="isEdit ? 4 : 2">
          <v-text-field
            v-model="$attrs.value.staff"
            label="Work with Staff"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" :sm="isEdit ? 12 : 6">
          <v-text-field
            v-model="$attrs.value.description"
            label="Description"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn block v-on="$listeners">{{ buttonText }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class FormTask extends Vue {
  @Prop({ default: false }) isEdit!: boolean

  get title() {
    return this.isEdit ? 'Edit Task' : 'New Task'
  }

  get buttonText() {
    return this.isEdit ? 'Save' : 'Add New Task'
  }
}
</script>
