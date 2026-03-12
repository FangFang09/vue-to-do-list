<script setup>
const emit = defineEmits(['expand'])

function handleClick() {
  emit('expand')
}
</script>

<template>
  <div class="input-event" @click="handleClick">
    <label for="addTask">
      <i class="fa-regular fa-plus"></i>
    </label>
    <input type="text" id="addTask" placeholder="Add Task" />
  </div>
</template>

<style lang="scss" scoped>
.input-event {
  display: flex;
  justify-content: center;

  position: relative;
  border-radius: 5px;
  margin-bottom: 24px;

  input[type='text'] {
    border: 2px solid $grey-3;
    width: 100%;
    padding: 19px 0 18px 67px;
    border-radius: 5px;
    font-size: 24px;

    &::placeholder {
      @include placeholder;
      font-size: 20px;
      color: $grey-3;
    }

    &:focus {
      outline: 3px solid $primary;
    }
  }

  .fa-plus {
    position: absolute;
    color: $grey-3;
    font-size: 24px;
    top: 50%;
    left: 35px;
    transform: translateY(-50%);
  }
}
</style>
