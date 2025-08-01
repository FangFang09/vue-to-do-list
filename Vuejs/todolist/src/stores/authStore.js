import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
// import { decodeJwtResponse } from '@/utils/decodeJWT.js'
import { supabase } from '@/supabase.js'

export const useAuthStore = defineStore('authStore', () => {
  const user = ref(null)
  const idToken = ref(localStorage.getItem('accessToken') || null)

  const isLoggedIn = computed(() => !!idToken.value)

  async function handleSignInWithGoogle(response) {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: response.credential,
    })
    if (error) {
      console.log(error.message)
    } else {
      idToken.value = response.credential
      localStorage.setItem('accessToken', response.credential)
      router.push({ name: 'myTasks' })
    }
  }

  // function loginWithGoogle(response) {
  //   idToken.value = response.credential
  //   localStorage.setItem('accessToken', response.credential)

  //   const decodePayload = decodeJwtResponse(response.credential)

  //   user.value = {
  //     id: decodePayload.sub,
  //     name: decodePayload.given_name,
  //     email: decodePayload.email,
  //     picture: decodePayload.picture,
  //   }
  // }

  function clearAuthData() {
    user.value = null
    idToken.value = null
    localStorage.removeItem('accessToken')
  }

  const router = useRouter()
  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log('登出失敗', error.message)
    } else {
      console.log('登出成功')
      clearAuthData()
      router.push({ name: 'loginView' })
    }
  }

  return { user, idToken, isLoggedIn, handleSignInWithGoogle, clearAuthData, signOut }
})
