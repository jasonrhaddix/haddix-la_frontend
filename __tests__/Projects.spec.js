import { shallowMount } from '@vue/test-utils'
import ProjectsView from '@/components/ProjectsView.vue'

jest.mock('@/stores/index.js', () => ({
  __esModule: true,
  default: {
    config: { typesStore: () => ({ PROJECT_TYPE__EXPERIMENT: 'experiment' }) },
    routingStore: () => ({ pushRoute: jest.fn() }),
    projectsStore: () => ({
      hasProjects: false,
      projectsLoading: false,
      projects: []
    }),
    ui: { drawerStore: () => ({ showDrawer: jest.fn() }) },
    userStore: () => ({ userIsAuthenticated: false, sessionToken: '' })
  }
}))

describe('ProjectsView.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(ProjectsView, {
      global: {
        stubs: ['v-btn', 'v-progress-circular', 'project-item', 'CreateButton']
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
