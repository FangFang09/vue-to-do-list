<script setup>
import { useRoute, RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import LoadingEffect from '@/components/LoadingEffect.vue'
import { useAuthStore } from '@/stores/authStore'

const route = useRoute()

const authStore = useAuthStore()
authStore.getUserFromSupabase()
</script>

<template>
  <TheHeader v-if="route.name !== 'loginView' && authStore.user" />
  <main>
    <LoadingEffect />
    <RouterView />
  </main>
</template>

<style lang="scss">
body {
  background-color: $grey-2;
}

main {
  max-width: 620px;
  margin: 0 auto;
  width: 80%;
}
</style>
