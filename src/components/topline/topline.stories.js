import Topline from './Topline.vue'

export default {
  title: 'Topline',
  components: {
    Topline
  }
}

export const defaultView = () => ({
  components: {
    Topline
  },
  template: '<Topline />'
})

defaultView.Topline = {
  name: 'Стандартный вид'
}
