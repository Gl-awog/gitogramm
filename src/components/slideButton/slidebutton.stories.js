import SlideButton from './SlideButton.vue'

export default {
  title: 'SlideButton',
  components: {
    SlideButton
  },
  argTypes: {
    hoverText: {
      control: { type: 'text' }
    }
  }
}

export const defaultView = (args) => ({
  components: {
    SlideButton
  },
  data() {
    return { args }
  },
  template: '<SlideButton v-bind="args">Follow</SlideButton>'
})

defaultView.story = {
  name: 'Стандартный вид'
}

defaultView.args = {
  hoverText: 'unfollow'
}
