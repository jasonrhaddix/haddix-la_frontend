import { shallowMount } from '@vue/test-utils'
import Navigation_Item from '@/components/Navigation/Navigation_Item.vue'

describe('Navigation_Item.vue', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(Navigation_Item, {
      props: { text: 'home', routeName: 'home' }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
