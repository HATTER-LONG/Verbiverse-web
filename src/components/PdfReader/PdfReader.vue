<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"
interface Props {
  url: string // pdf文件地址
}
const props = defineProps<Props>()
const pdfUrl = ref("") // pdf文件地址
const fileUrl = "/pdfjs/web/viewer.html?file=" // pdfjs文件地址
const toolbarVisible = ref(false)
const toolbarStyle = ref({
  top: "0px",
  left: "0px"
})
const button1Action = () => {
  console.log("Button 1 clicked")
}

const button2Action = () => {
  console.log("Button 2 clicked")
}
const showToolbar = (selection: string) => {
  if (selection) {
    console.log("选中的文本:", selection)
    toolbarVisible.value = true
    toolbarStyle.value.top = "100 px"
    toolbarStyle.value.left = "100 px"
  } else {
    toolbarVisible.value = false
  }
}
onMounted(() => {
  // encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
  // 核心就是将 iframe 的 src 属性设置为 pdfjs 的地址，然后将 pdf 文件的地址作为参数传递给 pdfjs
  // 例如：http://localhost:8080/pdfjs-4.0.189-dist/web/viewer.html?file=http://localhost:8080/pdf/test.pdf
  pdfUrl.value = fileUrl + encodeURIComponent(props.url)
  const iframe = document.querySelector("iframe")
  if (iframe) {
    iframe.addEventListener("load", () => {
      const script = `
        document.addEventListener('mouseup', () => {
          const selectedText = window.getSelection().toString();
          if (selectedText) {
            window.parent.postMessage({ type: 'textSelected', text: selectedText }, '*');
          }
        });
      `
      const scriptElement = document.createElement("script")
      scriptElement.textContent = script
      iframe.contentWindow?.document.body.appendChild(scriptElement)
    })
  }
})

window.addEventListener("message", (event) => {
  if (event.data.type === "textSelected") {
    console.log("选中的文本2:", event.data.text)
    showToolbar(event.data.text)
  }
})
</script>

<template>
  <div class="container">
    <iframe :src="pdfUrl" width="100%" height="100%" />
    <div v-if="toolbarVisible" :style="toolbarStyle" class="toolbar">
      <button @click="button1Action">按钮1</button>
      <button @click="button2Action">按钮2</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
}
.toolbar {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  padding: 5px;
  display: flex;
  gap: 5px;
}
</style>
