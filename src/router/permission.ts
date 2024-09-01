import router from "@/router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { getToken } from "@/utils/cache/cookies"
NProgress.configure({ showSpinner: false })

console.log("router:", router)
router.beforeEach((to, from, next) => {
  NProgress.start()
  console.info("from:", from.path, " to:", to.path)

  const token = getToken()
  console.info("token:", token)

  if (!token) {
    if (to.path === "/login") {
      next()
    } else {
      next("/login")
    }
  }

  if (to.path === "/login") {
    next({ path: "/" })
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})
