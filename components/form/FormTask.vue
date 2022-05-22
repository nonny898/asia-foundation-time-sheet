<template>
  <div>
    <div class="headline pa-4">
      <div class="d-flex align-center">
        <v-icon class="mr-2" color="primary"> mdi-format-list-bulleted </v-icon>
        <span>
          {{ title }}
        </span>
      </div>
      <v-divider class="mt-2" />
    </div>
    <div>
      <v-row>
        <v-col class="pa-0" cols="12" :sm="isEdit ? 12 : 6">
          <v-row>
            <v-col cols="12" :sm="isEdit ? 4 : 12">
              <div class="field-label">Date</div>
              <general-input-date-picker
                v-model="$attrs.value.date"
                :min="startMonthDate"
                :max="endMonthDate"
                :is-required="true"
              ></general-input-date-picker>
            </v-col>
            <v-col cols="12" :sm="isEdit ? 4 : 12">
              <div class="field-label">Hours Worked</div>
              <general-input-text
                v-model.number="$attrs.value.hours"
                hide-details
                type="number"
              ></general-input-text>
            </v-col>
            <v-col cols="12" :sm="isEdit ? 4 : 12">
              <div class="field-label">Work with Staff</div>
              <general-input-text
                v-model="$attrs.value.staff"
                hide-details
              ></general-input-text>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="pa-0" cols="12" :sm="isEdit ? 12 : 6">
          <v-row>
            <v-col cols="12">
              <div class="field-label">Description</div>
              <general-input-area v-model="$attrs.value.description" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <v-card-actions>
      <general-button v-if="isEdit" :text="'Cancel'" @click="handleCancel" />
      <v-spacer />
      <general-button
        :class="!isEdit ? 'button-cta__add' : ''"
        :color="isEdit ? 'primary' : ''"
        :is-block="!isEdit"
        :loading="loadingButton"
        :text="buttonText"
        :disabled="!canSave"
        v-on="$listeners"
      />
    </v-card-actions>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class FormTask extends Vue {
  @Prop({ default: false }) isEdit!: boolean
  @Prop({ default: false }) loadingConfirmAdd!: boolean
  @Prop({ default: false }) loadingConfirmEdit!: boolean
  @Prop({ default: null }) startMonthDate!: string | null
  @Prop({ default: null }) endMonthDate!: string | null
  @Prop({ required: false }) handleCancel!: () => void

  get title() {
    return this.isEdit ? 'Edit Task' : 'New Task'
  }

  get buttonText() {
    return this.isEdit ? 'Save' : 'Add New Task'
  }

  get loadingButton() {
    return this.isEdit ? this.loadingConfirmEdit : this.loadingConfirmAdd
  }

  get canSave() {
    const form = this.$attrs.value as any
    return form.date !== '' && form.hours !== 0 && form.description !== ''
  }
}
</script>
