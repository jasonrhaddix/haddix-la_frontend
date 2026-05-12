import { shallowMount } from '@vue/test-utils'
import Project_Create__Language_Item from '@/components/Forms/CreateProject/Project/Project_Create__Language_Item.vue'

describe('Project_Create__Language_Item.vue', () => {
  test('renders correctly with default props', () => {
    const wrapper = shallowMount(Project_Create__Language_Item, {
      props: {
        id: 'test-id'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
