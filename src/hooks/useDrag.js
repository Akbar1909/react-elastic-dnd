import { useRef, useState, useMemo } from 'react'

const inital = {
  pos1: 0,
  pos2: 0,
  pos3: 0,
  pos4: 0,
}

/**
 *@typedef {Object} StyleTypedef - style
 *@property {'fixed'} position - element position (fixed)
 *@property {string} top - top property
 *@property {string} left - left property
 *@property {'grabbing' | 'grab' | 'initial'} - cursor style
 */

/**
 * @typedef {Object} ReturnTypedef - return
 * @property {StyleTypedef} style - element style
 * @property {Object} ref - element
 * @property {function} onHandleDragMouseDown - the function for onMouseDown event
 */

/**
 * @description useDrag hook helps you to move your element with mouse.
 * @returns {ReturnTypedef}
 */

const useDrag = () => {
  const [mode, setMode] = useState('stopped')
  const position = useRef(inital)
  const [translate, setTranslate] = useState({
    top: 0,
    left: 0,
  })

  const draggableElRef = useRef(null)

  // when the function is called, mousemove and mouseup events are attached to the document
  // to track mouse

  const onHandleDragMouseDown = (e) => {
    e.preventDefault()

    position.current.pos3 = e.clientX
    position.current.pos4 = e.clientY
    setMode('pressed')

    document.addEventListener('mousemove', onHandleMouseMove)
    document.addEventListener('mouseup', onHandleMouseUp)
  }

  // when the function is called, mouseup and mousemove events are removed from the document

  const onHandleMouseUp = () => {
    setMode('stopped')
    document.removeEventListener('mouseup', onHandleMouseUp)
    document.removeEventListener('mousemove', onHandleMouseMove)
  }

  // when the mouse moves, the function updates current element's position

  const onHandleMouseMove = (e) => {
    e.preventDefault()

    setMode('dragging')
    const newPos1 = position.current.pos3 - e.clientX
    const newPos2 = position.current.pos4 - e.clientY
    position.current = {
      pos1: newPos1,
      pos2: newPos2,
      pos3: e.clientX,
      pos4: e.clientY,
    }

    setTranslate({
      top: draggableElRef.current?.offsetTop - newPos2,
      left: draggableElRef.current?.offsetLeft - newPos1,
    })
  }

  // according to mode, the style of cursor is different
  const cursorStyle = useMemo(() => {
    if (mode === 'dragging') return 'grabbing'
    if (mode === 'pressed') return 'grab'
    return 'initial'
  }, [mode])

  const style = {
    position: 'fixed',
    top: `${translate.top}px`,
    left: `${translate.left}px`,
    cursor: cursorStyle,
  }

  return {
    style,
    ref: draggableElRef,
    onHandleDragMouseDown,
  }
}

export default useDrag
