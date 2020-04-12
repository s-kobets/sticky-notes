import React, {useContext} from 'react'
import styled, {css} from 'reshadow'
import ContextApp from '../../context'
import fireFn from '../../utils/fireFn'
import styles from './index.css'


export default (props) => {
  const {background, updateBackground} = useContext(ContextApp)

  
  const handleChange = (e) => {
    updateBackground(e.currentTarget.value)
  }

  const SSelect = 'select'
  return styled(styles)(
    <SSelect {...props} defaultValue={background} onChange={fireFn(props, handleChange)}>
      {['red', 'orange', 'yellow', 'green', 'steelblue', 'purple'].map(color => <option key={color} children={color}/>)}
    </SSelect>)
}