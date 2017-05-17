import Dep from './Dep'
export default class Watcher {
    constructor(vm, expOrFn, cb) {
        // this.key = key
        // this.render = render
        // console.log(render)
        this.cb = cb
        this.vm = vm
        this.expOrFn = expOrFn
        this.depIds = {}

        if (typeof expOrFn === 'function') {
            this.getter = expOrFn
        } else {
            this.getter = this.parseGetter(expOrFn)
        }

        this.value = this.get()
    }
    update(data) {
        this.run()
            // this.render.target[this.key]()
            // document.querySelector('[name="' + this.key + '"]').innerHTML = data
    }
    run() {
        var value = this.get()
        var oldVal = this.value
        if (value !== oldVal) {
            this.value = value
            this.cb.call(this.vm, value, oldVal)
        }
    }
    addDep(dep) {
        if (!this.depIds.hasOwnProperty(dep.id)) {
            dep.addSub(this)
            this.depIds[dep.id] = dep
        }
    }
    get() {
        Dep.target = this
        var value = this.getter.call(this.vm, this.vm)
        Dep.target = null
        return value
    }
    parseGetter(exp) {
        if (/[^\w.$]/.test(exp)) return

        var exps = exp.split('.')

        return function(obj) {
            for (var i = 0, len = exps.length; i < len; i++) {
                if (!obj) return
                obj = obj[exps[i]]
            }
            return obj
        }
    }
}