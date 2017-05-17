export default class Render {
    constructor(objs) { // 构造函数
        this.objs = objs
        this.target = {}
        this.render(objs)
    }
    render(objs) { // 原型方法
        for (const key in objs) {
            document.querySelector('[name="' + key + '"]').innerHTML = objs[key]
        }
    }

    // addEvent(key) {
    //     this.target[key] = () => {
    //         document.querySelector('[name="' + key + '"]').innerHTML = this.objs[key]
    //     }
    // }
}