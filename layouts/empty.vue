<template>
  <v-app>
    <v-app-bar app flat color="primary" height="60" />
    <v-main>
      <v-container class="empty-container justify-center" fill-height fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app color="primary" height="60" />
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
}
</script>
