import Story from './Story.vue'

export default {
  title: 'Story',
  components: {
    Story
  }
}

export const defaultView = () => ({
  components: {
    Story
  },
  template: '<Story title="Title" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit" like="230000" fork="324234"/>'
})

defaultView.story = {
  name: 'Стандартный вид'
}
