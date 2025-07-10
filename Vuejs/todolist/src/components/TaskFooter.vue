<script setup>
defineProps({
  mode: {
    type: String,
    defalut: 'add',
  },
})
const emit = defineEmits(['onCancel'])
</script>

<template>
  <div class="task-footer">
    <div class="button-group">
      <button type="reset" class="cancel-button" @click="emit('onCancel')">
        <i class="fa-solid fa-xmark"></i>
        <span>cancel</span>
      </button>
      <button type="submit" class="add-button">
        <i class="fa-solid fa-plus"></i>
        <span>{{ mode === 'add' ? 'add task' : 'save' }}</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
</style>
