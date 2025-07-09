<script setup>
import { computed } from 'vue'
const props = defineProps({
  title: String,
  isPin: Boolean,
})

const title = computed({
  get: () => props.title,
  set: (value) => emit('update:title', value),
})

const isPin = computed({
  get: () => props.isPin,
  set: (value) => emit('update:isPin', value),
})

function togglePin() {
  isPin.value = !isPin.value
}

const emit = defineEmits(['update:title', 'update:isPin'])
</script>
<template>
  <div class="task-header" :class="{ active: isPin }">
    <input type="checkbox" />
    <div class="task-input-title">
      <input type="text" placeholder="Type Something Here" v-model="title" />
      <i class="fa-star" :class="[isPin ? 'fa-solid active' : 'fa-regular']" @click="togglePin"></i>
      <i class="fa-pen fa-regular"></i>
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

.fa-star {
  font-size: 24px;
  color: $grey-5;
  transition: color 0.2s;
  cursor: pointer;

  &.active {
    color: $pin;
  }
}

.fa-pen {
  font-size: 24px;
  color: $grey-5;
  transition: color 0.2s;
  cursor: pointer;

  &.active {
    color: $primary;
  }
}
</style>
