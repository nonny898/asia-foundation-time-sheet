<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer absolute app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
      <v-spacer />
      <v-btn @click="signOut">Logout</v-btn>
    </v-footer>
  </v-app>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  name: 'DefaultLayout',
})
export default class DefaultLayout extends Vue {
  async signOut() {
    const { error } = await this.$supabase.auth.signOut()
    if (!error) {
      this.$router.push('/login')
    }
  }
}
</script>
