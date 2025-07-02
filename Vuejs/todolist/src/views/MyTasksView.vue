<script setup>
import { ref, reactive } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import { useFileStore } from '@/stores/fileStore'
import AddTaskInput from '@/components/AddTaskInput.vue'
import TaskForm from '@/components/TaskForm.vue'

const taskStore = useTaskStore()

const isExpanded = ref(true)

// pin
const isPinActive = ref(false)

async function togglePinForList(todo) {
  await taskStore.updateTask(todo.id, { ...todo, isPin: !todo.isPin })
}

// checked
async function toggleCompletedForList(todo) {
  await taskStore.updateTask(todo.id, { ...todo, isCompleted: !todo.isCompleted })
}

const today = new Date()
const pad = (date) => date.toString().padStart(2, '0')
const date = ref(`${pad(today.getFullYear())}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`)
const time = ref(`${pad(today.getHours())}:${pad(today.getMinutes())}`)

const file = ref({})

const changeFileHandler = (file) => {
  if (file) {
    todoInfo.fileName = file.name
    file.value = file
    console.log('檔名是：', file.name)
  } else {
    todoInfo.fileName = ''
  }
}
const fileStore = useFileStore()
async function onSubmit() {
  const result = await fileStore.uploadFiles(file.value)
  todoInfo.fileUrl = result.url
  console.log('result', result)

  taskStore.createTask(todoInfo)
  initializeTodoInfo()
  isExpanded.value = !isExpanded.value
}

function cancelHandler() {
  initializeTodoInfo()
  isExpanded.value = !isExpanded.value
  console.log('取消')
}

taskStore.fetchTasks()

function initializeTodoInfo() {
  todoInfo.title = ''
  todoInfo.deadlineDate = date
  todoInfo.deadlineTime = time
  todoInfo.comment = ''
  todoInfo.fileName = ''
  todoInfo.fileUrl = ''
}

const todoInfo = reactive({
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
  <AddTaskInput v-if="isExpanded" @expand="isExpanded = false" />

  <!-- add form -->
  <TaskForm
    v-model:title="todoInfo.title"
    v-model:isPin="isPinActive"
    v-model:deadlineDate="todoInfo.deadlineDate"
    v-model:deadlineTime="todoInfo.deadlineTime"
    v-model:fileName="todoInfo.fileName"
    @changeFile="changeFileHandler"
    v-model:comment="todoInfo.comment"
    @submit="onSubmit"
    @onCancel="cancelHandler"
    v-else
  >
  </TaskForm>

  <!-- task-list -->
  <div class="task-list">
    <div
      class="task-item"
      v-for="todo in taskStore.sortedTasks"
      :key="todo.id"
      :class="{ active: todo.isPin }"
    >
      <div class="task-item-header">
        <input type="checkbox" :checked="todo.isCompleted" @change="toggleCompletedForList(todo)" />
        <input type="text" :value="todo.title" :class="{ active: todo.isCompleted }" disabled />
        <i
          class="fa-star"
          :class="[todo.isPin ? 'fa-solid active' : 'fa-regular']"
          @click="togglePinForList(todo)"
        ></i>
        <i class="fa-light fa-pen"></i>
      </div>
      <div class="task-status">
        <span>
          <i class="fa-solid fa-calendar-days fa-fw"></i>
          {{ todo.deadlineDate }}
        </span>
        <span>
          <i class="fa-regular fa-file fa-fw"></i>
        </span>

        <span v-if="todo.comment">
          <i class="fa-regular fa-comment-dots fa-fw"></i>
        </span>
      </div>
    </div>
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
