/**
 * renderList对v-for指令的数组进行 vnode的渲染
 * 如下示例中 renderList中转入的 render渲染函数为ƒ (item,index){return _c('div',[_v("\n      "+_s(item)+"\n    ")])}
 * 循环遍历value则可生成对应的vnode数组
 */


var app = new Vue({
  el: '#app',
  data: {
    fruit: ['apple', 'orange', 'banana']
  }
})

/**
 * <div v-for="(item, index ) in fruit">
      {{item}}
    </div>
 */