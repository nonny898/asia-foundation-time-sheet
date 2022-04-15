<template>
  <v-card>
    <v-card-text>
      <v-text-field v-model="email" label="email" />
      <v-text-field v-model="password" label="password" />
    </v-card-text>
    <v-card-actions>
      <v-btn @click="signIn"> Login </v-btn>
      <v-btn @click="signUp"> Signup </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  layout: 'empty',
})
export default class LoginPage extends Vue {
  email: string = ''
  password: string = ''

  async signIn() {
    const { user } = await this.$supabase.auth.signIn({
      email: this.email,
      password: this.password,
    })
    if (user) {
      this.$router.push('/')
    }
  }

  async signUp() {
    const { user } = await this.$supabase.auth.signUp({
      email: this.email,
      password: this.password,
    })
    if (user) {
      this.email = ''
      this.password = ''
    }
  }
}
</script>
