import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase.js'

export const useAuthStore = defineStore('authStore', () => {
  const user = ref(null)
  const idToken = ref(localStorage.getItem('accessToken') || null)

  const isLoggedIn = computed(() => !!user.value)
  const router = useRouter()

  function setUser(newUser, token) {
    user.value = newUser

    if (token) {
      idToken.value = token
      localStorage.setItem('accessToken', token)
    }
  }
  const avatarUrl = computed(() => {
    return user.value.user_metadata.avatar_url
  })

  async function getUserFromSupabase() {
    if (user.value) return
    const {
      data: { user: fetchedUser },
    } = await supabase.auth.getUser()
    if (fetchedUser) {
      user.value = fetchedUser
      console.log('取得user', fetchedUser)
    } else {
      console.log('尚未登入或 token 失效')
      await signOut()
      clearAuthData()
    }
  }

  async function handleSignInWithGoogle(response) {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: response.credential,
    })
    if (error) {
      console.log(error.message)
    } else {
      console.log('登入成功', data)
      setUser(data.user, response.credential)
      router.push({ name: 'myTasks' })
    }
  }

  function clearAuthData() {
    user.value = null
    idToken.value = null
    localStorage.removeItem('accessToken')
  }

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

  return {
    user,
    idToken,
    isLoggedIn,
    setUser,
    avatarUrl,
    getUserFromSupabase,
    handleSignInWithGoogle,
    clearAuthData,
    signOut,
  }
})
