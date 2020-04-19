import { renderComponent } from './../react-dom'

class Component {
  constructor(props) {
    this.props = props
    this.state = {}
  }
  setState (newState) {
    // 对象拷贝
    Object.assign(this.state, newState)
    // 重新渲染组件
    renderComponent(this)
  }
}

export default Component