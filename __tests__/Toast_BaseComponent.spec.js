// ToastContent.spec.js
import { shallowMount } from '@vue/test-utils'
import ToastContent from './ToastContent.vue'

describe('ToastContent.vue', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(ToastContent, {
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
