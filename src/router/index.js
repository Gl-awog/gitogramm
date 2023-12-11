import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes.js'
import * as api from '@/api'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authRoute = to.name === 'auth'

  try {
    await api.user.getUser()
    next(authRoute ? { name: 'home' } : null)
  } catch (error) {
    if (error.response.status === 401) {
      next(authRoute ? null : { name: 'auth' })
    }
    console.log(error)
  }
})

export default router
