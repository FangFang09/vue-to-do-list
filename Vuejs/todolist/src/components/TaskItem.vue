<script setup>
const props = defineProps({
  todo: Object,
})

const emit = defineEmits(['toggleCompleted', 'togglePin'])
</script>
<template>
  <div class="task-item">
    <div class="task-item-header">
      <input
        type="checkbox"
        :checked="props.todo.isCompleted"
        @change="emit('toggleCompleted', props.todo)"
      />
      <input
        type="text"
        :value="props.todo.title"
        :class="{ active: props.todo.isCompleted }"
        disabled
      />
      <i
        class="fa-star"
        :class="[props.todo.isPin ? 'fa-solid active' : 'fa-regular']"
        @click="emit('togglePin', props.todo)"
      ></i>
      <i class="fa-light fa-pen"></i>
    </div>
    <div class="task-status">
      <span>
        <i class="fa-solid fa-calendar-days fa-fw"></i>
        {{ props.todo.deadlineDate }}
      </span>
      <span>
        <i class="fa-regular fa-file fa-fw"></i>
      </span>

      <span v-if="props.todo.comment">
        <i class="fa-regular fa-comment-dots fa-fw"></i>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
</style>
