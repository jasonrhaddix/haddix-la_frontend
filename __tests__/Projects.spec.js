import { shallowMount } from '@vue/test-utils'
import { vi } from 'vitest'

vi.mock('@/stores/index.js', () => ({
  __esModule: true,
  default: {
    config: { typesStore: () => ({ PROJECT_TYPE__EXPERIMENT: 'experiment' }) },
    routingStore: () => ({ pushRoute: vi.fn() }),
    projectsStore: () => ({
      hasProjects: false,
      projectsLoading: false,
      projects: []
    }),
    ui: { drawerStore: () => ({ showDrawer: vi.fn() }) },
    userStore: () => ({ userIsAuthenticated: false, sessionToken: '' })
  }
}))

import Projects from '@/views/Projects.vue'

describe('Projects.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(Projects, {
      global: {
        stubs: ['v-btn', 'v-progress-circular', 'project-item', 'CreateButton']
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
