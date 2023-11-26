import SlideItem from './SlideItem.vue'

export default {
  title: 'SlideItem',
  components: {
    SlideItem
  },
  argTypes: {
    // hoverText: {
    //     control: {type:'text'}
    // }
  }
}

export const defaultView = (args) => ({
  components: {
    SlideItem
  },
  data () {
    return { args }
  },
  template: '<SlideItem v-bind="args">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </SlideItem>'
})

defaultView.story = {
  name: 'Стандартный вид'
}

defaultView.args = {
  avatar: '/avatar/avatar1.png',
  username:'Tim'
}
