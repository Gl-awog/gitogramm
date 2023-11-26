import SlideProgress from './SlideProgress.vue'

export default {
  title: 'SlideProgress',
  components: {
    SlideProgress
  },
  argTypes: {
    onFinish: {
        action: "onFinish",
        description:"fires when progress is 100%"
    }
  }
}

export const defaultView = (args) => ({
  components: {
    SlideProgress
  },
  data () {
    return { args }
  },
  template: '<SlideProgress @onFinish="args.onFinish"></SlideProgress>'
})

defaultView.story = {
  name: 'Стандартный вид'
}
