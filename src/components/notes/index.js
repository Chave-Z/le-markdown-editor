import leEditor from './le-editor.vue'
import lePreview from '../preview/le-preview.vue'
const comment = {
  install: function (Vue) {
    Vue.component(leEditor.name, leEditor),
    Vue.component(lePreview.name, lePreview)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment)
}
export default comment
