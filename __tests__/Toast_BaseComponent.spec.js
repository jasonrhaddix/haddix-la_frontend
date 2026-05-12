import { shallowMount } from '@vue/test-utils'
import Toast_BaseComponent from '@/components/_global/Toast/Toast_BaseComponent.vue'

describe('Toast_BaseComponent.vue', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(Toast_BaseComponent, {
      props: {
        item: {
          component: 'div',
          data: { example: 'value' }
        }
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
