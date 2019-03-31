const vm = new Vue({
  template: '<div>{{ msg | upper }} ali</div>',
  data: {
    msg: 'hi'
  },
  filters: {
    upper (v) {
      return v.toUpperCase()
    }
  }
}).$mount()

console.log(vm.$el.textContent)