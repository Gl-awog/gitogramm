import Toggler from './Toggler.vue'

export default {
  title: 'Toggler',
  components: {
    Toggler
  }
}

export const defaultView = () => ({
  components: {
    Toggler
  },
  template: '<Toggler />'
})

defaultView.Toggler = {
  name: 'Стандартный вид'
}
