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
  editingId.value = taskId
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
    console.log('檔名是：', file.name)
  } else {
    todoInfo.value.fileName = ''
  }
}
const fileStore = useFileStore()
async function onSubmit() {
  if (file.value) {
    const result = await fileStore.uploadFiles(file.value)
    todoInfo.value.fileUrl = result.url
    console.log('result', result)
  }

  await taskStore.createTask(todoInfo.value)
  initializeTodoInfo()
  isAddButtonExpanded.value = !isAddButtonExpanded.value
}

function cancelHandler() {
  initializeTodoInfo()
  isAddButtonExpanded.value = true
  editingId.value = null
  console.log('取消')
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
  fileUrl: '',
})
</script>

<template>
  <AddTaskInput v-if="isAddButtonExpanded" @expand="isAddButtonExpanded = false" />

  <!-- add form -->
  <TaskForm
    v-model:todo="todoInfo"
    @changeFile="changeFileHandler"
    @submit="onSubmit"
    @onCancel="cancelHandler"
    v-else
  >
  </TaskForm>

  <!-- edit task -->

  <!-- task-list -->
  <div class="task-list">
    <component
      :is="editingId === todo.id ? TaskForm : TaskItem"
      v-for="todo in taskStore.sortedTasks"
      :key="todo.id"
      :todo="todo"
      :class="{ active: todo.isPin }"
      @toggleCompleted="onToggleCompleted"
      @togglePin="onTogglePin"
      @toggleEditing="onToggleEditing"
      @onCancel="cancelHandler"
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

.task-item {
  @include task-status;
  background-color: $grey-1;

  &.active {
    background: $pin-bg;
  }
}

.task-item-header {
  @include task-header;
  border-radius: 0;
  padding: 0;
  margin-bottom: 16px;

  display: flex;
  align-items: center;
  gap: 0;
  flex-grow: 1;

  // type something here
  input[type='text'] {
    border: none;
    background-color: transparent;

    flex: 1 1 0;
    width: 50%;
    padding-left: 16px;

    @include subtitle;
    // @include deviceScreen($sm-size) {
    //   @include title($black);
    // }

    &:focus {
      outline: none;
    }
    &.active {
      text-decoration: line-through;
    }
  }
  .fa-star {
    font-size: 24px;
    margin-left: 32px;
    color: $grey-5;
    transition: color 0.2s;
    cursor: pointer;

    &.active {
      color: $pin;
    }
  }

  .fa-pen {
    font-size: 24px;
    margin-left: 32px;
    color: $primary;
    cursor: pointer;
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
