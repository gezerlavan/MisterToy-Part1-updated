export function PaginationButtons({ pageIdx, onChangePageIdx }) {
  return (
    <div className="pagination">
      <button className="btn" onClick={() => onChangePageIdx(-1)} disabled={pageIdx === 0}>
        Previous
      </button>
      {pageIdx + 1}
      <button className="btn" onClick={() => onChangePageIdx(1)}>Next</button>
    </div>
  )
}
