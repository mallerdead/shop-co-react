import styles from './Pagination.module.css'

export const Pagination = ({ activePage, countPerPage, arrayLength, setCurrentPage }) => {
  let pages = []

  for (let i = 1; i < Math.ceil(arrayLength / countPerPage) + 1; i++) {
    pages.push(i)
  }

  return pages.length === 1 ? (
    ''
  ) : (
    <div className={styles.clothesPages}>
      <button
        className={`${styles.prev} ${activePage === 1 ? styles.disabled : ''}`}
        onClick={() => setCurrentPage((prev) => (prev > 1 ? --prev : prev))}
      >
        <img src='/src/assets/leftArrow.svg' alt='' />
        <span>Previous</span>
      </button>
      <div className={styles.pagesButtons}>
        {pages.map((pageIndex) => (
          <button
            className={`${styles.pagesButton} ${activePage === pageIndex ? styles.active : ''}`}
            key={pageIndex}
            onClick={() => {
              if (activePage !== pageIndex) {
                setCurrentPage(pageIndex)
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              }
            }}
          >
            {pageIndex}
          </button>
        ))}
      </div>
      <button
        className={`${styles.next} ${activePage === pages.length ? styles.disabled : ''}`}
        onClick={() => setCurrentPage((prev) => (prev >= pages.length ? prev : ++prev))}
      >
        <span>Next</span>
        <img src='/src/assets/rightArrow.svg' alt='' />
      </button>
    </div>
  )
}
