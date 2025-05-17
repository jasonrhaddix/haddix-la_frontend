import { shallowMount } from '@vue/test-utils';
import AppButton from './AppButton.vue';

describe('AppButton.vue', () => {
  test('matches snapshot', () => {
    const wrapper = shallowMount(AppButton);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
