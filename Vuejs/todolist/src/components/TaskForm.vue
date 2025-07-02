<script setup>
import TaskHeader from './TaskHeader.vue'
import TaskBody from './TaskBody.vue'
import TaskFooter from './TaskFooter.vue'

const props = defineProps({
  title: String,
  isPin: Boolean,
  isEdit: Boolean,
  deadlineDate: String,
  deadlineTime: String,
  fileName: String,
  comment: String,
})

const emit = defineEmits([
  'update:title',
  'update:isPin',
  'update:isEdit',
  'update:deadlineDate',
  'update:deadlineTime',
  'update:fileName',
  'changeFile',
  'update:comment',
  'submit',
  'onCancel',
])
</script>

<template>
  <form action="##" class="add-form" @submit.prevent="emit('submit')">
    <TaskHeader
      :title="props.title"
      @update:title="emit('update:title', $event)"
      :isPin="props.isPin"
      @update:isPin="emit('update:isPin', $event)"
      :isEdit="props.isEdit"
      @update:isEdit="emit('update:isEdit', $event)"
    />
    <TaskBody
      :deadlineDate="props.deadlineDate"
      @update:deadlineDate="emit('update:deadlineDate', $event)"
      :deadlineTime="props.deadlineTime"
      @update:deadlineTime="emit('update:deadlineTime', $event)"
      :fileName="props.fileName"
      @update:fileName="emit('update:fileName', $event)"
      @changeFile="emit('changeFile', $event)"
      :comment="props.comment"
      @update:comment="emit('update:comment', $event)"
    />
    <TaskFooter @onCancel="emit('onCancel')" />
  </form>
</template>

<style lang="scss" scoped>
.add-form {
  margin: 0 auto 24px;
  width: 80%;
  border-radius: 5px;
  box-shadow: 0 4px 4px 0 $grey-3;

  @include deviceScreen($sm-size) {
    width: 100%;
  }
}
</style>
