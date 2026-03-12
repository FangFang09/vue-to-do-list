<template>
  <div class="not-found">
    <h1 class="error-number">404 - 找不到頁面</h1>
    <p>您訪問的頁面不存在！</p>
    <router-link to="/">回首頁</router-link>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  text-align: center;
}
.error-number {
  font-size: $font-title;
  font-weight: 900;
  color: $cancel;
}
</style>
