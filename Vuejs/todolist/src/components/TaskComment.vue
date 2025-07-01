<script setup>
import { computed } from 'vue'

const props = defineProps({
  comment: String,
})
const emit = defineEmits(['update:comment'])

const comments = computed({
  get: () => props.comment,
  set: (value) => emit('update:comment', value),
})
</script>

<template>
  <div class="comment">
    <div class="content-title">
      <i class="fa-regular fa-comment-dots fa-fw"></i>
      <span>comment</span>
    </div>
    <div class="comment-data">
      <textarea
        name="comment"
        rows="8"
        placeholder="Type your memo here…"
        v-model="comments"
      ></textarea>
    </div>
  </div>
</template>

<style lang="scss" scoped>
//comment
.comment-data {
  padding-left: 25px;

  textarea {
    resize: none;
    width: 100%;
    padding: 8px 16px;
    border-radius: 2px;
    line-height: 24px;

    &::placeholder {
      color: $grey-3;
    }

    &:focus {
      outline: 2px solid $primary;
    }
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
