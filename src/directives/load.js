import Vue from 'vue'

Vue.directive('load',{
  componentUpdated:function(el, binding, vnode){
    el.onload = function(){
      binding.value.func(binding.value.key)
    }
  }
});
