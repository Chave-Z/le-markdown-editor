import leEditor from './le-editor.vue'
const comment = {
  install: function (Vue) {
    Vue.component(leEditor.name, leEditor)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment)
}
export default comment
