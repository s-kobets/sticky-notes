import React,{useContext, useCallback} from 'react'
import Context from './context'

export default ({children, tag: Tag = 'div', ...props}) => {
  const {eventEmitter} = useContext(Context)
  const ref = useCallback((node) => {
    eventEmitter && eventEmitter.emit('item', node)
  }, [eventEmitter])

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <Tag ref={ref} draggable onDragOver={handleDragOver} {...props}>
      {children}
      </Tag>
  )
}