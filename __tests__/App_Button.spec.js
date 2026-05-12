import { shallowMount } from '@vue/test-utils'
import App_Button from '@/components/_global/App_Button.vue'

describe('App_Button.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(App_Button, {
      props: {
        label: 'Test Label'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
