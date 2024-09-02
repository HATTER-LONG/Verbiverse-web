<script setup lang="ts">
import { onMounted, ref } from "vue"
interface Props {
  url: string // pdf文件地址
}
const props = defineProps<Props>()
const pdfUrl = ref("") // pdf文件地址
const fileUrl = "/pdfjs/web/viewer.html?file=" // pdfjs文件地址
const currentPage = ref(1)
const toolbarVisible = ref(false)
const toolbarStyle = ref({
  top: "0px",
  left: "0px",
  backgroundColor: "white",
  border: "1px solid #ccc",
  padding: "10px",
  zIndex: 1000
})

const button1Action = () => {
  console.log("Button 1 clicked")
}

const button2Action = () => {
  console.log("Button 2 clicked")
}

const showToolbar = (event: MouseEvent, selected: string) => {
  console.log(selected)
  toolbarVisible.value = true
  toolbarStyle.value.top = `${event.clientY}px`
  toolbarStyle.value.left = `${event.clientX}px`
}

onMounted(() => {
  pdfUrl.value = fileUrl + encodeURIComponent(props.url)
  const iframe = document.querySelector("iframe")
  if (iframe) {
    iframe.addEventListener("load", () => {
      iframe.contentWindow?.addEventListener("mouseup", (event: MouseEvent) => {
        const selection = iframe.contentWindow?.getSelection()?.toString()
        if (selection) {
          showToolbar(event, selection)
        } else {
          toolbarVisible.value = false
        }
      })

      // 获取 PDF 页数
      const pdfViewerApp = (iframe.contentWindow as any)?.PDFViewerApplication
      if (pdfViewerApp) {
        console.log(`pdf path: ${pdfViewerApp.baseUrl}`)
        pdfViewerApp.eventBus.on("pagechanging", (event: any) => {
          currentPage.value = event.pageNumber
          console.log(`Current page: ${currentPage.value}`)
        })
      }
    })
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
