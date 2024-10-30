import { useState } from 'react'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'

export function ToySort({ sortBy, onSetSort }) {
  const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })

  useEffectUpdate(() => {
    onSetSort(sortByToEdit)
  }, [sortByToEdit])

  function handleChange({ target }) {
    const field = target.name
    const value = target.type === 'number' ? +target.value : target.value
    setSortByToEdit(prevSort => ({
      ...prevSort,
      [field]: field === 'sortDir' ? -prevSort.sortDir : value,
    }))
  }

  return (
    <form className="toy-sort">
      <select name="type" value={sortByToEdit.type} onChange={handleChange}>
        <option value="">Sort by</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="createdAt">Date</option>
      </select>
      <label>
        <input
          type="checkbox"
          name="sortDir"
          checked={sortByToEdit.sortDir < 0}
          onChange={handleChange}
        />
        Descending
      </label>
    </form>
  )
}
