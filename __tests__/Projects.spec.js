import { shallowMount } from '@vue/test-utils';
import ProjectsView from '@/components/ProjectsView.vue';

describe('ProjectsView.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(ProjectsView);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
