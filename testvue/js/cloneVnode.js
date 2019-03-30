/* 
<ele>
      <div>
        <Child></Child>
      </div>
    </ele>
*/

Vue.component('Child', {
  data () {
    return {
      count: 1
    }
  },
  methods: {
    btnHandler () {
      this.count++
    }
  },
  render: function (createElement) {
    let data = {
      on: {
        click: this.btnHandler
      }
    }
    let innerText = 'ya look the count' + this.count
    return createElement('p', data, [innerText]);
  }
});
Vue.component('ele', {
  render: function (createElement) {
    //克隆slot节点的方法                 f
    function cloneVNode(vnode) {
      //递归遍历所有子节点，并克隆                     
      const clonedChildren = vnode.children && vnode.children.map(function (vnode) {
        return cloneVNode(vnode);
      });
      const cloned = createElement(vnode.tag,
        vnode.data,
        clonedChildren);
        cloned.ns = vnode.ns;
        cloned.isStatic = vnode.isStatic;
        cloned.key = vnode.key;
        cloned.componentOptions = vnode.componentOptions
        cloned.isComment = vnode.isComment;
        cloned.fnContext = vnode.fnContext;
        cloned.fnOptions = vnode.fnOptions;
        cloned.fnScopeId = vnode.fnScopeId;
        cloned.asyncMeta = vnode.asyncMeta;
        cloned.isCloned = true;
      return cloned;
    }
    const vNodes = this.$slots.default;
    const clonedVNodes = vNodes.map(function (vnode) {
      return cloneVNode(vnode);
    });
    // console.log(clonedVNodes)
    return createElement('div', [vNodes, clonedVNodes]);
  }
});