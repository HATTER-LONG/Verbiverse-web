<template>
  <Owl :closeEyes="isFocus" />
  <div class="login-container">
    <h1>登录</h1>
    <el-form @submit.prevent="handleLogin">
      <el-form-item>
        <el-input v-model="username" placeholder="用户名" @focus="handleFocus" @blur="handleBlur" />
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="password" placeholder="密码" @focus="handleFocus" @blur="handleBlur" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { setToken } from "@/utils/cache/cookies"
import Owl from "./components/Owl.vue"
import { useFocus } from "./hooks/useFocus"

const username = ref("")
const password = ref("")
const router = useRouter()
const { isFocus, handleFocus, handleBlur } = useFocus()

const handleLogin = () => {
  // 模拟登录逻辑
  if (username.value === "admin" && password.value === "123456") {
    setToken("fake-jwt-token")
    router.push("/")
  } else {
    alert("用户名或密码错误")
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>
