import { vi, beforeEach } from 'vitest'
import { config } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false
  })
}

if (typeof HTMLCanvasElement !== 'undefined') {
  const noop = () => {}
  const stubCtx = new Proxy({}, {
    get: (_t, prop) => {
      if (prop === 'canvas') return null
      if (prop === 'measureText') return () => ({ width: 0 })
      if (prop === 'getImageData') return () => ({ data: new Uint8ClampedArray(0) })
      if (prop === 'createLinearGradient' || prop === 'createRadialGradient') {
        return () => ({ addColorStop: noop })
      }
      return noop
    },
    set: () => true
  })
  HTMLCanvasElement.prototype.getContext = () => stubCtx
  HTMLCanvasElement.prototype.toDataURL = () => ''
}

vi.mock('i18next-vue', () => ({
  default: { install: () => {} },
  useTranslation: () => ({ t: (key) => key, i18next: { language: 'en-US', changeLanguage: vi.fn() } }),
  I18NextVue: { install: () => {} }
}))

vi.mock('gsap', () => ({
  default: {},
  TweenMax: { to: vi.fn(), from: vi.fn(), fromTo: vi.fn(), staggerFromTo: vi.fn() },
  TweenLite: { to: vi.fn(), from: vi.fn() },
  TimelineMax: vi.fn(() => ({ to: vi.fn(), from: vi.fn(), add: vi.fn(), play: vi.fn() })),
  Power0: { easeNone: 'Power0.easeNone' },
  Power1: { easeOut: 'Power1.easeOut', easeIn: 'Power1.easeIn', easeInOut: 'Power1.easeInOut' },
  Power2: { easeOut: 'Power2.easeOut', easeIn: 'Power2.easeIn', easeInOut: 'Power2.easeInOut' },
  Power3: { easeOut: 'Power3.easeOut', easeIn: 'Power3.easeIn', easeInOut: 'Power3.easeInOut' },
  Power4: { easeOut: 'Power4.easeOut', easeIn: 'Power4.easeIn', easeInOut: 'Power4.easeInOut' },
  Linear: { easeNone: 'Linear.easeNone' },
  Sine: { easeOut: 'Sine.easeOut', easeIn: 'Sine.easeIn', easeInOut: 'Sine.easeInOut' },
  Expo: { easeOut: 'Expo.easeOut', easeIn: 'Expo.easeIn', easeInOut: 'Expo.easeInOut' },
  Elastic: { easeOut: { config: () => 'Elastic.easeOut' } },
  Back: { easeOut: { config: () => 'Back.easeOut' } },
  gsap: {
    to: vi.fn(), from: vi.fn(), fromTo: vi.fn(),
    timeline: () => ({ to: vi.fn(), from: vi.fn(), add: vi.fn() }),
    set: vi.fn(), registerPlugin: vi.fn()
  }
}))

vi.mock('three', async () => {
  // three v0.104 exports many geometry/material classes the codebase enumerates.
  // We return a Proxy so any unknown export resolves to a generic constructible Stub.
  const noop = () => {}
  function Stub() {
    return {
      add: noop, remove: noop,
      position: { set: noop, x: 0, y: 0, z: 0 },
      rotation: { set: noop, x: 0, y: 0, z: 0 },
      scale: { set: noop, x: 1, y: 1, z: 1 },
      lookAt: noop, copy: noop, clone: () => Stub(),
      traverse: noop, updateMatrixWorld: noop,
      updateProjectionMatrix: noop,
      aspect: 1, near: 0.1, far: 1000, fov: 50,
      matrix: { set: noop }, matrixWorld: { set: noop },
      castShadow: false, receiveShadow: false,
      visible: true, layers: { set: noop, enable: noop },
      target: { position: { set: noop, x: 0, y: 0, z: 0 } }
    }
  }
  function RendererStub() {
    return {
      setSize: noop, setPixelRatio: noop, render: noop, dispose: noop,
      setClearColor: noop, setAnimationLoop: noop,
      domElement: typeof document !== 'undefined' ? document.createElement('canvas') : {}
    }
  }
  function ClockStub() {
    return { getElapsedTime: () => 0, getDelta: () => 0, start: noop, stop: noop }
  }
  function Vec() {
    return { set: noop, x: 0, y: 0, z: 0, copy: noop, multiplyScalar: noop, add: noop, sub: noop }
  }
  const known = {
    default: {},
    Scene: Stub,
    PerspectiveCamera: Stub,
    OrthographicCamera: Stub,
    WebGLRenderer: RendererStub,
    WebGLRenderTarget: Stub,
    Mesh: Stub,
    BoxGeometry: Stub,
    SphereGeometry: Stub,
    PlaneGeometry: Stub,
    BufferGeometry: Stub,
    BufferAttribute: Stub,
    InstancedBufferAttribute: Stub,
    Float32BufferAttribute: Stub,
    IcosahedronGeometry: Stub,
    IcosahedronBufferGeometry: Stub,
    OctahedronGeometry: Stub,
    TetrahedronGeometry: Stub,
    DodecahedronGeometry: Stub,
    TorusGeometry: Stub,
    CylinderGeometry: Stub,
    ConeGeometry: Stub,
    RingGeometry: Stub,
    Geometry: Stub,
    MeshBasicMaterial: Stub,
    MeshStandardMaterial: Stub,
    MeshLambertMaterial: Stub,
    MeshPhongMaterial: Stub,
    MeshNormalMaterial: Stub,
    ShaderMaterial: Stub,
    LineBasicMaterial: Stub,
    PointsMaterial: Stub,
    Points: Stub,
    Line: Stub,
    LineSegments: Stub,
    AmbientLight: Stub,
    DirectionalLight: Stub,
    PointLight: Stub,
    SpotLight: Stub,
    HemisphereLight: Stub,
    Group: Stub,
    Object3D: Stub,
    Color: function () { return { set: noop, r: 0, g: 0, b: 0, getStyle: () => '#000', setHex: noop } },
    Vector2: Vec,
    Vector3: Vec,
    Vector4: Vec,
    Quaternion: Vec,
    Euler: Vec,
    Matrix3: Stub,
    Matrix4: Stub,
    Clock: ClockStub,
    Raycaster: Stub,
    TextureLoader: function () { return { load: () => ({}) } },
    Texture: Stub,
    CanvasTexture: Stub,
    Fog: Stub,
    FogExp2: Stub,
    DoubleSide: 2,
    FrontSide: 0,
    BackSide: 1,
    NoBlending: 0,
    NormalBlending: 1,
    AdditiveBlending: 2,
    SubtractiveBlending: 3,
    MultiplyBlending: 4,
    LinearFilter: 1006,
    NearestFilter: 1003,
    RepeatWrapping: 1000,
    ClampToEdgeWrapping: 1001
  }
  return known
})

vi.mock('vue-uuid', () => ({
  uuid: { v1: () => 'uuid-v1', v4: () => 'uuid-v4' },
  UUID: { install: () => {} }
}))

// three-optimize is a heavy WebGL bootstrap that touches dozens of THREE.* constants
// at import time. Specs for components that use it (Sphere_BG, Home) only need
// a renderer DOM node to append; the rest is irrelevant in jsdom.
vi.mock('@/js/threejs/three-optimize.js', () => ({
  default: typeof document !== 'undefined' ? document.createElement('div') : {}
}))

vi.mock('vue3-google-map', () => ({
  GoogleMap: { name: 'GoogleMap', render: () => null },
  Marker: { name: 'Marker', render: () => null },
  CustomMarker: { name: 'CustomMarker', render: () => null }
}))

vi.mock('@tiptap/vue-3', () => ({
  Editor: vi.fn(() => ({ destroy: vi.fn(), commands: {}, getHTML: () => '', isActive: () => false })),
  EditorContent: { name: 'EditorContent', render: () => null },
  useEditor: () => ({ value: null, destroy: vi.fn() }),
  BubbleMenu: { name: 'BubbleMenu', render: () => null },
  FloatingMenu: { name: 'FloatingMenu', render: () => null }
}))

vi.mock('@tiptap/starter-kit', () => ({ default: {} }))

vi.mock('vuedraggable', () => ({ default: { name: 'draggable', render: () => null } }))

vi.mock('@fortawesome/vue-fontawesome', () => ({
  FontAwesomeIcon: { name: 'FontAwesomeIcon', render: () => null },
  FontAwesomeLayers: { name: 'FontAwesomeLayers', render: () => null }
}))

config.global.stubs = {
  ...config.global.stubs,
  'router-view': true,
  'router-link': true,
  RouterView: true,
  RouterLink: true,
  'v-app': true,
  'v-main': true,
  'v-container': true,
  'v-layout': true,
  'v-btn': true,
  'v-icon': true,
  'v-dialog': true,
  'v-snackbar': true,
  'v-progress-circular': true,
  'v-progress-linear': true,
  'v-card': true,
  'v-card-title': true,
  'v-card-text': true,
  'v-card-actions': true,
  'v-list': true,
  'v-list-item': true,
  'v-text-field': true,
  'v-textarea': true,
  'v-form': true,
  'v-select': true,
  'v-menu': true,
  'v-tooltip': true,
  'v-app-bar': true,
  'v-navigation-drawer': true,
  'v-spacer': true,
  'v-row': true,
  'v-col': true,
  'v-img': true,
  'v-divider': true,
  'v-chip': true,
  'v-overlay': true,
  'v-fab': true,
  'v-fab-transition': true,
  'v-expand-transition': true,
  'v-slide-x-transition': true,
  'v-slide-y-transition': true,
  'v-fade-transition': true,
  'font-awesome-icon': true,
  FontAwesomeIcon: true
}

config.global.mocks = {
  ...config.global.mocks,
  $t: (key) => key,
  $i18next: { language: 'en-US', changeLanguage: vi.fn() },
  $uuid: { v1: () => 'uuid-v1', v4: () => 'uuid-v4' }
}

beforeEach(() => {
  // Default Pinia for components that grab a store at module-setup.
  // Per-spec specs that need their own pinia (Overlay_Container) install one explicitly via global.plugins.
  setActivePinia(createPinia())
})
