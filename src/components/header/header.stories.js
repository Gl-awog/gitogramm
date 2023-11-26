import Header from './Header.vue'

export default {
  title: 'Header',
  components: {
    Header
  }
}

export const defaultView = () => ({
  components: {
    Header
  },
  template: '<Header><template #s-topline>Topline</template><template #s-bottomline>Bottomline</template></Header>'
})

defaultView.story = {
  title: 'Стандартный вид'
}
