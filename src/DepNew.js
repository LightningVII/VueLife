export default class Dep {
    constructor(array) {
        this.subs = array || []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.forEach(sub => {
            sub.update(this.target.val)
        })
    }
}