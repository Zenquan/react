import React from './react'
import ReactDOM from './react-dom'

// const ele = (
//   <div style={{color: 'red'}}>
//     hello, <span>react</span>
//   </div>
// )

// 函数组件
function Home(){
  return (
      <div className="active" title="tan">
          hello,<span>react</span>
          <Tan />
      </div>
  )
}

function Tan(){
  return (
      <h1>
          我是嵌套函数--
      </h1>
  )
}

ReactDOM.render( <Home name="arr name" />, document.querySelector("#root") )