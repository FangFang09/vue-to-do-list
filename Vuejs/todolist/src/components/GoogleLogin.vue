<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
const authStore = useAuthStore()

onMounted(() => {
  window.google.accounts.id.initialize({
    client_id: googleClientId,
    callback: authStore.handleSignInWithGoogle,
  })

  window.google.accounts.id.renderButton(document.getElementById('g_id_signin'), {
    theme: 'outline',
    size: 'large',
    text: 'sign_in_with',
    shape: 'pill',
    width: 200,
    logo_alignment: 'center',
    ux_mode: 'redirect',
  })
})
</script>
<template>
  <div id="g_id_signin"></div>
</template>
<style lang="scss" scoped></style>
