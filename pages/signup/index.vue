<template>
  <v-card width="300" min-width="250">
    <v-card-text>
      <v-form ref="form" lazy-validation>
        <v-row>
          <v-col class="pb-2" cols="12">
            <general-input-text
              v-model="email"
              :is-login="true"
              label="E-mail"
              :rules="[rules.required]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0" cols="12">
            <general-input-text
              v-model="password"
              :is-login="true"
              label="Password"
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
    <div class="my-2" />
    <v-card-actions class="d-block">
      <general-button
        :is-block="true"
        :text="'Confirm'"
        color="primary"
        @click="signUp"
      />
      <div class="my-4" />
      <general-button
        :is-block="true"
        outlined
        :text="'Cancel'"
        @click="cancel"
      />
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

  cancel() {
    this.$router.push('/login')
  }

  async signUp() {
    const valid = await this.$refs.form.validate()
    if (valid) {
      try {
        await this.$fire.auth.createUserWithEmailAndPassword(
          this.email,
          this.password
        )
        this.$router.push('/login')
      } catch (error) {}
    }
  }
}
</script>
