import React, {useRef, useCallback, useEffect, useState} from 'react'
import styled, {css} from 'reshadow'

import EventEmitter from '../../utils/eventEmitter'
import useEventListener from '../../utils/useEventListener'
import Context from './context'

const styles = css`
  SContainer {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: start;
    width: 100%;
    height: 100%;
    padding: 5px;
  }
`
export default (props) => {
  const container = useRef(null);
  const [eventEmitter, updateEventEmitter] = useState(null);
  const [items, updateItems] = useState([]);
  const [offsets, updateOffsets] = useState([{x: 0, y: 0}]);
  const [state, setState] = useState({
    item: null,
    indexItem: null,
    active: false,
    current: {x: 0, y: 0},
    initial: {x: 0, y: 0},
  })

  function setItems(item) {
    updateItems((items) => ([...items, item]))
    updateOffsets((offsets) => ([...offsets, {x: 0, y: 0}]))
  }
  
  useEffect(() => {
    const eventEmitter = new EventEmitter()
    eventEmitter.subscribe('item', setItems)
    updateEventEmitter(eventEmitter)
  }, [])

  const dragStart = useCallback((e) => {
    const indexItem = items.indexOf(e.target)

    if (indexItem >= 0) {
      e.dataTransfer.setData('text/plain', items[indexItem].id);

      const offset = offsets[indexItem]
      const initialX = e.clientX - offset.x
      const initialY = e.clientY - offset.y
      setState({...state, initial: {x: initialX, y: initialY}, current: {x: initialX, y: initialY}})
      setState((state) => ({...state, active: true, item: e.target, indexItem}))
    }
  }, [offsets, items])

  const dragEnd = useCallback((e) => {
    const {current} = state
    setState({...state, initial: {x: current.x, y: current.y}, active: false})
  }, [state.current])

  const drag = useCallback((e) => {
    if (state.active) {
      e.preventDefault();
      const {initial} = state
      const currentX = e.clientX - initial.x;
      const currentY = e.clientY - initial.y;
      setState({...state,  current: {x: currentX, y: currentY}})
      updateOffsets((offsets) => {
        const newOffsets = offsets
        newOffsets[state.indexItem] = {x: currentX, y: currentY}
        return [...newOffsets]
      })
      setTranslate(currentX, currentY, state.item);
    }
  }, [state])

  function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate(" + xPos + "px, " + yPos + "px)";
  }

  const node = container.current

  useEventListener("dragstart", dragStart, node);
  useEventListener("dragend", dragEnd, node);
  useEventListener("drag", drag, node);

  const SContainer = 'div'
  return <Context.Provider value={{eventEmitter}}>
    {styled(styles)(<SContainer ref={container} {...props}/>)}
  </Context.Provider>
}