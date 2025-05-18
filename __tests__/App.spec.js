import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';

describe('App.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(App, {
      global: {
        stubs: [
          'RouterView',
          'Navigation',
          'Login',
          'Drawer',
          'Overlay',
          'Dialog',
          'Toast',
          'v-app',
          'v-main'
        ]
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
