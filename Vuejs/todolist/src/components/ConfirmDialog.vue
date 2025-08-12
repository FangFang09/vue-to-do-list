<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

const { todoId } = defineProps({
  todoId: Number,
})

const emit = defineEmits(['cancelDelete', 'confirmDelete', 'close'])

async function handleKeydown(event) {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <!-- check delete dialog -->
  <div class="dialog-overlay">
    <div class="dialog-container">
      <p>Are you sure you want to delete this task?</p>
      <div class="dialog-action">
        <button class="cancelDelete" @click="emit('cancelDelete')">No</button>
        <button class="confirmDelete" @click="emit('confirmDelete', todoId)">Yes</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba($black, 0.4);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 100;
}
.dialog-container {
  background: $white;
  border-radius: 16px;
  padding: 20px;
  margin: 0 20px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  p {
    font-size: 19px;
    margin-bottom: 24px;
    font-weight: 500;
  }
}

.dialog-action {
  width: 90%;
  display: flex;
  gap: 15px;

  button {
    flex: 1 1 0;
    padding: 14px 20px;
    border-radius: 10px;
    border: none;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
}

.cancelDelete {
  background: $grey-2;
  color: $grey-5;

  &:hover {
    background: $grey-3;
  }
}

.confirmDelete {
  background: $cancel;
  color: white;

  &:hover {
    background: $cancel;
    transform: translateY(-1px);
  }
}
</style>
