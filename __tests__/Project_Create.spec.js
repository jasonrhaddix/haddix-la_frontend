import { shallowMount } from '@vue/test-utils';
import ProjectCreate from '@/components/Forms/CreateProject/Project/Project_Create.vue';

describe('Project_Create.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(ProjectCreate);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
