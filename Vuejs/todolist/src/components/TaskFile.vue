<script setup>
import { computed } from 'vue'

const { fileName } = defineProps({
  fileName: String,
})

const emit = defineEmits(['update:fileName', 'changeFile'])
const todoFileName = computed({
  get: () => fileName,
  set: (value) => emit('update:fileName', value),
})

const date = new Date().toLocaleDateString('en-CA') // 日期格式yyyy-mm-dd

async function changeFile(event) {
  const file = event.target.files[0]

  if (file) {
    emit('update:fileName', file.name)
    emit('changeFile', file)
  } else {
    emit('update:fileName', '')
    emit('changeFile', '')
  }
}
</script>

<template>
  <div class="add-file">
    <div class="content-title">
      <i class="fa-regular fa-file fa-fw"></i>
      <span>file</span>
    </div>
    <div class="file-upload">
      <div class="upload-data" v-if="todoFileName">
        <span class="file-name">{{ todoFileName }}</span>
        <span class="last-updated">uploaded {{ date }}</span>
      </div>

      <input type="file" name="upload-file" id="upload-file" @change="changeFile" />
      <label for="upload-file">
        <i class="fa-solid fa-square-plus"></i>
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// add file
.add-file {
  margin-bottom: 22px;

  .file-upload {
    display: flex;
    align-items: center;
    gap: 25px;

    padding-left: 25px;

    input[type='file'] {
      display: none;
    }

    label {
      cursor: pointer;
    }

    .fa-square-plus {
      color: $grey-3;
      font-size: 32px;

      &:hover {
        color: $primary;
      }
    }
  }
}

.upload-data {
  display: flex;
  flex-direction: column;
  margin-right: 25px;

  .file-name {
    @include paragraph;
  }

  .last-updated {
    @include paragraph;
    color: $grey-5;
  }
}

.content-title {
  display: flex;
  align-items: center;
  gap: 9px;

  margin-bottom: 8px;

  > span {
    @include subtitle;
  }

  > .fa-file {
    font-size: 18px;
  }
}
</style>
