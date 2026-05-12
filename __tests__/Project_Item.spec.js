import { shallowMount } from '@vue/test-utils'
import Project_Item from '@/components/Projects/Project_Item.vue'

describe('Project_Item.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Project_Item, {
      props: {
        data: {
          title: 'Sample Project',
          subtitle: 'Sample subtitle',
          client: 'Sample Client',
          link: null
        }
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
