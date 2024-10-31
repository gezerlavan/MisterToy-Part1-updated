import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
  setSort,
} from '../store/actions/toy.actions'
import { SET_FILTER_BY } from '../store/reducers/toy.reducer'

export function ToyIndex() {
  const toys = useSelector(storeState => storeState.toyModule.toys)
  const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
  const sortBy = useSelector(storeState => storeState.toyModule.sortBy)
  const maxPage = useSelector(storeState => storeState.toyModule.maxPage)
  const isLoading = useSelector(
    storeState => storeState.toyModule.flag.isLoading
  )

  const dispatch = useDispatch()

  useEffect(() => {
    loadToys().catch(err => {
      console.log('err:', err)
      showErrorMsg('Cannot load toys')
    })
  }, [filterBy, sortBy])

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

  function onSetSort(sortBy) {
    setSort(sortBy)
  }

  function onChangePageIdx(diff) {
    let newPageIdx = +filterBy.pageIdx + diff
    if (newPageIdx < 0) newPageIdx = maxPage - 1
    if (newPageIdx >= maxPage) newPageIdx = 0
    dispatch({ type: SET_FILTER_BY, filterBy: { pageIdx: newPageIdx } })
  }

  return (
    <section className="toy-index">
      <ToyFilter
        filterBy={filterBy}
        onSetFilter={onSetFilter}
        sortBy={sortBy}
        onSetSort={onSetSort}
      />
      <div style={{ marginBlockStart: '0.5em', textAlign: 'center' }}>
        <button style={{ marginInline: 0 }}>
          <Link to="/toy/edit">Add Toy</Link>
        </button>
      </div>
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
