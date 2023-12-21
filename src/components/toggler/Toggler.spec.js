import { shallowMount } from '@vue/test-utils'
import Toggler from './Toggler'

describe('Toggler component', () => {
  it('изменяет надпись при клике', async () => {
    const wrapper = shallowMount(Toggler)

    expect(wrapper.find('.text').text()).toBe('View issues')

    await wrapper.find('button').trigger('click')

    expect(wrapper.find('.text').text()).toBe('Hide issues')
  })
})
