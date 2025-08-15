<script setup>
import { computed } from 'vue'
const props = defineProps({
  title: String,
  is_pin: Boolean,
  isEditing: Boolean,
})

const title = computed({
  get: () => props.title,
  set: (value) => emit('update:title', value),
})

const is_pin = computed({
  get: () => props.is_pin,
  set: (value) => emit('update:is_pin', value),
})

const emit = defineEmits(['update:title', 'update:is_pin', 'toggleEditing'])
</script>
<template>
  <div class="task-header" :class="{ active: is_pin }">
    <input type="checkbox" />
    <div class="task-input-title">
      <input type="text" placeholder="Type Something Here" v-model="title" />
      <i
        class="fa-star"
        :class="[is_pin ? 'fa-solid active' : 'fa-regular']"
        @click="emit('update:is_pin', !is_pin)"
      ></i>
      <i
        class="fa-pen"
        :class="[isEditing ? 'fa-solid active' : 'fa-regular']"
        @click="emit('toggleEditing')"
      ></i>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
  gap: 20px;
  flex-grow: 1;

  @include deviceScreen($sm-size) {
    gap: 32px;
  }

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

.fa-star {
  font-size: 16px;
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
  color: $grey-5;
  transition: color 0.2s;
  cursor: pointer;

  &.active {
    color: $primary;
  }

  @include deviceScreen($sm-size) {
    font-size: 24px;
  }
}
</style>
