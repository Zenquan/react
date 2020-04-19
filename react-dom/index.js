import Component from '../react/Component'

const ReactDOM = {
  render
}

function render(vnode, container) {
  return container.append(_render(vnode))
}

// 返回要渲染
function _render(vnode) {
  // console.log(vnode)
  // vnode为空、为undefined、为boolean
  if (vnode === null ||
    vnode === undefined ||
    typeof vnode === 'boolean')
    return

  // vnode为数字
  if (typeof vnode === 'number') {
    vnode = String(vnode)
  }
  // vnode为字符串
  if (typeof vnode === 'string') {
    const textNode = document.createTextNode(vnode)
    return textNode
  }

  // 组件
  // 创建组件
  // 设置属性
  // 渲染组件

  if (typeof vnode.tag === 'function') {
    const comp = createComponent(vnode.tag, vnode.attrs)
    setComponentProps(comp, vnode.attrs)
    return comp.base
  }

  // vnode为object
  // 创建一个元素
  // 遍历加上属性
  // append到container上
  if (typeof vnode === 'object') {
    const {
      tag,
      attrs
    } = vnode
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

// 创建组件
function createComponent(comp, props) {
  // 类组件直接创建返回
  // 函数组件就要构造成类组件
  let instance
  if (comp.prototype && comp.prototype.render) {
    instance = new comp(props)
  } else {
    instance = new Component(props)
    instance.constructor = comp
    instance.render = function () {
      return this.constructor(props)
    }
  }

  return instance
}

// 设置组件
function setComponentProps(comp, props) {
  // 属性处理
  // comp.base是否已经出现
  // 否则是初始化数据
  // 是则componentWillReceiveProps则接受新的props

  if (!comp.base) {
    if (comp.componentWillMount) {
      comp.componentWillMount()
    }
  } else if (comp.componentWillReceiveProps) {
    comp.componentWillReceiveProps()
  }
  comp.attrs = props
  renderComponent(comp)
}

// 渲染组件
export function renderComponent(comp) {
  console.log('comp', comp)
  const renderer = comp.render()
  let base = _render(renderer)

  if (comp.base && comp.componentWillUpdate) {
    comp.componentWillUpdate()
  }

  if (comp.base) {
    if (comp.componentDidUpdate) {
      comp.componentDidUpdate()
    }
  } else if (comp.componentDidMount) {
    comp.componentDidMount()
  }

  // 节点替换
  if (comp.base && comp.base.parentNode) {
    comp.base.parentNode.replaceChild(base, comp.base)
  }

  comp.base = base
}

// 设置属性
function setAttribute(dom, key, value) {
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
    if (!value && typeof value === 'string') {
      dom.style.cssText = value
    } else if (typeof value === 'object') {
      for (let key in value) {
        if (typeof value[key] === 'number') {
          dom.style[key] = value[key] + 'px'
        } else {
          dom.style[key] = value[key]
        }
      }
    }
  } else {
    // 其他的dom[key] = value， 更新
    if (key in dom) {
      dom[key] = value || ''
    }

    if (value) {
      dom.setAttribute(key, value)
    } else {
      dom.removeAttribute(key)
    }
  }
}

export default ReactDOM