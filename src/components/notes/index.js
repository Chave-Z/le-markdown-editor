import leEditor from './le-editor.vue'
import lePreview from '../preview/le-preview.vue'
import leContextMenu from '../menu/le-context-menu.vue'
const comment = {
  install: function (Vue) {
    Vue.component(leEditor.name, leEditor),
    Vue.component(lePreview.name, lePreview),
    Vue.component(leContextMenu.name, leContextMenu)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment)
}
export default comment
