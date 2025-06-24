<script setup>
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()
</script>

<template>
  <header class="header-container">
    <nav class="navbar-container">
      <ul class="nav-list">
        <li class="nav-item">
          <!-- TODO:active -->
          <router-link :to="{ name: 'myTasks' }" :class="route.name === 'myTasks' ? 'active' : ''"
            >my tasks</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            :to="{ name: 'inProgress' }"
            :class="route.name === 'inProgress' ? 'active' : ''"
            >in progress</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            :to="{ name: 'completed' }"
            :class="route.name === 'completed' ? 'active' : ''"
            >completed</router-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header-container {
  background-color: $primary;
  margin-bottom: 24px;
}

.navbar-container {
  max-width: 620px;
  margin: 0 auto;
}

.nav-list {
  display: flex;
  justify-content: center;
}

.nav-item {
  flex: 1 1 0;

  a {
    display: block;
    padding: 23px 0 25px 0;

    text-align: center;
    position: relative;

    @include title($dark-blue);

    &.active {
      color: $white;
    }

    // 底線
    &.active::after {
      content: '';
      display: block;
      width: 85%;
      height: 5px;
      background-color: $dark-blue;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
  }
}
</style>
