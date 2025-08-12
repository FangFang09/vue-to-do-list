<script setup>
import { computed, ref } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import ConfirmDialog from './ConfirmDialog.vue'
import { useLoadingStore } from '@/stores/loadingStore'

const taskStore = useTaskStore()
const loadingStore = useLoadingStore()

const props = defineProps({
  todo: Object,
})

const mmdd = computed(() => {
  if (!props.todo.deadlineDate) return ''
  const dateArray = props.todo.deadlineDate.split('-')
  return `${dateArray[1]}/${dateArray[2]}`
})

const emit = defineEmits(['toggleCompleted', 'togglePin', 'toggleEditing'])

function togglePin() {
  if (taskStore.isUpdatingSet.has(props.todo.id)) return
  emit('togglePin', props.todo)
}

const isShowDialog = ref(false)
function openDialog() {
  isShowDialog.value = !isShowDialog.value
}

function closeDialog() {
  isShowDialog.value = false
}

async function onCancelDelete() {
  closeDialog()
}

async function onConfirmDelete(taskId) {
  try {
    loadingStore.startLoading('Processing...')
    await taskStore.deleteTask(taskId)
    closeDialog()
  } catch (error) {
    console.log(error)
  } finally {
    loadingStore.stopLoading()
  }
}
</script>
<template>
  <div class="task-item" :class="{ active: todo.isPin }" v-bind="$attrs">
    <div class="task-item-header">
      <input
        type="checkbox"
        :checked="todo.isCompleted"
        :disabled="taskStore.isUpdatingSet.has(props.todo.id)"
        @change="emit('toggleCompleted', todo)"
      />
      <input type="text" :value="todo.title" :class="{ active: todo.isCompleted }" disabled />
      <i class="fa-regular fa-trash-can" @click="openDialog"></i>
      <i
        class="fa-star"
        :class="[todo.isPin ? 'fa-solid active' : 'fa-regular']"
        @click="togglePin"
      ></i>
      <i class="fa-pen fa-regular" @click="emit('toggleEditing', todo.id)"></i>
    </div>
    <div class="task-status">
      <span v-if="todo.deadlineDate">
        <i class="fa-solid fa-calendar-days fa-fw"></i>
        {{ mmdd }}
      </span>
      <span v-if="todo.fileName">
        <i class="fa-regular fa-file fa-fw"></i>
      </span>

      <span v-if="todo.comment">
        <i class="fa-regular fa-comment-dots fa-fw"></i>
      </span>
    </div>
  </div>

  <ConfirmDialog
    v-if="isShowDialog"
    :todoId="props.todo.id"
    @cancelDelete="onCancelDelete"
    @confirmDelete="onConfirmDelete"
    @close="closeDialog"
  />
</template>

<style lang="scss" scoped>
.task-item {
  @include task-status;
  background-color: $grey-1;
  position: relative;

  &.active {
    background: $pin-bg;
  }

  // 拖曳點點點
  &::before {
    display: none;
    content: '. . .';
    height: fit-content;
    color: $grey-3;
    font-size: 22px;
    font-weight: bold;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    transform-origin: 50% 50%;
    transform: rotate(90deg);
  }

  &:hover::before {
    display: block;
    cursor: grab;
  }

  &:active::before {
    cursor: -webkit-grabbing;
    cursor: grabbing;
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

    &:focus {
      outline: none;
    }
    &.active {
      text-decoration: line-through;
    }
  }
  .fa-star {
    font-size: 16px;
    margin-left: 20px;
    color: $grey-5;
    transition: color 0.2s;
    cursor: pointer;

    &.active {
      color: $pin;
    }

    @include deviceScreen($sm-size) {
      font-size: 24px;
      margin-left: 32px;
    }
  }

  .fa-pen {
    font-size: 16px;
    margin-left: 20px;
    color: $grey-5;
    cursor: pointer;

    @include deviceScreen($sm-size) {
      font-size: 24px;
      margin-left: 32px;
    }
  }
  .fa-trash-can {
    font-size: 16px;
    margin-left: 20px;
    color: $grey-5;
    cursor: pointer;

    @include deviceScreen($sm-size) {
      font-size: 24px;
      margin-left: 32px;
    }
  }
}

.task-status {
  margin-left: 40px;
  > span {
    margin-right: 16px;
  }
}
</style>
