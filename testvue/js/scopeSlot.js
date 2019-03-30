/* 
关于插槽
1.通过 this.$slots 访问静态插槽的内容，得到的是一个 VNodes 数组
2.通过 this.$scopedSlots 访问作用域插槽，得到的是一个返回 VNodes 的渲染函数
如下示例中default上挂载的函数是ƒ (slotProps){return [_c('span',[_v(_s(slotProps.text))])]}
*/
let CurrentUser = {
  data () {
    return {
      firstName: 'song',
      lastName: 'ali'
    }
  },

  render(h) {
    return h('div', {
      style: {
        color: 'red'
      }
    }, this.$slots.default)
  },
}

Vue.component('current-user', CurrentUser)

let CurrentScope = {
  data () {
    return {
      firstName: 'song',
      lastName: 'ali'
    }
  },

  render(h) {
    let slotDefault =  this.$scopedSlots.default({
      text: this.firstName
    })
    return h('div', {
      style: {
        color: 'green'
      }
    }, [slotDefault])
  },
}

Vue.component('current-scope', CurrentScope)


var app = new Vue({
  el: '#app'
})

/**
 * <current-user>
      <span>inner text</span>
    </current-user>
    <current-scope v-slot:default="slotProps">
      <span>{{slotProps.text}}</span>
    </current-scope>
 */