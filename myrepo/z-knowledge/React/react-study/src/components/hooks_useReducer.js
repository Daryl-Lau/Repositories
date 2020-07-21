import React, { useReducer } from 'react'


// useReducer和useState一样，不仅可以使用对象作为初始值，还可以使用数组，数字，字符串等
const initCount = { count: 0 }

function reducer (state, action) {
  switch (action.type) {
    case 'decrement':
      return { count: state.count - 1 }
    case 'increment':
      return { count: state.count + 1 }
    default:
      throw new Error('unknow action type');
  }
}

function ReducerCounter (props) {

  // useReducer接收两个参数，第一个数reducer，第二个是初始值
  // 返回state，最新的state，和dispatch，派发reducer的函数
  const [state, dispatch] = useReducer(reducer, initCount)
  console.log(state);
  return (
    <div>
      <h1>{state.count}</h1>
      <button onClick={() => { dispatch({ type: 'decrement' }) }}>-1</button>
      <button onClick={() => { dispatch({ type: 'increment' }) }}>+1</button>
    </div>
  )
}

export default ReducerCounter