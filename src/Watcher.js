export default class Watcher {
    constructor(key, render) {
        this.key = key
        this.render = render
        console.log(render)
    }
    update(data) {
        // this.render.target[this.key]()
        document.querySelector('[name="' + this.key + '"]').innerHTML = data
    }
}