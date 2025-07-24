<script setup>
import { useLoadingStore } from '@/stores/loadingStore'

const loadingStore = useLoadingStore()
</script>

<template>
  <div v-if="loadingStore.isLoading" class="loader-overlay">
    <div class="loader"></div>
    <p v-if="loadingStore.isLoadingMessage" class="loading-message">
      {{ loadingStore.isLoadingMessage }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 9999;
}

.loader {
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  border-radius: 50%;
  background:
    linear-gradient(0deg, rgba(74, 144, 226, 0.5) 30%, transparent 0 70%, #4a90e2 0) 50%/8% 100%,
    linear-gradient(
        90deg,
        rgba(74, 144, 226, 0.25) 30%,
        transparent 0 70%,
        rgba(0, 64, 139, 0.75) 0
      )
      50%/100% 8%;
  background-repeat: no-repeat;
  animation: l23 1s infinite steps(12);
  filter: drop-shadow(0 4px 12px rgba(74, 144, 226, 0.3));
}
.loader::before,
.loader::after {
  content: '';
  grid-area: 1/1;
  border-radius: 50%;
  background: inherit;
  opacity: 0.915;
  transform: rotate(30deg);
}

.loader::after {
  opacity: 0.83;
  transform: rotate(60deg);
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes l23 {
  100% {
    transform: rotate(1turn);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

.loading-message {
  color: $dark-blue;
  font-size: $font-title;
  font-weight: 500;
  text-align: center;
  margin-left: 16px;
  letter-spacing: 0.5px;
  animation: pulse 2s infinite ease-in-out;
}

@include deviceScreen($sm-size) {
  .loader-container {
    padding: 24px;
    gap: 20px;
  }

  .loader {
    width: 70px;
  }

  .loading-message {
    font-size: 24px;
  }
}
</style>
