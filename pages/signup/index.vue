<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col class="pb-0" cols="12">
          <v-text-field v-model="email" label="Email" outlined />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-2" cols="12">
          <v-text-field v-model="password" label="Password" outlined />
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider class="my-4" />
    <v-card-actions class="d-block">
      <v-btn block color="primary" @click="signUp"> Confirm </v-btn>
      <div class="my-4" />
      <v-btn block @click="cancel"> Cancel </v-btn>
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

  cancel() {
    this.$router.push('/login')
  }

  async signUp() {
    const { user } = await this.$supabase.auth.signUp({
      email: this.email,
      password: this.password,
    })
    if (user) {
      this.email = ''
      this.password = ''
      this.$router.push('/login')
    }
  }
}
</script>
