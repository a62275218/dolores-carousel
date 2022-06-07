import { createApp } from 'vue'
import Home from './components/Home.vue'
import loader from './components/loader.vue';
import loading from './components/loading.vue';
import App from './App.vue'

const app = createApp(App);
app.component('home', Home)
app.component('loader', loader)
app.component('loading', loading)
app.directive('load', {
  componentUpdated: function (el, binding, vnode) {
    el.onload = function () {
      binding.value.func(binding.value.key)
    }
  }
})
app.mount('#app')