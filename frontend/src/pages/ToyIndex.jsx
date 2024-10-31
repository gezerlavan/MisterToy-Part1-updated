import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Loader } from '../cmps/Loader'
import { PaginationButtons } from '../cmps/PaginationButtons'
import { ToyFilter } from '../cmps/ToyFilter'
import { ToyList } from '../cmps/ToyList'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import {
  loadToys,
  removeToy,
  removeToyOptimistic,
  setFilter,
} from '../store/actions/toy.actions'

export function ToyIndex() {
  const toys = useSelector(storeState => storeState.toyModule.toys)
  const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
  const maxPage = useSelector(storeState => storeState.toyModule.maxPage)
  const isLoading = useSelector(
    storeState => storeState.toyModule.flag.isLoading
  )

  useEffect(() => {
    loadToys().catch(err => {
      console.log('err:', err)
      showErrorMsg('Cannot load toys')
    })
  }, [filterBy])

  function onRemoveToy(toyId) {
    // removeToy(toyId)
    removeToyOptimistic(toyId)
      .then(() => {
        loadToys()
        showSuccessMsg('Toy removed')
      })
      .catch(err => {
        console.log('Cannot remove toy', err)
        showErrorMsg('Cannot remove toy')
      })
  }

  function onSetFilter(filterBy) {
    setFilter(filterBy)
  }

  function onChangePageIdx(diff) {
    let newPageIdx = +filterBy.pageIdx + diff
    if (newPageIdx < 0) newPageIdx = maxPage - 1
    if (newPageIdx >= maxPage) newPageIdx = 0
    onSetFilter({ pageIdx: newPageIdx })
  }

  return (
    <section className="toy-index">
      <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <button style={{ alignSelf: 'center' }}>
        <Link to="/toy/edit">Add Toy</Link>
      </button>
      {isLoading && <Loader />}
      {!isLoading && <ToyList toys={toys} onRemoveToy={onRemoveToy} />}
      {!!toys.length && maxPage > 1 && (
        <PaginationButtons
          pageIdx={filterBy.pageIdx}
          onChangePageIdx={onChangePageIdx}
        />
      )}
    </section>
  )
}
