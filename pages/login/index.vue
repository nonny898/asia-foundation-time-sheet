<template>
  <v-card width="50%" min-width="250">
    <v-card-text>
      <v-form ref="form" lazy-validation>
        <v-row>
          <v-col class="pb-2" cols="12">
            <v-text-field
              v-model="email"
              label="Email"
              outlined
              :rules="[rules.required]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0" cols="12">
            <v-text-field
              v-model="password"
              label="Password"
              outlined
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required]"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              @keyup.enter="signIn"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-divider class="my-4" />
    <v-card-actions class="d-block">
      <v-btn block color="primary" @click="signIn"> Login </v-btn>
      <div class="my-4" />
      <v-btn block @click="signUp"> Signup </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Validator } from '~/types/general.types'

@Component({
  layout: 'empty',
})
export default class LoginPage extends Vue {
  email: string = ''
  password: string = ''
  showPassword: boolean = false

  rules = {
    required: (value: string) => !!value || 'Required.',
  }

  $refs!: {
    form: Validator
  }

  async signIn() {
    const valid = await this.$refs.form.validate()
    if (valid) {
      const { user } = await this.$supabase.auth.signIn({
        email: this.email,
        password: this.password,
      })
      if (user) {
        this.$router.push('/')
      }
    }
  }

  signUp() {
    this.$router.push('/signup')
  }
}
</script>
