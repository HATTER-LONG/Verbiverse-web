<template>
  <div class="split-view">
    <div class="pane left-pane" ref="leftPane">
      <slot name="left" />
    </div>
    <div class="divider" @mousedown="startDrag" @mouseup="stopDrag" />
    <div class="pane right-pane" ref="rightPane">
      <slot name="right" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"

const leftPane = ref(null)
const rightPane = ref(null)

const startDrag = () => {
  console.log("startDrag")
  document.addEventListener("mousemove", doDrag)
  document.addEventListener("mouseup", stopDrag)
}

const doDrag = (event: MouseEvent) => {
  console.log("doDrag")
  const leftPaneWidth = event.clientX
  leftPane.value.style.width = `${leftPaneWidth}px`
  rightPane.value.style.width = `calc(100% - ${leftPaneWidth}px)`
}

const stopDrag = () => {
  console.log("stopDrag")
  document.removeEventListener("mousemove", doDrag)
  document.removeEventListener("mouseup", stopDrag)
}
</script>

<style scoped>
.split-view {
  display: flex;
  width: 100%;
  height: 100%;
}

.pane {
  overflow: auto;
}

.left-pane {
  width: 50%;
}

.right-pane {
  width: 50%;
}

.divider {
  width: 5px;
  cursor: col-resize;
  background-color: #ccc;
}
</style>
