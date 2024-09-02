/*
 * @Description: file content
 * @Author: cg
 * @Date: 2024-08-20 14:01:17
 * @LastEditors: cg
 * @LastEditTime: 2024-08-20 14:09:07
 */
type Fn = (...args: any[]) => void
type EventBus = {
  $on: (event: any, fn: Fn) => void
  $emit: (event: any, ...args: any[]) => void
  $off: (event: any, fn: Fn) => void
  $once: (event: any, fn: Fn, ...args: any[]) => void
}
// class Bus {
//   listeners: Map<any, any>;
//   constructor() {
//     this.listeners = new Map(); // 收集订阅
//   }
//   // 订阅
//   $on(event: any, fn: Fn) {
//     if (!this.listeners.has(event)) {
//       this.listeners.set(event, []);
//     }
//     this.listeners.get(event).push(fn);
//   }
//   // 发布
//   $emit(event: any, ...args: any[]) {
//     if (this.listeners.has(event)) {
//       this.listeners.get(event).forEach((fn: Fn) => fn(...args));
//     }
//   }
//   // 取消订阅
//   $off(event: any, fn: Fn) {
//     if (this.listeners.has(event)) {
//       if (fn)
//         this.listeners.set(
//           event,
//           this.listeners.get(event).filter((innerFn: Fn) => innerFn !== fn)
//         );
//       else this.listeners.delete(event);
//     } else this.listeners.clear();
//   }
//   $once(event: any, fn: Fn, ...args: any[]) {
//     const once = () => {
//       fn(...args);
//       this.$off(event, once);
//     };
//     this.$on(event, once);
//   }
// }
const useEventBus = (() => {
  let eventBus: EventBus
  return function () {
    console.log('eventBus', eventBus)
    if (eventBus) return eventBus
    eventBus = Bus()
    return eventBus
  }
})()
const Bus = () => {
  const listeners = new Map() // 收集订阅
  // 订阅
  const $on = (event: any, fn: Fn) => {
    if (!listeners.has(event)) {
      listeners.set(event, [])
    }
    listeners.get(event).push(fn)
  }
  // 发布
  const $emit = (event: any, ...args: any[]) => {
    if (listeners.has(event)) {
      listeners.get(event).forEach((fn: Fn) => fn(...args))
    }
  }
  // 取消订阅
  const $off = (event: any, fn: Fn) => {
    if (listeners.has(event)) {
      if (fn)
        listeners.set(
          event,
          listeners.get(event).filter((innerFn: Fn) => innerFn !== fn)
        )
      else listeners.delete(event)
    } else listeners.clear()
  }
  // 执行一次
  const $once = (event: any, fn: Fn, ...args: any[]) => {
    const once = () => {
      fn(...args)
      $off(event, once)
    }
    $on(event, once)
  }
  return { $on, $emit, $off, $once }
}
export default useEventBus
