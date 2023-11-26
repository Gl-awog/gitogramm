import Comment from './Comment.vue'

export default {
  title: 'Comment',
  components: {
    Comment
  }
}

export const defaultView = () => ({
  components: {
    Comment
  },
  template: '<Comment username="Tim" text="transition-group with flex parent causes removed items to fly" />'
})

defaultView.story = {
  name: 'Стандартный вид'
}
