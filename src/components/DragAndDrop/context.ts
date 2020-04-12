import React from 'react'
import EventEmitter from '../../utils/eventEmitter'

const eventEmitter = new EventEmitter()
const Context = React.createContext({eventEmitter})

export default Context