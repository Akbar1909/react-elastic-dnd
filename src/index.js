import React from 'react'
import ReactDOM from 'react-dom/client'
import useDrag from './hooks/useDrag'
import Container from './components/container'
import './style.css'

const App = () => {
  const { ref, mode, style, onHandleDragMouseDown } = useDrag({ isOnlyInParent: true })
  return (
    <Container>
      <div
        style={{
          background: mode === 'dragging' ? 'red' : mode === 'pressed' ? 'yellow' : 'blue',
          ...style,
          width: '20px',
          height: '20px',
          boxSizing: 'border-box',
        }}
        ref={ref}
        onMouseDown={onHandleDragMouseDown}
      ></div>
    </Container>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
