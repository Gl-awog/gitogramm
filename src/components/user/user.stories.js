import User from './User.vue'

export default {
  title: 'User',
  components: {
    User
  }
}

export const defaultView = () => ({
  components: {
    User
  },
  template: '<User username="Tim" avatar="/avatar/avatar1.png" />'
})

defaultView.Story = {
  name: 'Стандартный вид'
}
