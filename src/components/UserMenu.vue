<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const isOpenUserMenu = ref(false)

function toggleMenu() {
  isOpenUserMenu.value = !isOpenUserMenu.value
}
</script>

<template>
  <div class="user-menu-container" v-if="authStore.user">
    <button class="user-avatar-button" @click="toggleMenu">
      <img :src="authStore.avatarUrl" class="user-avatar" alt="Avatar" />
    </button>

    <div class="menu-dropdown" v-if="isOpenUserMenu">
      <div class="user-details">
        <p>{{ authStore.user.user_metadata.name }}</p>
        <p class="user-email">{{ authStore.user.user_metadata.email }}</p>
      </div>

      <div class="menu-divider"></div>

      <button type="button" class="menu-item" @click="authStore.signOut">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
        <span>Sign Out</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-menu-container {
  position: relative;
  top: 20%;
  bottom: 0;
  right: 10px;

  opacity: 0.9;
  z-index: 10;
}

.user-avatar-button {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid $white;
    vertical-align: middle;
  }
}

.menu-divider {
  height: 1px;
  background-color: $grey-2;
  margin: 5px 12px;
}

.user-details {
  padding: 8px 12px;

  display: flex;
  flex-direction: column;
  gap: 5px;
}

.user-email {
  color: $grey-4;
  font-size: 14px;
}

.menu-dropdown {
  position: absolute;
  top: 100%;
  right: 0;

  width: 220px;
  z-index: 10;

  background: white;
  border: 1px solid $white;
  border-radius: 8px;
  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.1),
    0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 10px;
  animation: fadeIn 0.3s ease;
  transform-origin: top right;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 8px 12px;
  border: none;
  background: transparent;
  cursor: pointer;

  transition: all 0.3s ease;
  font-size: 14px;

  i {
    width: 18px;
    font-size: 16px;
    color: #6b7280;
    transition: color 0.2s ease;
  }

  span {
    transition: color 0.2s ease;
  }

  &:hover {
    background: $grey-2;
    border-radius: 10px;
  }
}
</style>
