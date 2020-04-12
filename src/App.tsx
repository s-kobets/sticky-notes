import React, {useState, useEffect} from 'react'
import styled, {css} from 'reshadow'

import api from '../api'
import Context from './context'
import Note from './components/Note'
import Trash from './components/Trash'
import Container, {Item} from './components/DragAndDrop'
import Added from './components/Added'
import Background from './components/Background'

export default () => {
  const [notes, updateNotes] = useState([])
  const [background, updateBackground] = useState('steelblue')

  useEffect(() => {
    async function fetchData() {
      const data = await api.get()
      updateNotes(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    api.update(notes)
  }, [notes])

  return styled(css``)(
    <Context.Provider value={{updateNotes, background, updateBackground}}>
      <Container>
          {notes.map(note => (
            <Item key={note.id} tag={Note} defaultValue={note.content} {...note}/>
          ))}
          <Background/>
          <Added/>
          <Trash/>
      </Container>
    </Context.Provider>
  )
}