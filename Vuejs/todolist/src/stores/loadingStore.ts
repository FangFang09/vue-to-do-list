import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadingStore = defineStore('loadingStore', () => {
  const isLoading = ref<boolean>(false)
  const isLoadingMessage = ref<string>('')

  function startLoading(message: string): void {
    isLoading.value = true
    isLoadingMessage.value = message
  }

  function stopLoading(): void {
    isLoading.value = false
    isLoadingMessage.value = ''
  }

  return { isLoading, isLoadingMessage, startLoading, stopLoading }
})
