import leNotes from './le-notes.vue'
const comment = {
  install: function (Vue) {
    Vue.component(leNotes.name, leNotes)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment)
}
export default comment
