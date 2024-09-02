<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user"
import Admin from "./components/Admin.vue"
import Editor from "./components/Editor.vue"

import PDF from "@/components/PdfReader/PdfReader.vue"
import SplitView from "@/components/SplitView.vue"

const userStore = useUserStore()
const isAdmin = userStore.roles.includes("admin")
</script>

<template>
  <SplitView>
    <template #left>
      <PDF url="/Professional-C++-6ed-zh-20240806.pdf" />
    </template>
    <template #right>
      <component :is="isAdmin ? Admin : Editor" />
    </template>
  </SplitView>
</template>
