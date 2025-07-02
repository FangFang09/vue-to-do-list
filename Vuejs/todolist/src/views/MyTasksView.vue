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
  // todo.isPin = !todo.isPin
  await taskStore.updateTask(todo.id, { ...todo, isPin: !todo.isPin })
  // fetchTodoData()
}

// checked
async function toggleCompletedForList(todo) {
  // todo.isCompleted = !todo.isCompleted
  await taskStore.updateTask(todo.id, { ...todo, isCompleted: !todo.isCompleted })
}

const today = new Date()
const pad = (date) => date.toString().padStart(2, '0')
const date = ref(`${pad(today.getFullYear())}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`)
const time = ref(`${pad(today.getHours())}:${pad(today.getMinutes())}`)

// const fileName = ref('')
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

// const todoLists = ref([])
// const todoLists = computed(() => {
//   return taskStore.sortedTasks
// })

taskStore.fetchTasks()
// todoLists.value = taskStore.sortedTasks

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
  <!-- add task input -->
  <!-- <div class="input-event" v-if="isExpanded" @click="isExpanded = !isExpanded">
    <label for="addTask">
      <i class="fa-regular fa-plus"></i>
    </label>
    <input type="text" id="addTask" placeholder="Add Task" />
  </div> -->

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
    <!-- <TaskBody
      v-model:deadlineDate="todoInfo.deadlineDate"
      v-model:deadlineTime="todoInfo.deadlineTime"
      v-model:fileName="todoInfo.fileName"
      @changeFile="changeFileHandler"
      v-model:comment="todoInfo.comment"
    /> -->
    <!-- <TaskFooter @onCancel="cancelHandler" /> -->
  </TaskForm>

  <!-- <form action="##" class="add-form" @submit.prevent="onSubmit"> -->

  <!-- <div class="task-header" :class="{ active: isPinActive }">
      <input type="checkbox" />
      <div class="task-input-title">
        <input type="text" placeholder="Type Something Here" v-model="todoInfo.title" />
        <i
          class="fa-star"
          :class="[isPinActive ? 'fa-solid active' : 'fa-regular']"
          @click="togglePin"
        ></i>
        <i class="fa-solid fa-pen"></i>
      </div>
    </div> -->

  <!-- <div class="task-body">
      <div class="deadline">
        <div class="content-title">
          <i class="fa-solid fa-calendar-days fa-fw"></i>
          <span>deadline</span>
        </div>
        <div class="date-time">
          <input type="date" name="deadline-date" v-model="todoInfo.deadlineDate" />
          <input type="time" name="deadline-time" v-model="todoInfo.deadlineTime" />
        </div>
      </div>
      <div class="add-file">
        <div class="content-title">
          <i class="fa-regular fa-file fa-fw"></i>
          <span>file</span>
        </div>
        <div class="file-upload">
          <div class="upload-data" v-if="fileName">
            <span class="file-name">{{ fileName }}</span>
            <span class="last-updated">uploaded {{ date }}</span>
          </div>

          <input type="file" name="upload-file" id="upload-file" @change="changeFileHandler" />
          <label for="upload-file">
            <i class="fa-solid fa-square-plus"></i>
          </label>
        </div>
      </div>
      <div class="comment">
        <div class="content-title">
          <i class="fa-regular fa-comment-dots fa-fw"></i>
          <span>comment</span>
        </div>
        <div class="comment-data">
          <textarea
            name="comment"
            rows="8"
            placeholder="Type your memo here…"
            v-model="todoInfo.comment"
          ></textarea>
        </div>
      </div>
    </div> -->

  <!-- <div class="task-footer">
      <div class="button-group">
        <button type="reset" class="cancel-button" @click="onCancel">
          <i class="fa-solid fa-xmark"></i>
          <span>cancel</span>
        </button>
        <button type="submit" class="add-button">
          <i class="fa-solid fa-plus"></i>
          <span>add task</span>
        </button>
      </div>
    </div> -->
  <!-- </form> -->

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
// add task input
// .input-event {
//   display: flex;
//   justify-content: center;

//   position: relative;
//   border-radius: 5px;
//   margin-bottom: 24px;

//   input[type='text'] {
//     border: 2px solid $grey-3;
//     width: 80%;
//     padding: 19px 0 18px 67px;
//     border-radius: 5px;
//     font-size: 24px;

//     @include deviceScreen($sm-size) {
//       width: 100%;
//     }

//     &::placeholder {
//       @include placeholder;
//       font-size: 20px;
//       color: $grey-3;
//     }

//     &:focus {
//       outline: 3px solid $primary;
//     }
//   }

//   .fa-plus {
//     position: absolute;
//     color: $grey-3;
//     font-size: 24px;
//     top: 50%;
//     left: 75px;
//     transform: translateY(-50%);

//     @include deviceScreen($sm-size) {
//       left: 32px;
//     }
//   }
// }

//add task-header
.add-form {
  margin: 0 auto 24px;
  width: 80%;
  border-radius: 5px;
  box-shadow: 0 4px 4px 0 $grey-3;

  @include deviceScreen($sm-size) {
    width: 100%;
  }

  .task-header {
    @include task-header;
    background-color: $grey-1;
    border-bottom: 3px solid $grey-3;

    &.active {
      background: $pin-bg;
    }
  }

  .task-input-title {
    display: flex;
    align-items: center;
    gap: 32px;
    flex-grow: 1;

    // type something here
    input[type='text'] {
      border: none;
      background-color: transparent;

      flex: 1 1 0;
      width: 50%;

      &:focus {
        outline: none;
      }

      @include title($black);

      @include deviceScreen($sm-size) {
        @include subtitle;
      }
    }
  }

  & .fa-star {
    font-size: 24px;
    color: $grey-5;
    transition: color 0.2s;
    cursor: pointer;

    &.active {
      color: $pin;
    }
  }

  & .fa-pen {
    font-size: 24px;
    color: $primary;
    cursor: pointer;
  }
}

.task-body {
  padding: 24px 32px;
  background-color: $grey-1;

  @include deviceScreen($sm-size) {
    padding: 23px 32px 24px 72px;
  }
}

.content-title {
  display: flex;
  align-items: center;
  gap: 9px;

  margin-bottom: 8px;

  > span {
    @include subtitle;
  }

  > .fa-file {
    font-size: 18px;
  }
}

//deadline
.deadline {
  margin-bottom: 22px;

  .date-time {
    display: flex;
    gap: 8px;
    padding-left: 25px;

    input[type='date'],
    input[type='time'] {
      padding: 8px 16px;
      border-radius: 2px;

      &:focus {
        outline: 2px solid $primary;
      }
    }
  }
}

// add file
.add-file {
  margin-bottom: 22px;

  .file-upload {
    display: flex;
    align-items: center;
    gap: 25px;

    padding-left: 25px;

    input[type='file'] {
      display: none;
    }

    label {
      cursor: pointer;
    }

    .fa-square-plus {
      color: $grey-3;
      font-size: 32px;

      &:hover {
        color: $primary;
      }
    }
  }
  .upload-data {
    display: flex;
    flex-direction: column;
    margin-right: 25px;

    .file-name {
      @include paragraph;
    }

    .last-updated {
      @include paragraph;
      color: $grey-5;
    }
  }
}

//comment
.comment-data {
  padding-left: 25px;

  textarea {
    resize: none;
    width: 100%;
    padding: 8px 16px;
    border-radius: 2px;
    line-height: 24px;

    &::placeholder {
      color: $grey-3;
    }

    &:focus {
      outline: 2px solid $primary;
    }
  }
}

// task-footer
.task-footer {
  .button-group {
    display: flex;
    align-items: center;
  }

  .cancel-button,
  .add-button {
    @include button-setting($black);
  }

  .cancel-button {
    background-color: $white;
    border-radius: 0 0 0 5px;

    &:hover {
      background-color: $hover-white;
    }

    .fa-xmark {
      color: $cancel;
    }

    > span {
      color: $cancel;
    }
  }

  .add-button {
    background-color: $primary;
    border-radius: 0 0 5px 0;

    &:hover {
      background-color: $hover-primary;
    }

    .fa-plus {
      color: $white;
    }

    span {
      color: $white;
    }
  }
}

@mixin task-status {
  padding: 24px 32px 16px;
  margin-bottom: 8px;
  border-radius: 5px;
  color: $grey-5;
  font-size: 14px;
}

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
