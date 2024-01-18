import { useEffect, useRef, useState } from 'react'
import styles from './CartItem.module.css'

export const CartItem = ({ product, productCount, deleteHandler, changeQuantity }) => {
  const [inputCount, setInputCount] = useState(productCount)

  useEffect(() => {
    setInputCount(productCount)
  }, [productCount])

  return (
    <div className={styles.item}>
      <div className={styles.clothPreview}>
        <img src={`https://192.168.1.37:7001/clothes/image/${product.imageURL}`} alt='' />
      </div>
      <div className={styles.description}>
        <button className={styles.deleteButton} onClick={deleteHandler}>
          <svg xmlns='http://www.w3.org/2000/svg' width='18' height='20' viewBox='0 0 18 20' fill='#FF3333'>
            <path d='M17.25 3.50006H13.5V2.75006C13.5 2.15332 13.2629 1.58103 12.841 1.15907C12.419 0.737114 11.8467 0.500061 11.25 0.500061H6.75C6.15326 0.500061 5.58097 0.737114 5.15901 1.15907C4.73705 1.58103 4.5 2.15332 4.5 2.75006V3.50006H0.75C0.551088 3.50006 0.360322 3.57908 0.21967 3.71973C0.0790178 3.86038 0 4.05115 0 4.25006C0 4.44897 0.0790178 4.63974 0.21967 4.78039C0.360322 4.92104 0.551088 5.00006 0.75 5.00006H1.5V18.5001C1.5 18.8979 1.65804 19.2794 1.93934 19.5607C2.22064 19.842 2.60218 20.0001 3 20.0001H15C15.3978 20.0001 15.7794 19.842 16.0607 19.5607C16.342 19.2794 16.5 18.8979 16.5 18.5001V5.00006H17.25C17.4489 5.00006 17.6397 4.92104 17.7803 4.78039C17.921 4.63974 18 4.44897 18 4.25006C18 4.05115 17.921 3.86038 17.7803 3.71973C17.6397 3.57908 17.4489 3.50006 17.25 3.50006ZM7.5 14.7501C7.5 14.949 7.42098 15.1397 7.28033 15.2804C7.13968 15.421 6.94891 15.5001 6.75 15.5001C6.55109 15.5001 6.36032 15.421 6.21967 15.2804C6.07902 15.1397 6 14.949 6 14.7501V8.75006C6 8.55115 6.07902 8.36038 6.21967 8.21973C6.36032 8.07908 6.55109 8.00006 6.75 8.00006C6.94891 8.00006 7.13968 8.07908 7.28033 8.21973C7.42098 8.36038 7.5 8.55115 7.5 8.75006V14.7501ZM12 14.7501C12 14.949 11.921 15.1397 11.7803 15.2804C11.6397 15.421 11.4489 15.5001 11.25 15.5001C11.0511 15.5001 10.8603 15.421 10.7197 15.2804C10.579 15.1397 10.5 14.949 10.5 14.7501V8.75006C10.5 8.55115 10.579 8.36038 10.7197 8.21973C10.8603 8.07908 11.0511 8.00006 11.25 8.00006C11.4489 8.00006 11.6397 8.07908 11.7803 8.21973C11.921 8.36038 12 8.55115 12 8.75006V14.7501ZM12 3.50006H6V2.75006C6 2.55115 6.07902 2.36038 6.21967 2.21973C6.36032 2.07908 6.55109 2.00006 6.75 2.00006H11.25C11.4489 2.00006 11.6397 2.07908 11.7803 2.21973C11.921 2.36038 12 2.55115 12 2.75006V3.50006Z' />
          </svg>
        </button>
        <div className={styles.wrapper}>
          <div className={styles.name}>
            <a href={`cloth?id=${product.clothId}`}>{product.name}</a>
          </div>
          <div className={styles.size}>
            Size: <span>{product.size.name}</span>
          </div>
          <div className={styles.color}>
            Color: <span>{product.color.name}</span>
          </div>
        </div>
        <div className={styles.total}>
          <div className={styles.price}>${product.price}</div>
          <div className={styles.count}>
            <button
              className={styles.decrement}
              onClick={() => {
                changeQuantity(product.id, inputCount - 1)
              }}
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17' fill='black'>
                <path d='M14.75 8.5C14.75 8.69891 14.671 8.88968 14.5303 9.03033C14.3897 9.17098 14.1989 9.25 14 9.25H3C2.80109 9.25 2.61032 9.17098 2.46967 9.03033C2.32902 8.88968 2.25 8.69891 2.25 8.5C2.25 8.30109 2.32902 8.11032 2.46967 7.96967C2.61032 7.82902 2.80109 7.75 3 7.75H14C14.1989 7.75 14.3897 7.82902 14.5303 7.96967C14.671 8.11032 14.75 8.30109 14.75 8.5Z' />
              </svg>
            </button>
            <input
              type='text'
              value={inputCount}
              onChange={(e) => setInputCount(e.target.value)}
              onBlur={() => {
                let onlyNumbers = +inputCount.toString().replace(/[^0-9]/g, '')
                setInputCount(onlyNumbers)
                changeQuantity(product.id, onlyNumbers)
              }}
            />
            <button
              className={styles.increment}
              onClick={() => {
                changeQuantity(product.id, inputCount + 1)
              }}
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='13' height='13' viewBox='0 0 13 13' fill='black'>
                <path d='M12.75 6.5C12.75 6.69891 12.671 6.88968 12.5303 7.03033C12.3897 7.17098 12.1989 7.25 12 7.25H7.25V12C7.25 12.1989 7.17098 12.3897 7.03033 12.5303C6.88968 12.671 6.69891 12.75 6.5 12.75C6.30109 12.75 6.11032 12.671 5.96967 12.5303C5.82902 12.3897 5.75 12.1989 5.75 12V7.25H1C0.801088 7.25 0.610322 7.17098 0.46967 7.03033C0.329018 6.88968 0.25 6.69891 0.25 6.5C0.25 6.30109 0.329018 6.11032 0.46967 5.96967C0.610322 5.82902 0.801088 5.75 1 5.75H5.75V1C5.75 0.801088 5.82902 0.610322 5.96967 0.46967C6.11032 0.329018 6.30109 0.25 6.5 0.25C6.69891 0.25 6.88968 0.329018 7.03033 0.46967C7.17098 0.610322 7.25 0.801088 7.25 1V5.75H12C12.1989 5.75 12.3897 5.82902 12.5303 5.96967C12.671 6.11032 12.75 6.30109 12.75 6.5Z' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
