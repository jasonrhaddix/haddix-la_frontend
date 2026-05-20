# Playbook: Show a toast, dialog, drawer, or overlay

The app's overlay UI primitives are all driven by Pinia store state. Each has a single mount point in `App.vue` and a "container" component that watches the store. You don't render the dialog/toast/etc. in your component — you push state into the store and the global container renders it.

## The four primitives

| Primitive | Store | Container component | Show / hide actions |
|---|---|---|---|
| Toast (auto-dismissing pill) | `stores.ui.toastStore()` (`src/stores/modules/ui/toast.js`) | `src/components/Containers/Toast_Container.vue` | `addToast({ component, data, timeout?, persist? })`, `clearToast(id)`, `clearAllToasts()` |
| Dialog (modal) | `stores.ui.dialogStore()` (`src/stores/modules/ui/dialog.js`) | `src/components/Containers/Dialog_Container.vue` | `showDialog({ component, width?, props? })`, `hideDialog()` |
| Drawer (side panel) | `stores.ui.drawerStore()` (`src/stores/modules/ui/drawer.js`) | `src/components/Containers/Drawer_Container.vue` | `showDrawer({ component, width?, props? })`, `hideDrawer()` |
| Overlay (full-page sheet) | `stores.ui.overlayStore()` (`src/stores/modules/ui/overlay.js`) | `src/components/Containers/Overlay_Container.vue` | `setComponent({ component, title?, props? })` + `showOverlay()` / `hideOverlay()` |

## The component reference

Heavy components passed to these primitives are pre-defined as **async, raw-marked** Vue components in `src/utils/helpers/asyncComponents.js`. Pass them through — don't import the `.vue` directly when handing to a store:

```js
import { asyncComponents } from '@/utils/helpers'

toastStore.addToast({
  component: asyncComponents.ToastMessage,
  data: { type: 'success', title: 'Done', message: 'Saved.' }
})

dialogStore.showDialog({
  component: asyncComponents.ConfirmationDialog,
  width: 650,
  props: { title: '…', subtitle: '…', confirm: { label: '…', action: async () => {…} }, cancel: { label: '…' } }
})

overlayStore.setComponent({
  component: asyncComponents.CreateProject,
  title: 'Update Project',
  props: { id: '…' }
})
overlayStore.showOverlay()
```

To add a new dialog/drawer/overlay component, register it in `asyncComponents.js` first; reference it from there everywhere.

## Toast shape conventions

The toast component is `Toast_Message.vue`. The `data` object passed to `addToast` is forwarded as props:
- `type` — `'success' | 'error' | …`
- `title` — optional bold line
- `message` — body text

Additional `addToast` keys:
- `timeout` — milliseconds; defaults to `typesStore.UI__TOAST__DELAY__DEFAULT` (`3500`).
- `persist: true` — don't auto-dismiss; user must close.

## Common patterns to look at

- Error feedback after a store action: `src/components/Projects/Project_Item.vue → deleteProject`.
- Inline edit overlay: `src/views/Roles.vue → editRole`.
- Confirmation flow with success/error toasts: same `deleteProject` in `Project_Item.vue`.

## Related

- [[../entities/user]] (login/logout toasts)
- [[../routes/auth]]
- [[../transformations]] — `apiWrapper` auto-toasts unhandled errors when used
