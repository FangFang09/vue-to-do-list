import { defineStore } from 'pinia'
import { supabase } from '@/supabase.js'

export const useFileStore = defineStore('fileStore', () => {
  async function uploadFiles(file, folder = 'uploads') {
    if (!file) return { success: false, error: '沒有選擇檔案' }

    const now = Date.now()
    const todayIsoString = new Date(now).toLocaleDateString('en-CA')

    const filePath = `${folder}/${todayIsoString}_${file.name}`

    const { data, error } = await supabase.storage.from('todo-files').upload(filePath, file)

    if (error) {
      console.error('上傳失敗', error.message)
    } else {
      console.log('上傳成功', data)
    }

    // 取得URL
    const { publicUrl } = supabase.storage.from('todo-files').getPublicUrl(filePath).data
    return { success: true, path: filePath, url: publicUrl }
  }
  return { uploadFiles }
})
