<script setup>
import { computed } from 'vue'
const props = defineProps({
  todo: Object,
})

const mmdd = computed(() => {
  if (!props.todo.deadlineDate) return ''
  const dateArray = props.todo.deadlineDate.split('-')
  return `${dateArray[1]}/${dateArray[2]}`
})

const emit = defineEmits(['toggleCompleted', 'togglePin', 'toggleEditing'])
</script>
<template>
  <div class="task-item" :class="{ active: todo.isPin }">
    <div class="task-item-header">
      <input type="checkbox" :checked="todo.isCompleted" @change="emit('toggleCompleted', todo)" />
      <input type="text" :value="todo.title" :class="{ active: todo.isCompleted }" disabled />
      <i
        class="fa-star"
        :class="[todo.isPin ? 'fa-solid active' : 'fa-regular']"
        @click="emit('togglePin', todo)"
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
    color: $grey-5;
    cursor: pointer;
  }
}

.task-status {
  margin-left: 40px;
  > span {
    margin-right: 16px;
  }
}
</style>
