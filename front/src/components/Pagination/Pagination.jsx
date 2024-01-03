import styles from './Pagination.module.css'

export const Pagination = ({ activePage, countPerPage, arrayLength, setCurrentPage }) => {
    let pages = []

    for (let i = 1; i < Math.ceil(arrayLength / countPerPage) + 1; i++) {
        pages.push(i)
    }

    return (
        <div className={styles.clothesPages}>
            <button className={styles.prev} onClick={() => setCurrentPage(prev => prev > 1 ? --prev : prev)}>
                <img src="/src/assets/leftArrow.svg" alt="" />
                <span>Previous</span>
            </button>
            <div className={styles.pagesButtons}>
                {pages.map(pageIndex => <button className={activePage === pageIndex ? styles.active : ""} key={pageIndex} onClick={() => setCurrentPage(pageIndex)}>{pageIndex}</button>)}
            </div>
            <button className={styles.next} onClick={() => setCurrentPage(prev => prev >= pages.length ? prev : ++prev)}>
                <span>Next</span>
                <img src="/src/assets/rightArrow.svg" alt="" />
            </button>
        </div>)
}