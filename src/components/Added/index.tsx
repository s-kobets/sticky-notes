import React, {useContext} from 'react'
import styled from 'reshadow'

import api from '../../../api'
import ContextApp from '../../context'
import styles from './index.css'

export default (props) => {
  const {updateNotes, background} = useContext(ContextApp)
  const handleClick = async () => {
    const data = await api.add({background})
    updateNotes(data)
  }

  const Added = 'button';
  return styled(styles)(<Added {...props} children="Added note" onClick={handleClick}/>)
}