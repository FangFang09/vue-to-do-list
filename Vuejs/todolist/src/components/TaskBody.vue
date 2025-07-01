<script setup>
import { computed } from 'vue'
import TaskDeadline from '@/components/TaskDeadline.vue'
import TaskFile from './TaskFile.vue'
import TaskComment from './TaskComment.vue'

const props = defineProps({
  deadlineDate: String,
  deadlineTime: String,
  fileName: String,
  comment: String,
})

const emit = defineEmits([
  'update:deadlineDate',
  'update:deadlineTime',
  'update:fileName',
  'changeFile',
  'update:comment',
])

const deadlineDate = computed({
  get: () => props.deadlineDate,
  set: (value) => emit('update:deadlineDate', value),
})

const deadlineTime = computed({
  get: () => props.deadlineTime,
  set: (value) => emit('update:deadlineTime', value),
})

// const fileName = computed({
//   get: () => props.fileName,
//   set: (value) => emit('update:fileName', value),
// })

const comments = computed({
  get: () => props.comment,
  set: (value) => emit('update:comment', value),
})
</script>

<template>
  <div class="task-body">
    <TaskDeadline v-model:deadlineDate="deadlineDate" v-model:deadlineTime="deadlineTime" />
    <TaskFile
      :fileName="props.fileName"
      @update:fileName="emit('update:fileName', $event)"
      @changeFile="emit('changeFile', $event)"
    />
    <TaskComment v-model:comment="comments" />
    <!-- <div class="deadline">
      <div class="content-title">
        <i class="fa-solid fa-calendar-days fa-fw"></i>
        <span>deadline</span>
      </div>
      <div class="date-time">
        <input type="date" name="deadline-date" v-model="todoInfo.deadlineDate" />
        <input type="time" name="deadline-time" v-model="todoInfo.deadlineTime" />
      </div>
    </div> -->
    <!-- <div class="add-file">
      <div class="content-title">
        <i class="fa-regular fa-file fa-fw"></i>
        <span>file</span>
      </div>
      <div class="file-upload">
        <div class="upload-data" v-if="fileName">
          <span class="file-name">{{ fileName }}</span>
          <span class="last-updated">uploaded {{ date }}</span>
        </div>

        <input type="file" name="upload-file" id="upload-file" @change="changeFileHandler" />
        <label for="upload-file">
          <i class="fa-solid fa-square-plus"></i>
        </label>
      </div>
    </div> -->
    <!-- <div class="comment">
      <div class="content-title">
        <i class="fa-regular fa-comment-dots fa-fw"></i>
        <span>comment</span>
      </div>
      <div class="comment-data">
        <textarea
          name="comment"
          rows="8"
          placeholder="Type your memo here…"
          v-model="todoInfo.comment"
        ></textarea>
      </div>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.task-body {
  padding: 24px 32px;
  background-color: $grey-1;

  @include deviceScreen($sm-size) {
    padding: 23px 32px 24px 72px;
  }
}
</style>
