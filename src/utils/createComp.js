import Vue from "vue";

export function create(Component, props) {
  // 借鸡生蛋new Vue({render() {}}),在render中把Component作为根组件
  const vm = new Vue({
    // h是createElement函数，它可以返回虚拟dom
    render(h) {
      // 将Component作为根组件渲染出来
      return h(Component, { props });
    },
  }).$mount(); // 挂载是为了把虚拟dom变成真实dom
  // 挂载之后$el可以访问到真实dom
  document.body.appendChild(vm.$el);
  // 实例
  const comp = vm.$children[0];
  // 淘汰机制
  comp.remove = () => {
    // 删除dom
    document.body.removeChild(vm.$el);
    // 销毁组件
    vm.$destroy();
  };
  // 返回Component组件实例
  return comp;
}
