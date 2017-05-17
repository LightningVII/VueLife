export default class Dep {
    constructor(array) { // 构造函数
        this.subs = array || []
    }
    addSub(sub) { // 原型方法
        this.subs.push(sub)
    }
    notify(val) {
        this.subs.forEach(sub => {
            sub.update(val)
        })
    }
}