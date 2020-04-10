import Vue from 'vue'
import App from './App.vue'
import leNotes from './components/notes/index'
Vue.use(leNotes)
new Vue({
  el: '#app',
  render: h => h(App)
})
