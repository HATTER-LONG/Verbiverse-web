<script lang="ts" setup>
import { ref } from "vue"
import { useUserStore } from "@/store/modules/user"
import Admin from "./components/Admin.vue"
import Editor from "./components/Editor.vue"

import PDF from "@/components/PdfReader/PdfReader.vue"

const userStore = useUserStore()
const isAdmin = userStore.roles.includes("admin")

const leftPaneWidth = ref("70%")
const isDragging = ref(false)

const startDragging = () => {
  isDragging.value = true
  disableIframePointerEvents()
  window.addEventListener("mousemove", onDrag)
  window.addEventListener("mouseup", stopDragging)
}

const onDrag = (event: MouseEvent) => {
  if (isDragging.value) {
    const newWidth = (event.clientX / window.innerWidth) * 100 - 2
    leftPaneWidth.value = `${newWidth}%`
  }
}

const stopDragging = () => {
  isDragging.value = false
  enableIframePointerEvents()
  window.removeEventListener("mousemove", onDrag)
  window.removeEventListener("mouseup", stopDragging)
}

const disableIframePointerEvents = () => {
  const iframe = document.querySelector(".left-pane iframe")
  if (iframe) {
    //@ts-ignore
    iframe.style.pointerEvents = "none"
  }
}

const enableIframePointerEvents = () => {
  const iframe = document.querySelector(".left-pane iframe")
  if (iframe) {
    //@ts-ignore
    iframe.style.pointerEvents = "auto"
  }
}
</script>

<template>
  <div class="split-container">
    <div class="left-pane" :style="{ width: leftPaneWidth }">
      <PDF url="/Professional-C++-6ed-zh-20240806.pdf" />
    </div>
    <div class="divider" @mousedown="startDragging" />
    <div class="right-pane">
      <component :is="isAdmin ? Admin : Editor" />
    </div>
  </div>
</template>
<style scoped>
.split-container {
  display: flex;
  height: 100vh; /* 使容器高度占满视口 */
  overflow: hidden;
}

.left-pane {
  overflow: hidden;
}

.right-pane {
  flex: 1; /* 右侧面板占据剩余空间 */
  overflow-y: auto; /* 如果内容超出面板，显示滚动条 */
}

.divider {
  width: 5px;
  cursor: col-resize;
  background-color: #ccc;
  position: relative;
  z-index: 1;
}

.divider:hover {
  background-color: #aaa;
}
</style>
