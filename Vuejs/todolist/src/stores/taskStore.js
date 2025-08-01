import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { supabase } from '@/supabase.js'

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref([])

  // 防連續點擊
  const isUpdatingSet = ref(new Set())

  const sortedTasks = computed(() => {
    const notCompletedAndNotPin = tasks.value
      .filter((task) => !task.isCompleted && !task.isPin)
      .sort((a, b) => b.order - a.order)
    const notCompletedAndPin = tasks.value
      .filter((task) => !task.isCompleted && task.isPin)
      .sort((a, b) => b.order - a.order)
    const completedAndNotPin = tasks.value
      .filter((task) => task.isCompleted && !task.isPin)
      .sort((a, b) => b.order - a.order)
    const completedAndPin = tasks.value
      .filter((task) => task.isCompleted && task.isPin)
      .sort((a, b) => b.order - a.order)

    return [
      ...notCompletedAndPin,
      ...notCompletedAndNotPin,
      ...completedAndPin,
      ...completedAndNotPin,
    ]
  })
  const sortedNotCompletedTasks = computed(() => {
    const notCompletedAndNotPin = tasks.value
      .filter((task) => !task.isCompleted && !task.isPin)
      .sort((a, b) => b.order - a.order)
    const notCompletedAndPin = tasks.value
      .filter((task) => !task.isCompleted && task.isPin)
      .sort((a, b) => b.order - a.order)

    return [...notCompletedAndPin, ...notCompletedAndNotPin]
  })
  const sortedCompletedTasks = computed(() => {
    const completedAndNotPin = tasks.value
      .filter((task) => task.isCompleted && !task.isPin)
      .sort((a, b) => b.order - a.order)
    const completedAndPin = tasks.value
      .filter((task) => task.isCompleted && task.isPin)
      .sort((a, b) => b.order - a.order)

    return [...completedAndPin, ...completedAndNotPin]
  })

  const notCompletedTasksLength = computed(() => {
    return tasks.value.filter((task) => !task.isCompleted).length
  })

  const completedTasksLength = computed(() => {
    return tasks.value.filter((task) => task.isCompleted).length
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

  // 取得該task，並把最新更改賦值
  function replaceTask(todoInfo) {
    const index = tasks.value.findIndex((task) => task.id === todoInfo.id)
    if (index !== -1) {
      tasks.value[index] = todoInfo
    }
  }

  async function updateTask(todoId, todoInfo) {
    isUpdatingSet.value.add(todoId)

    const { data, error } = await supabase
      .from('todolist')
      .update(todoInfo)
      .eq('id', todoId)
      .select()

    isUpdatingSet.value.delete(todoId)

    if (error) {
      console.log('更新失敗', error.message)
    } else {
      console.log('更新成功', data)
      await fetchTasks()
    }
  }

  async function upsertTasks(newTasks) {
    const newOrderTasks = newTasks.map((task, index, array) => {
      return { ...task, order: array.length - index }
    })

    const targetArray = newOrderTasks.map(({ id, order }) => {
      return { id, order }
    })

    const { data, error } = await supabase.from('todolist').upsert(targetArray).select()
    console.log(targetArray)
    if (error) {
      console.log('排序失敗', error.message)
    } else {
      console.log('排序成功', data)
      await fetchTasks()
    }
  }

  // 可以複數
  async function deleteTask(todoId) {
    const { data, error } = await supabase.from('todolist').delete().eq('id', todoId).select()

    if (error) {
      console.log('刪除失敗', error.message)
    } else {
      console.log('刪除成功', data)
      await fetchTasks()
    }
  }

  return {
    sortedTasks,
    sortedNotCompletedTasks,
    sortedCompletedTasks,
    notCompletedTasksLength,
    completedTasksLength,
    fetchTasks,
    createTask,
    replaceTask,
    updateTask,
    deleteTask,
    upsertTasks,
    isUpdatingSet,
  }
})
