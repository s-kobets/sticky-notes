import React, {forwardRef, useContext, useState, useEffect, useCallback} from 'react'
import styled from 'reshadow'
import ContextApp from '../../context'
import styles from './index.css'

export default forwardRef(({width, height, background, ...props}, ref) => {
  const [textarea, updateTextarea] = useState(null)
  const {updateNotes} = useContext(ContextApp)
  let count = 0

  const handleResize = () => {
    const {offsetWidth, offsetHeight, id} = textarea 
      if (count > 0) {
        updateNotes(notes => {
        const newNotes = notes.map(note => {
          if (note.id === Number(id)) {
            note.height = offsetHeight
            note.width = offsetWidth
          }
          return note
        })
        return newNotes
      })
    }
    count += 1
  }

  const handleChange = (e) => {
    const {id, value} = e.currentTarget
    updateNotes(notes => {
      const newNotes = notes.map(note => {
        if (note.id === Number(id)) {
          note.content = value
        }
        return note
      })
      return newNotes
    })
  }

  const setRef = useCallback((node) => {
    ref(node)
    updateTextarea(node)
  }, [])

  useEffect(() => {
    let observer = null
    if (textarea && ResizeObserver) {
      observer = new ResizeObserver(handleResize)
      observer.observe(textarea);
    }
    return () => {
      observer && observer.disconnect();
    }
  }, [textarea])

  const SNote = 'textarea'
  return styled(styles)`
    SNote {
      background-color: ${background};
    }
  `(<SNote ref={setRef} onChange={handleChange} style={{width, height}} background={background} {...props} />)
})