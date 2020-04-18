import React from './react'
import ReactDOM from './react-dom'

const ele = (
  <div>
    hello, <span>react</span>
  </div>
)

ReactDOM.render(ele, document.querySelector('#root'))