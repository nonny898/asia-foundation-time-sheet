<template>
  <v-app>
    <v-app-bar absolute app flat color="primary" height="60" />
    <v-main>
      <v-container class="default-container" fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer absolute app color="primary" height="60">
      <v-spacer />
      <general-button :text="'Logout'" @click="signOut" />
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
