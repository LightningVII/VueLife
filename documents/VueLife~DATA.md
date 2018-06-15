### 发布者-订阅者模式（backbone.js）

### 脏值检查（angular.js） 

### 数据劫持（vue.js）
> vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过[Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

