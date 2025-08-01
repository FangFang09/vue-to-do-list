# Vue Todo List

使用 Vue 3 Composition API 搭配 supabase 開發的 Todo List ，支援使用者登入、任務管理與分類切換。
[Live Demo](https://fangfang09.netlify.app/)

## 技術

- Vue 3 (composition api)
- Pinia (模組化狀態管理)
- sass
- Vite
- Vue Router
- supabase
  - 資料庫：儲存待辦事項
  - Auth：Google 第三方登入驗證
- vuedraggable(拖曳排序)
- TypeScript (部份檔案已轉換)

## login 功能說明

- 使用 google OAuth 登入
- 使用 supabase Auth 進行使用者驗證
- 登入後才能使用待辦功能，未登入則自動導向登入頁
- 增加登出功能

## Todo-List 功能說明

- 新增待辦事項
- 分類待辦事項
  - 全部 (My Tasks)
  - 進行中 (In Progress)
  - 已完成 (Completed)
- 編輯 / 取消編輯待辦事項
- 標註待辦事項為完成
- 標註待辦事項為重要
- 拖曳待辦事項調整順序 (vuedraggable 套件)
- 載入中顯示 Loading 動畫與訊息
- 遵行 RESTful API 與 supabase 串接
- Pinia 狀態管理
  - authStore：管理登入狀態與使用者資訊
  - taskStore：管理待辦事項
  - loadingStore：管理全域載入狀態

## 設計稿來源

本專案依照第一屆 THE F2E - Todo List 的設計稿進行開發

[設計稿連結](https://hexschool.github.io/THE_F2E_Design/todolist/)
