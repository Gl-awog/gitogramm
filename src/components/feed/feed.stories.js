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
  template: '<Feed avatar="/avatar/avatar1.png" username="Tim" date="21 October" comments=""><template #s-story></template></Feed>'
})

defaultView.story = {
  name: 'Стандартный вид'
}
