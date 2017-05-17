import Dep from './Dep'
import Watcher from './Watcher'
// import Render from './Render'
export default class Observer {
    constructor(data) { // 构造函数
        this.data = data
        this.observe(data)
    }
    observe(data) { // 原型方法
        if (!data || typeof data !== 'object') {
            return
        }
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })

        // this.render = new Render(data)
    }
    defineReactive(data, key, val) {
        const dep = new Dep()
        this.observe(val) // 监听子属性
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false,
            get: function() {
                console.log('获取属性 ' + val)
                dep.target = new Watcher(key)
                dep.addSub(dep.target)
                return val
            },
            set: function(newVal) {
                if (val === newVal) return
                console.log('监听到值变化了 ', val, ' --> ', newVal)
                val = newVal
                dep.target.val = newVal
                dep.notify()
            }
        })
    }
}