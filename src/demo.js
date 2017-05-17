import Observer from './Observer'
import Render from './Render'

export default () => {
    const data = {
        name: '初级菜鸟',
        level: '0-3',
        knowledge: 'HTML, CSS, JAVASCRIPT'
    }

    new Observer(data)
    new Render(data)
        // 这部分实现

    // document.querySelector('[name="name"]').innerHTML = data.name
    // document.querySelector('[name="level"]').innerHTML = data.level
    // document.querySelector('[name="knowledge"]').innerHTML = data.knowledge

    setTimeout(() => {
        data.name = '中级菜鸟'
    }, 1000)

    setTimeout(() => {
        data.level = '3-5'
    }, 2000)

    setTimeout(() => {
        data.name = '高级菜鸟'
    }, 3000)

    setTimeout(() => {
        data.level = '5-10'
    }, 4000)

    setTimeout(() => {
        data.knowledge = 'Angular, React, Vue'
    }, 4000)

    // setTimeout(() => {
    //     data.firstName = data.name
    // }, 3000)

    return data
}