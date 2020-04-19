# jsx

1. 搭建开发环境

```bash
// 初始化npm
npm init -y

// 安装parcel打包构建
npm install parcel-bundler -save-dev

// 安装babel相关
npm install babel-core babel-plugin-transform-react-jsx babel-preset-env --save-dev

// 配置.babelrc
{
  "presets": ["env"],
  "plugins": [
    ["transform-react-jsx", {
      "prama": "React.createElement"
    }]
  ]
}
```

2. jsx原理

babel-plugin-transform-react-jsx的作用是把react中jsx的写法转化成React.createElement(tag, attrs, children)

**所以以下引进React的原因就是为了导入React.createElement方法**

```jsx
// React
class React {
  static createElement (tag, attrs, ...children) {
    return {
      tag, 
      attrs,
      children
    }
  }
}

// src/index.js
import React from './react'
import ReactDOM from './react-dom'

const ele = (
  <div style={{color: 'red'}}>
    hello, <span>react</span>
  </div>
)

ReactDOM.render(ele, document.querySelector("#root") )
```

3. ReactDOM.render(除掉组件化后render)

- 作用：将虚拟dom转化成真实dom并挂在root上
- 思路： 

  - vnode为空、为undefined、为boolean， return
  - vnode为字符串，创建文本节点
  - vnode为object
    // 创建一个元素
    // 遍历并设置属性
    // append到container上

```js
function render (vnode, container) {
  return container.append(_render(vnode))
}

// 返回要渲染
function _render(vnode) {
  // vnode为空、为undefined、为boolean
  if (vnode === null 
    || vnode === undefined 
    || typeof vnode === 'boolean') 
    return
  // vnode为字符串
  if (typeof vnode === 'string') {
    const textNode = document.createTextNode(vnode)
    return textNode
  }

  // vnode为object
    // 创建一个元素
    // 遍历加上属性
    // append到container上
  if (typeof vnode === 'object') {
    const {tag, attrs} = vnode
    let dom = document.createElement(tag)
    if (attrs) {
      Object.keys(attrs).map(key => {
        setAttribute(dom, key, attrs[key])
      })
    }

    vnode.children && vnode.children.forEach(child => render(child, dom))

    return dom
  }
}

// 设置属性
function setAttribute (dom, key, value) {
  // className => class
  if (key === 'className') {
    key = 'class'
  } else if (/on\w+/.test(key)) {
    // onCLick => click
    key = key.toLowerCase()
    dom[key] = value || ''
  } else if (key === 'style') {
    // style
    // style="color: 'red'"
    // style={{color: 'red'}}
    if (!value && typeof value ==='string') {
      dom.style.cssText = value
    } else if (typeof value === 'object') {
      for(let key in value) {
        if(typeof value[key] === 'number') {
          dom.style[key] =  value[key] + 'px'
        } else {
          dom.style[key] =  value[key]
        }
      }
    }
  } else {
    // 其他的dom[key] = value， 更新
    if (key in dom) {
      dom[key] = value || ''
    }

    if(value) {
      dom.setAttribute(key, value)
    } else {
      dom.removeAttribute(key)
    }
  }
}

```