<script setup>
import { ref } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import { useFileStore } from '@/stores/fileStore'
import AddTaskInput from '@/components/AddTaskInput.vue'
import TaskForm from '@/components/TaskForm.vue'
import TaskItem from '@/components/TaskItem.vue'

const taskStore = useTaskStore()

const isAddButtonExpanded = ref(true)

// pin
async function onTogglePin(todo) {
  await taskStore.updateTask(todo.id, { ...todo, isPin: !todo.isPin })
}

// checked
async function onToggleCompleted(todo) {
  await taskStore.updateTask(todo.id, { ...todo, isCompleted: !todo.isCompleted })
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
    const result = await fileStore.uploadFiles(file.value)
    console.log('result', result)
  }

  await taskStore.createTask(todoInfo.value)
  initializeTodoInfo()
  isAddButtonExpanded.value = !isAddButtonExpanded.value
}

async function cancelHandler(mode) {
  if (mode === 'add') {
    initializeTodoInfo()
    isAddButtonExpanded.value = true
  } else if (mode === 'edit') {
    await taskStore.fetchTasks()
    editingId.value = null
  } else {
    throw new Error('請確認是否為add或edit的取消')
  }
}

taskStore.fetchTasks()

function initializeTodoInfo() {
  todoInfo.value.title = ''
  todoInfo.value.deadlineDate = date
  todoInfo.value.deadlineTime = time
  todoInfo.value.comment = ''
  todoInfo.value.fileName = ''
  todoInfo.value.fileUrl = ''
}

const todoInfo = ref({
  title: '',
  isCompleted: false,
  isPin: false,
  deadlineDate: date,
  deadlineTime: time,
  comment: '',
  fileName: '',
})

async function updateTask(todo) {
  await taskStore.updateTask(todo.id, todo)
  isAddButtonExpanded.value = true
  editingId.value = null
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

  <!-- task-list -->
  <div class="task-list">
    <!-- edit task -->
    <component
      :is="editingId === todo.id ? TaskForm : TaskItem"
      v-for="todo in taskStore.sortedTasks"
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
  width: 80%;
  margin: 0 auto;

  @include deviceScreen($sm-size) {
    width: 100%;
  }
}

// 數量
footer {
  margin: 0 auto;
  width: 80%;
  @include deviceScreen($sm-size) {
    width: 100%;
  }

  .last-task-number {
    @include status;
    font-size: 20px;
    padding-left: 32px;

    @include deviceScreen($sm-size) {
      @include status;
    }
  }
}
</style>
