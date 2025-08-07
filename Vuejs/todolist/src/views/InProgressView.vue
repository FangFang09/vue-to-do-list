<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import { useFileStore } from '@/stores/fileStore'
import AddTaskInput from '@/components/AddTaskInput.vue'
import TaskForm from '@/components/TaskForm.vue'
import TaskItem from '@/components/TaskItem.vue'
import draggable from 'vuedraggable'
import dayjs from 'dayjs'
import { useLoadingStore } from '@/stores/loadingStore'
import { useAuthStore } from '@/stores/authStore'

const taskStore = useTaskStore()
const loadingStore = useLoadingStore()
const authStore = useAuthStore()

const isAddButtonExpanded = ref(true)

// pin
async function onTogglePin(todo) {
  try {
    loadingStore.startLoading('Processing...')
    await taskStore.updateTask(todo.id, { ...todo, isPin: !todo.isPin })
  } catch (error) {
    console.log(error.message)
  } finally {
    loadingStore.stopLoading()
  }
}

// checked
async function onToggleCompleted(todo) {
  try {
    loadingStore.startLoading('Processing...')
    await taskStore.updateTask(todo.id, { ...todo, isCompleted: !todo.isCompleted })
  } catch (error) {
    console.log(error.message)
  } finally {
    loadingStore.stopLoading()
  }
}

// edit
const editingId = ref(null)
function onToggleEditing(taskId) {
  editingId.value = editingId.value === taskId ? null : taskId
}

const today = new Date()
const pad = (date) => date.toString().padStart(2, '0')
const date = ref(`${pad(today.getFullYear())}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`)
const time = ref(`${pad(today.getHours())}:${pad(today.getMinutes())}`)

const file = ref(null)

const changeFileHandler = (file) => {
  if (file) {
    todoInfo.value.fileName = file.name
    file.value = file
  } else {
    todoInfo.value.fileName = ''
  }
}
const fileStore = useFileStore()

async function onSubmit() {
  if (file.value) {
    await fileStore.uploadFiles(file.value)
  }

  const cleanedTodoInfo = {
    ...todoInfo.value,
    deadlineDate:
      todoInfo.value.deadlineDate === ''
        ? null
        : dayjs(todoInfo.value.deadlineDate).format('YYYY-MM-DD'),
    deadlineTime: todoInfo.value.deadlineTime === '' ? null : todoInfo.value.deadlineTime,
    order: taskStore.sortedTasks.length,
  }

  try {
    loadingStore.startLoading('Processing...')
    await taskStore.createTask(cleanedTodoInfo)
    initializeTodoInfo()
    isAddButtonExpanded.value = !isAddButtonExpanded.value
  } catch (error) {
    console.log(error.message)
  } finally {
    loadingStore.stopLoading()
  }
}

async function cancelHandler(mode) {
  if (mode === 'add') {
    initializeTodoInfo()
    isAddButtonExpanded.value = true
  } else if (mode === 'edit') {
    try {
      loadingStore.startLoading('Processing...')
      await taskStore.fetchTasks()
      editingId.value = null
    } catch (error) {
      console.log(error.message)
    } finally {
      loadingStore.stopLoading()
    }
  } else {
    throw new Error('請確認是否為add或edit的取消')
  }
}

onMounted(async () => {
  loadingStore.startLoading('Loading...')
  await authStore.getUserFromSupabase()
  todoInfo.value.user_id = authStore.user.id
  await taskStore.fetchTasks()
  loadingStore.stopLoading()
})

function initializeTodoInfo() {
  todoInfo.value.title = ''
  todoInfo.value.deadlineDate = date
  todoInfo.value.deadlineTime = time
  todoInfo.value.comment = ''
  todoInfo.value.fileName = ''
}

const todoInfo = ref({
  user_id: null,
  title: '',
  isCompleted: false,
  isPin: false,
  deadlineDate: date,
  deadlineTime: time,
  comment: '',
  fileName: '',
  order: null,
})

async function updateTask(todo) {
  try {
    loadingStore.startLoading('Processing...')
    await taskStore.updateTask(todo.id, todo)
    isAddButtonExpanded.value = true
    editingId.value = null
  } catch (error) {
    console.log(error.message)
  } finally {
    loadingStore.stopLoading()
  }
}
</script>

<template>
  <AddTaskInput v-if="isAddButtonExpanded" @expand="isAddButtonExpanded = false" />

  <!-- add form -->
  <TaskForm
    v-model:todo="todoInfo"
    mode="add"
    @changeFile="changeFileHandler"
    @submit="onSubmit"
    @onCancel="cancelHandler"
    v-else
  >
  </TaskForm>

  <div class="task-list" v-if="taskStore.sortedNotCompletedTasks.length">
    <!-- edit task -->
    <draggable
      :modelValue="taskStore.sortedNotCompletedTasks"
      @update:modelValue="taskStore.upsertTasks"
      item-key="id"
      ghost-class="ghost-item"
      :animation="500"
      chosen-class="chosen-item"
      drag-class="drag-item"
    >
      <template #item="{ element: todo }">
        <div class="task-item-wrapper">
          <component
            :is="editingId === todo.id ? TaskForm : TaskItem"
            :key="todo.id"
            :todo="todo"
            @update:todo="taskStore.replaceTask"
            mode="edit"
            @toggleCompleted="onToggleCompleted"
            @togglePin="onTogglePin"
            :isEditing="editingId === todo.id"
            @toggleEditing="onToggleEditing"
            @onCancel="cancelHandler"
            @update="updateTask"
          />
        </div>
      </template>
    </draggable>
  </div>
  <div v-else>
    <p class="no-todo">There are no tasks in progress.</p>
  </div>
  <footer>
    <p class="last-task-number">
      {{ taskStore.notCompletedTasksLength }}
      {{ taskStore.notCompletedTasksLength > 1 ? 'tasks' : 'task' }} left
    </p>
  </footer>
</template>

<style lang="scss" scoped>
// task-list
.task-list {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.ghost-item {
  opacity: 0.7;
}

.drag-item {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
}

.no-todo {
  text-align: center;
  @include subtitle;
}

// 數量
footer {
  margin: 0 auto;
  padding-left: 16px;

  @include deviceScreen($sm-size) {
    padding-left: 32px;
  }

  .last-task-number {
    @include status;
    font-size: 20px;

    @include deviceScreen($sm-size) {
      @include status;
    }
  }
}
</style>
