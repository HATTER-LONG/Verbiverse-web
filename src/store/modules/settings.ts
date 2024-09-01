import { type Ref, ref, watch } from "vue"
import { type LayoutSettings, layoutSettings } from "@/config/layouts"
import { defineStore } from "pinia"
import { setConfigLayout } from "@/utils/cache/local-storage"

type SettingsStore = {
  [Key in keyof LayoutSettings]: Ref<LayoutSettings[Key]>
}

type SettingsStoreKey = keyof SettingsStore

export const useSettingsStore = defineStore("settings", () => {
  /** 状态对象 */
  const state = {} as SettingsStore
  // 遍历 layoutSettings 对象的键值对
  for (const [key, value] of Object.entries(layoutSettings)) {
    // 使用类型断言来指定 key 的类型，将 value 包装在 ref 函数中，创建一个响应式变量
    const refValue = ref(value)
    //@ts-ignore
    state[key as SettingsStoreKey] = refValue

    //监听每个响应式变量
    watch(refValue, () => {
      const settings = _getCacheData()
      setConfigLayout(settings)
    })
  }

  /** 获取要缓存的数据：将 state 对象转化为 settings 对象*/
  const _getCacheData = () => {
    const settings = {} as LayoutSettings
    for (const [key, value] of Object.entries(state)) {
      //@ts-ignore
      settings[key as SettingsStoreKey] = value.value
    }
    return settings
  }
  return state
})
