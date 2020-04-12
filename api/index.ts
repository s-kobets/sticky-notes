import Storage from '../src/utils/localStorage'

const stor = new Storage('notes');

const api = {
  get: async () => {
    const notes = stor.get('notes') || []
    return Promise.resolve(notes)
  },
  add: async (props) => {
    let notes = await api.get()
    const {length} = notes
    const newId = length ? notes[length - 1]['id'] + 1 : 0;
    notes = [...notes, {id: newId, content: '', ...props}]
    stor.update(notes)
    return Promise.resolve(notes)
  },
  delete: async (note) => {
    let notes = await api.get()
    const {id} = note
    notes = notes.filter(note => (note.id !== Number(id)))
    stor.update(notes)
    return Promise.resolve(notes)
  },
  update: async (notes) => {
    stor.update(notes)
  }
}

export default api