import Feed from './Feed.vue'

export default {
  title: 'Feed',
  components: {
    Feed
  }
}

export const defaultView = () => ({
  components: {
    Feed
  },
  template: '<Feed avatar="/avatar/avatar1.png" username="Tim" date="21 October" comments=""><template #s-story>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</template></Feed>'
})

defaultView.story = {
  name: 'Стандартный вид'
}
