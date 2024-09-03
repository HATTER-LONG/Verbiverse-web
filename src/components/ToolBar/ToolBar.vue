<script setup lang="ts">
import { defineEmits } from "vue"

interface Props {
  selected_text: string
}

const props = defineProps<Props>()
const emit = defineEmits(["button1Click", "button2Click"])

const button1Action = () => {
  emit("button1Click")
  console.log("props.selected_text: ", props.selected_text)
}

const button2Action = () => {
  emit("button2Click")
  console.log("2 props.selected_text: ", props.selected_text)
}
</script>

<template>
  <div class="toolbar">
    <button @click="button1Action">按钮1</button>
    <button @click="button2Action">按钮2</button>
  </div>
</template>

<style scoped lang="scss">
.toolbar {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  padding: 5px;
  display: flex;
  gap: 5px;
}
</style>
