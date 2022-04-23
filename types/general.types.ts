export interface Validator extends Vue {
  resetValidation: () => Promise<void>
  validate: () => Promise<boolean>
}
