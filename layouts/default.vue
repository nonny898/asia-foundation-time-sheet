<template>
  <v-app>
    <v-app-bar absolute app flat color="primary" height="60"> </v-app-bar>
    <v-main>
      <v-container class="default-container" fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer fixed app color="primary" height="60">
      <v-spacer />
      <general-button :text="'Logout'" @click="signOut" />
    </v-footer>
  </v-app>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'
import userModule from '~/store/user-module'

@Component({
  name: 'DefaultLayout',
})
export default class DefaultLayout extends Vue {
  async signOut() {
    try {
      await this.$fire.auth.signOut()
      userModule.setUser(null)
      this.$router.push('/login')
    } catch (error) {}
  }
}
</script>
