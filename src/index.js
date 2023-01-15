import React from 'react'
import ReactDOM from 'react-dom/client'
import useDrag from './hooks/useDrag'

const App = () => {
  const { ref, mode, style, onHandleDragMouseDown } = useDrag()
  return (
    <div
      style={{
        background: mode === 'dragging' ? 'red' : mode === 'pressed' ? 'yellow' : 'blue',
        ...style,
      }}
      ref={ref}
      onMouseDown={onHandleDragMouseDown}
    >
      <h1>Hello World 1234</h1>
      <h2>Welcome to your First React App..!</h2>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
