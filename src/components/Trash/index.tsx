import React, {useContext} from 'react'
import styled from 'reshadow'
import ContextApp from '../../context'
import api from '../../../api'
import styles from './index.css'

export default (props) => {
  const {updateNotes} = useContext(ContextApp)
  const handleDrop = async (e) => {
    const id = Number(e.dataTransfer.getData('text'))
    const data = await api.delete({id})
    updateNotes(data)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const Trash = 'div';
  return styled(styles)(<Trash onDrop={handleDrop} onDragOver={handleDragOver} children='Remove note' {...props}/>)
}

