import Stats from './Stats.vue'

export default {
  title: 'Stats',
  components: {
    Stats
  }
}

export const defaultView = () => ({
  components: {
    Stats
  },
  template: '<Stats like="1111" fork="2222" />'
})

defaultView.Stats = {
  name: 'Стандартный вид'
}
