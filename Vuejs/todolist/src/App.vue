<script setup>
import { RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import LoadingEffect from '@/components/LoadingEffect.vue'
</script>

<template>
  <TheHeader />
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
