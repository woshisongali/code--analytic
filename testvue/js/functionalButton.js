
// 其中上下文中的data是对createElement方法中的属性进行了封装
/* 
<my-functional-button1 @click="BtnHandler">
        Click me
    </my-functional-button1>
*/

Vue.component('my-functional-button1', {
  functional: true,
  props: {
    color: {
      type: 'String',
      default: null
    }
  },
  render: function (createElement, {props, listeners, children}) {
    // 完全透明的传入任何特性、事件监听器、子结点等。
    return createElement('button', 
    {
      attrs: props,
      on: {
        click: listeners.click
      }
    }
    , children)
  }
})

Vue.component('my-functional-button2', {
  functional: true,
  render: function (createElement, context) {
    // 完全透明的传入任何特性、事件监听器、子结点等。
    return createElement('button', context.data, context.children)
  }
})