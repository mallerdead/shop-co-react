import styles from './Shop.module.css'
import { useEffect, useState } from 'react'
import { ClothItem, PriceSlider, Color, Size, FilterItem, ShowHideButton, Pagination, LoadingSpinner } from '..'
import { getClothes } from '/src/api/api'

export const Shop = () => {
  const [filterMenu, setFilterMenu] = useState(false)
  const [allClothes, setAllClothes] = useState([])
  const [clothes, setClothes] = useState([])
  const [rangePrice, setRangePrice] = useState([0, 100])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [clothesPerPage] = useState(9)
  const [filterColors, setFilterColors] = useState([])
  const [filterSizes, setFilterSizes] = useState([])
  const [showFilters, setShowFilters] = useState([
    { id: 1, title: 'Price', isShowing: false },
    { id: 2, title: 'Colors', isShowing: false },
    { id: 3, title: 'Size', isShowing: false },
    { id: 4, title: 'Dress Style', isShowing: false },
  ])

  const findUnique = (option) => {
    return option.reduce(
      (res, cur) => (res.find((find) => JSON.stringify(find) === JSON.stringify(cur)) ? res : [...res, cur]),
      [],
    )
  }

  const setColorById = (id) =>
    setFilterColors((prev) =>
      prev.map((filterColor) =>
        filterColor.id === id ? { ...filterColor, isActive: !filterColor.isActive } : filterColor,
      ),
    )

  const setSizeById = (id) =>
    setFilterSizes((prev) =>
      prev.map((filterSize) => (filterSize.id === id ? { ...filterSize, isActive: !filterSize.isActive } : filterSize)),
    )

  const setShowingFilter = (id) =>
    setShowFilters((prev) =>
      prev.map((filter) => (filter.id === id ? { ...filter, isShowing: !filter.isShowing } : filter)),
    )

  const applyFilters = () => {
    setFilterMenu(false)
    const result = []
    const filterSizesActive = filterSizes
      .filter((filterSize) => filterSize.isActive)
      .map((filterSize) => filterSize.size)
    const filterColorsActive = filterColors
      .filter((filterColor) => filterColor.isActive)
      .map((filterColor) => filterColor.color)
    if (filterSizesActive.length) {
      allClothes.forEach((cloth) => {
        let flag = false
        for (let i = 0; i < cloth.sizes.length; i++) {
          for (let j = 0; j < filterSizesActive.length; j++) {
            if (filterSizesActive[j] === cloth.sizes[i].size) {
              result.push(cloth)
              flag = true
              break
            }
          }
          if (flag) {
            break
          }
        }
      })
    }
    if (filterColorsActive.length) {
      allClothes.forEach((cloth) => {
        if (filterColorsActive.includes(cloth.color.colorName)) {
          result.push(cloth)
        }
      })
    }
    allClothes.forEach((cloth) => {
      if (cloth.price >= rangePrice[0] && cloth.price <= rangePrice[1]) {
        result.push(cloth)
      }
    })

    if (result.length) {
      setClothes(findUnique(result))
    } else {
      setClothes(allClothes)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    getClothes()
      .then((data) => {
        const dataColors = []
        const dataSizes = []

        data.forEach((cloth) => cloth.colors.forEach((color) => dataColors.push({ ...color, isActive: false })))
        data.forEach((cloth) => cloth.sizes.forEach((size) => dataSizes.push({ ...size, isActive: false })))

        setAllClothes(data)
        setClothes(data)

        setFilterColors(findUnique(dataColors))
        setRangePrice([
          Math.min.apply(
            null,
            data.map((cloth) => cloth.price),
          ),
          Math.max.apply(
            null,
            data.map((cloth) => cloth.price),
          ),
        ])
        setFilterSizes(findUnique(dataSizes))
        setShowFilters((prev) => prev.map((filter) => ({ ...filter, isShowing: true })))
        setIsLoading(false)
      })
      .catch((err) => console.error(err.message))
  }, [])

  return (
    <div className='container'>
      <div className={styles.shop}>
        <div className={`${styles.modal} ${filterMenu ? styles.active : ''}`}>
          <div className={`${styles.filters} ${filterMenu ? styles.active : ''}`}>
            <div className={styles.title}>
              <h4>Filters</h4>
              {filterMenu ? (
                <button
                  className={styles.closeModal}
                  onClick={() => {
                    setFilterMenu(false)
                    document.body.style.overflow = 'auto'
                  }}
                >
                  <svg width='16' height='17' viewBox='0 0 16 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M15.5459 14.4541C15.7572 14.6654 15.876 14.952 15.876 15.2509C15.876 15.5498 15.7572 15.8365 15.5459 16.0478C15.3346 16.2592 15.0479 16.3779 14.749 16.3779C14.4501 16.3779 14.1635 16.2592 13.9521 16.0478L7.99996 10.0937L2.0459 16.0459C1.83455 16.2573 1.54791 16.376 1.24902 16.376C0.950136 16.376 0.663491 16.2573 0.452147 16.0459C0.240802 15.8346 0.12207 15.5479 0.12207 15.2491C0.12207 14.9502 0.240803 14.6635 0.452147 14.4522L6.40621 8.5L0.454022 2.54593C0.242677 2.33459 0.123945 2.04795 0.123945 1.74906C0.123945 1.45017 0.242677 1.16353 0.454022 0.952184C0.665366 0.74084 0.95201 0.622107 1.2509 0.622107C1.54978 0.622107 1.83643 0.74084 2.04777 0.952184L7.99996 6.90625L13.954 0.951246C14.1654 0.739902 14.452 0.62117 14.7509 0.62117C15.0498 0.62117 15.3364 0.739902 15.5478 0.951246C15.7591 1.16259 15.8778 1.44924 15.8778 1.74812C15.8778 2.04701 15.7591 2.33365 15.5478 2.545L9.59371 8.5L15.5459 14.4541Z'
                      fill='black'
                      fill-opacity='0.4'
                    />
                  </svg>
                </button>
              ) : (
                <svg width='24' height='25' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M13.125 12.125V20.75C13.125 21.0484 13.0065 21.3345 12.7955 21.5455C12.5845 21.7565 12.2984 21.875 12 21.875C11.7016 21.875 11.4155 21.7565 11.2045 21.5455C10.9935 21.3345 10.875 21.0484 10.875 20.75V12.125C10.875 11.8266 10.9935 11.5405 11.2045 11.3295C11.4155 11.1185 11.7016 11 12 11C12.2984 11 12.5845 11.1185 12.7955 11.3295C13.0065 11.5405 13.125 11.8266 13.125 12.125ZM18.75 18.5C18.4516 18.5 18.1655 18.6185 17.9545 18.8295C17.7435 19.0405 17.625 19.3266 17.625 19.625V20.75C17.625 21.0484 17.7435 21.3345 17.9545 21.5455C18.1655 21.7565 18.4516 21.875 18.75 21.875C19.0484 21.875 19.3345 21.7565 19.5455 21.5455C19.7565 21.3345 19.875 21.0484 19.875 20.75V19.625C19.875 19.3266 19.7565 19.0405 19.5455 18.8295C19.3345 18.6185 19.0484 18.5 18.75 18.5ZM21 14.75H19.875V4.25C19.875 3.95163 19.7565 3.66548 19.5455 3.4545C19.3345 3.24353 19.0484 3.125 18.75 3.125C18.4516 3.125 18.1655 3.24353 17.9545 3.4545C17.7435 3.66548 17.625 3.95163 17.625 4.25V14.75H16.5C16.2016 14.75 15.9155 14.8685 15.7045 15.0795C15.4935 15.2905 15.375 15.5766 15.375 15.875C15.375 16.1734 15.4935 16.4595 15.7045 16.6705C15.9155 16.8815 16.2016 17 16.5 17H21C21.2984 17 21.5845 16.8815 21.7955 16.6705C22.0065 16.4595 22.125 16.1734 22.125 15.875C22.125 15.5766 22.0065 15.2905 21.7955 15.0795C21.5845 14.8685 21.2984 14.75 21 14.75ZM5.25 15.5C4.95163 15.5 4.66548 15.6185 4.4545 15.8295C4.24353 16.0405 4.125 16.3266 4.125 16.625V20.75C4.125 21.0484 4.24353 21.3345 4.4545 21.5455C4.66548 21.7565 4.95163 21.875 5.25 21.875C5.54837 21.875 5.83452 21.7565 6.0455 21.5455C6.25647 21.3345 6.375 21.0484 6.375 20.75V16.625C6.375 16.3266 6.25647 16.0405 6.0455 15.8295C5.83452 15.6185 5.54837 15.5 5.25 15.5ZM7.5 11.75H6.375V4.25C6.375 3.95163 6.25647 3.66548 6.0455 3.4545C5.83452 3.24353 5.54837 3.125 5.25 3.125C4.95163 3.125 4.66548 3.24353 4.4545 3.4545C4.24353 3.66548 4.125 3.95163 4.125 4.25V11.75H3C2.70163 11.75 2.41548 11.8685 2.2045 12.0795C1.99353 12.2905 1.875 12.5766 1.875 12.875C1.875 13.1734 1.99353 13.4595 2.2045 13.6705C2.41548 13.8815 2.70163 14 3 14H7.5C7.79837 14 8.08452 13.8815 8.2955 13.6705C8.50647 13.4595 8.625 13.1734 8.625 12.875C8.625 12.5766 8.50647 12.2905 8.2955 12.0795C8.08452 11.8685 7.79837 11.75 7.5 11.75ZM14.25 7.25H13.125V4.25C13.125 3.95163 13.0065 3.66548 12.7955 3.4545C12.5845 3.24353 12.2984 3.125 12 3.125C11.7016 3.125 11.4155 3.24353 11.2045 3.4545C10.9935 3.66548 10.875 3.95163 10.875 4.25V7.25H9.75C9.45163 7.25 9.16548 7.36853 8.9545 7.5795C8.74353 7.79048 8.625 8.07663 8.625 8.375C8.625 8.67337 8.74353 8.95952 8.9545 9.1705C9.16548 9.38147 9.45163 9.5 9.75 9.5H14.25C14.5484 9.5 14.8345 9.38147 15.0455 9.1705C15.2565 8.95952 15.375 8.67337 15.375 8.375C15.375 8.07663 15.2565 7.79048 15.0455 7.5795C14.8345 7.36853 14.5484 7.25 14.25 7.25Z'
                    fill='black'
                    fillOpacity='0.4'
                  />
                </svg>
              )}
            </div>
            <span className={styles.delimiter}></span>
            <div className={styles.clothesTypes}>
              <button className={styles.clothesType}>T-shirts</button>
              <button className={styles.clothesType}>Shorts</button>
              <button className={styles.clothesType}>Shirts</button>
              <button className={styles.clothesType}>Hoodie</button>
              <button className={styles.clothesType}>Jeans</button>
            </div>
            <span className={styles.delimiter}></span>
            {
              <FilterItem
                title={showFilters[0].title}
                isShowing={showFilters[0].isShowing}
                onClickHandler={() => setShowingFilter(showFilters[0].id)}
                content={
                  isLoading ? (
                    ''
                  ) : (
                    <PriceSlider
                      min={Math.min.apply(
                        null,
                        allClothes.map((cloth) => cloth.price),
                      )}
                      max={Math.max.apply(
                        null,
                        allClothes.map((cloth) => cloth.price),
                      )}
                      handleSliderChange={setRangePrice}
                    />
                  )
                }
              />
            }
            <span className={styles.delimiter}></span>
            {
              <FilterItem
                title={showFilters[1].title}
                isShowing={showFilters[1].isShowing}
                onClickHandler={() => setShowingFilter(showFilters[1].id)}
                content={filterColors.map((filterColor) => (
                  <Color
                    key={filterColor.id}
                    color={filterColor.name}
                    isActive={filterColor.isActive}
                    toggleActive={() => setColorById(filterColor.id)}
                  />
                ))}
              />
            }
            <span className={styles.delimiter}></span>
            {
              <FilterItem
                title={showFilters[2].title}
                isShowing={showFilters[2].isShowing}
                onClickHandler={() => setShowingFilter(showFilters[2].id)}
                content={
                  isLoading
                    ? ''
                    : filterSizes.map((filterSize) => (
                        <Size
                          key={filterSize.id}
                          size={filterSize.name}
                          isActive={filterSize.isActive}
                          toggleActive={() => setSizeById(filterSize.id)}
                        />
                      ))
                }
              />
            }
            <span className={styles.delimiter}></span>
            {
              <FilterItem
                title={showFilters[3].title}
                isShowing={showFilters[3].isShowing}
                onClickHandler={() => setShowingFilter(showFilters[3].id)}
                content={
                  <div className={styles.styles}>
                    <button>Casual</button>
                    <button>Formal</button>
                    <button>Party</button>
                    <button>Gym</button>
                  </div>
                }
              />
            }
            <button className={styles.applyFilter} onClick={applyFilters}>
              Apply Filter
            </button>
          </div>
        </div>
        <div className={styles.clothesWrapper}>
          <div className={styles.clothesTitle}>
            <h4>Casual</h4>
            {isLoading ? (
              ''
            ) : (
              <div className={styles.sortClothes}>
                <span className={styles.sort}>
                  Showing {(currentPage - 1) * clothesPerPage} -{' '}
                  {clothesPerPage * currentPage > clothes.length ? clothes.length : clothesPerPage * currentPage} of{' '}
                  {clothes.length} Products
                </span>
                <div className={styles.sortButton}>
                  <span>Sort by:</span>
                  <button>Most Popular</button>
                  <ShowHideButton />
                </div>
                <button
                  className={styles.filterMenuButton}
                  onClick={() => {
                    setFilterMenu(true)
                    document.body.style.overflow = 'hidden'
                  }}
                >
                  <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'>
                    <path
                      d='M7.75 6.75V12.5C7.75 12.6989 7.67098 12.8897 7.53033 13.0303C7.38968 13.171 7.19891 13.25 7 13.25C6.80109 13.25 6.61032 13.171 6.46967 13.0303C6.32902 12.8897 6.25 12.6989 6.25 12.5V6.75C6.25 6.55109 6.32902 6.36032 6.46967 6.21967C6.61032 6.07902 6.80109 6 7 6C7.19891 6 7.38968 6.07902 7.53033 6.21967C7.67098 6.36032 7.75 6.55109 7.75 6.75ZM11.5 11C11.3011 11 11.1103 11.079 10.9697 11.2197C10.829 11.3603 10.75 11.5511 10.75 11.75V12.5C10.75 12.6989 10.829 12.8897 10.9697 13.0303C11.1103 13.171 11.3011 13.25 11.5 13.25C11.6989 13.25 11.8897 13.171 12.0303 13.0303C12.171 12.8897 12.25 12.6989 12.25 12.5V11.75C12.25 11.5511 12.171 11.3603 12.0303 11.2197C11.8897 11.079 11.6989 11 11.5 11ZM13 8.5H12.25V1.5C12.25 1.30109 12.171 1.11032 12.0303 0.96967C11.8897 0.829018 11.6989 0.75 11.5 0.75C11.3011 0.75 11.1103 0.829018 10.9697 0.96967C10.829 1.11032 10.75 1.30109 10.75 1.5V8.5H10C9.80109 8.5 9.61032 8.57902 9.46967 8.71967C9.32902 8.86032 9.25 9.05109 9.25 9.25C9.25 9.44891 9.32902 9.63968 9.46967 9.78033C9.61032 9.92098 9.80109 10 10 10H13C13.1989 10 13.3897 9.92098 13.5303 9.78033C13.671 9.63968 13.75 9.44891 13.75 9.25C13.75 9.05109 13.671 8.86032 13.5303 8.71967C13.3897 8.57902 13.1989 8.5 13 8.5ZM2.5 9C2.30109 9 2.11032 9.07902 1.96967 9.21967C1.82902 9.36032 1.75 9.55109 1.75 9.75V12.5C1.75 12.6989 1.82902 12.8897 1.96967 13.0303C2.11032 13.171 2.30109 13.25 2.5 13.25C2.69891 13.25 2.88968 13.171 3.03033 13.0303C3.17098 12.8897 3.25 12.6989 3.25 12.5V9.75C3.25 9.55109 3.17098 9.36032 3.03033 9.21967C2.88968 9.07902 2.69891 9 2.5 9ZM4 6.5H3.25V1.5C3.25 1.30109 3.17098 1.11032 3.03033 0.96967C2.88968 0.829018 2.69891 0.75 2.5 0.75C2.30109 0.75 2.11032 0.829018 1.96967 0.96967C1.82902 1.11032 1.75 1.30109 1.75 1.5V6.5H1C0.801088 6.5 0.610322 6.57902 0.46967 6.71967C0.329018 6.86032 0.25 7.05109 0.25 7.25C0.25 7.44891 0.329018 7.63968 0.46967 7.78033C0.610322 7.92098 0.801088 8 1 8H4C4.19891 8 4.38968 7.92098 4.53033 7.78033C4.67098 7.63968 4.75 7.44891 4.75 7.25C4.75 7.05109 4.67098 6.86032 4.53033 6.71967C4.38968 6.57902 4.19891 6.5 4 6.5ZM8.5 3.5H7.75V1.5C7.75 1.30109 7.67098 1.11032 7.53033 0.96967C7.38968 0.829018 7.19891 0.75 7 0.75C6.80109 0.75 6.61032 0.829018 6.46967 0.96967C6.32902 1.11032 6.25 1.30109 6.25 1.5V3.5H5.5C5.30109 3.5 5.11032 3.57902 4.96967 3.71967C4.82902 3.86032 4.75 4.05109 4.75 4.25C4.75 4.44891 4.82902 4.63968 4.96967 4.78033C5.11032 4.92098 5.30109 5 5.5 5H8.5C8.69891 5 8.88968 4.92098 9.03033 4.78033C9.17098 4.63968 9.25 4.44891 9.25 4.25C9.25 4.05109 9.17098 3.86032 9.03033 3.71967C8.88968 3.57902 8.69891 3.5 8.5 3.5Z'
                      fill='black'
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className={styles.clothes}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              clothes
                .slice((currentPage - 1) * clothesPerPage, clothesPerPage * currentPage)
                .map((cloth) => <ClothItem key={cloth.id} cloth={cloth} />)
            )}
          </div>
          {isLoading ? (
            ''
          ) : (
            <Pagination
              activePage={currentPage}
              countPerPage={clothesPerPage}
              arrayLength={clothes.length}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  )
}
