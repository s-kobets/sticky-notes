export default (props, fn) => {
  return (...args) => {
    fn(...args)
    const cb = props[fn.name.replace(/handle/, 'on')]
    cb && cb(...args)
  }
}