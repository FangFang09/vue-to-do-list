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

/* Google 登入按鈕 */
// .google-btn {
//   width: 100%;
//   padding: 18px 24px;
//   background: $white;
//   color: $primary;
//   border: 2px solid $primary;
//   border-radius: 16px;
//   font-size: 16px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 12px;
//   margin-bottom: 32px;
//   position: relative;
//   overflow: hidden;

//   /* 漸層背景效果 */
//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background: linear-gradient(135deg, rgba(66, 133, 244, 0.05), rgba(234, 67, 53, 0.05));
//     opacity: 0;
//     transition: opacity 0.3s ease;
//   }

//   &:hover {
//     border-color: $grey-4;
//     transform: translateY(-3px);
//     box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);

//     &::before {
//       opacity: 1;
//     }
//   }

//   &:disabled {
//     opacity: 0.7;
//     pointer-events: none;
//   }

//   .google-icon {
//     font-size: 20px;
//   }
// }

// .gsi-material-button {
//   -moz-user-select: none;
//   -webkit-user-select: none;
//   -ms-user-select: none;
//   -webkit-appearance: none;
//   background-color: WHITE;
//   background-image: none;
//   border: 1px solid #747775;
//   -webkit-border-radius: 20px;
//   border-radius: 20px;
//   -webkit-box-sizing: border-box;
//   box-sizing: border-box;
//   color: #1f1f1f;
//   cursor: pointer;
//   font-family: 'Roboto', arial, sans-serif;
//   font-size: 14px;
//   height: 40px;
//   letter-spacing: 0.25px;
//   outline: none;
//   overflow: hidden;
//   padding: 0 12px;
//   position: relative;
//   text-align: center;
//   -webkit-transition:
//     background-color 0.218s,
//     border-color 0.218s,
//     box-shadow 0.218s;
//   transition:
//     background-color 0.218s,
//     border-color 0.218s,
//     box-shadow 0.218s;
//   vertical-align: middle;
//   white-space: nowrap;
//   width: auto;
//   max-width: 400px;
//   min-width: min-content;
// }

// .gsi-material-button .gsi-material-button-icon {
//   height: 20px;
//   margin-right: 12px;
//   min-width: 20px;
//   width: 20px;
// }

// .gsi-material-button .gsi-material-button-content-wrapper {
//   -webkit-align-items: center;
//   align-items: center;
//   display: flex;
//   -webkit-flex-direction: row;
//   flex-direction: row;
//   -webkit-flex-wrap: nowrap;
//   flex-wrap: nowrap;
//   height: 100%;
//   justify-content: space-between;
//   position: relative;
//   width: 100%;
// }

// .gsi-material-button .gsi-material-button-contents {
//   -webkit-flex-grow: 1;
//   flex-grow: 1;
//   font-family: 'Roboto', arial, sans-serif;
//   font-weight: 500;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   vertical-align: top;
// }

// .gsi-material-button .gsi-material-button-state {
//   -webkit-transition: opacity 0.218s;
//   transition: opacity 0.218s;
//   bottom: 0;
//   left: 0;
//   opacity: 0;
//   position: absolute;
//   right: 0;
//   top: 0;
// }

// .gsi-material-button:disabled {
//   cursor: default;
//   background-color: #ffffff61;
//   border-color: #1f1f1f1f;
// }

// .gsi-material-button:disabled .gsi-material-button-contents {
//   opacity: 38%;
// }

// .gsi-material-button:disabled .gsi-material-button-icon {
//   opacity: 38%;
// }

// .gsi-material-button:not(:disabled):active .gsi-material-button-state,
// .gsi-material-button:not(:disabled):focus .gsi-material-button-state {
//   background-color: #303030;
//   opacity: 12%;
// }

// .gsi-material-button:not(:disabled):hover {
//   -webkit-box-shadow:
//     0 1px 2px 0 rgba(60, 64, 67, 0.3),
//     0 1px 3px 1px rgba(60, 64, 67, 0.15);
//   box-shadow:
//     0 1px 2px 0 rgba(60, 64, 67, 0.3),
//     0 1px 3px 1px rgba(60, 64, 67, 0.15);
// }

// .gsi-material-button:not(:disabled):hover .gsi-material-button-state {
//   background-color: #303030;
//   opacity: 8%;
// }
</style>
