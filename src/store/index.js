import { createStore } from 'vuex'
import { trendings } from './modules/trendings'
import { user } from './modules/user'
import { starred } from './modules/starred'

export default createStore({
  modules: {
    trendings,
    user,
    starred
  }
})
