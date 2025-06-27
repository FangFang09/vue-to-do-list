import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { supabase } from '@/supabase.js'

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref([])

  const sortedTasks = computed(() => {
    const notCompletedAndNotPin = tasks.value.filter((task) => !task.isCompleted && !task.isPin)
    const notCompletedAndPin = tasks.value.filter((task) => !task.isCompleted && task.isPin)
    const completedAndNotPin = tasks.value.filter((task) => task.isCompleted && !task.isPin)
    const completedAndPin = tasks.value.filter((task) => task.isCompleted && task.isPin)

    return [
      ...notCompletedAndNotPin,
      ...notCompletedAndPin,
      ...completedAndNotPin,
      ...completedAndPin,
    ]
  })

  async function createTask(todoInfo) {
    const { data, error } = await supabase.from('todolist').insert([todoInfo]).select()

    if (error) {
      console.log('新增失敗', error.message)
    } else {
      console.log('新增成功', data)
      await fetchTasks()
    }
  }

  async function fetchTasks() {
    const { data, error } = await supabase.from('todolist').select('*')

    if (error) {
      console.log('讀取失敗', error.message)
    } else {
      console.log('讀取成功', data)
      tasks.value = data
    }
  }

  async function updateTask(todoId, todoInfo) {
    const { data, error } = await supabase
      .from('todolist')
      .update(todoInfo)
      .eq('id', todoId)
      .select()

    if (error) {
      console.log('更新失敗', error.message)
    } else {
      console.log('更新成功', data)
      await fetchTasks()
    }
  }

  async function deleteTask(todoId) {
    const { data, error } = await supabase.from('todolist').delete().eq('id', todoId).select()

    if (error) {
      console.log('刪除失敗', error.message)
    } else {
      console.log('刪除成功', data)
      await fetchTasks()
    }
  }

  return { sortedTasks, fetchTasks, createTask, updateTask, deleteTask }
})
