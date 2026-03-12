<script setup>
import GoogleLogin from '@/components/GoogleLogin.vue'
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="logo">
        <div class="logo-icon"></div>
        <h1>Todo List</h1>
      </div>

      <GoogleLogin />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-container {
  background: rgba($white, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 48px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba($white, 0.3);
  animation: slideUp 0.8s ease-out;
  position: relative;
  overflow: hidden;

  // 頂部漸層條
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;

    background-size: 200% 100%;
    animation: gradientMove 3s ease-in-out infinite;
  }

  // 背景粒子效果
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;

    background-size: 30px 30px;
    animation: float 20s linear infinite;
    pointer-events: none;
    z-index: -1;
  }
}

// Logo 區域
.logo {
  text-align: center;
  margin-bottom: 48px;

  &-icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    position: relative;
    box-shadow: 0 8px 32px rgba($hover-primary, 0.3);
    animation: logoFloat 3s ease-in-out infinite;

    &::before {
      content: '📝';
      font-size: 36px;
      filter: brightness(1.2);
    }
  }

  h1 {
    color: $primary;
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 8px 0;
    letter-spacing: -0.5px;
  }
}
</style>
