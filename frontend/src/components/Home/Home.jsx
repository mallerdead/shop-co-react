import { useEffect, useState } from 'react'
import { getTopSelling, getNewArrivals } from '../../api/clothes'
import { ClothItem, Comment, LoadingSpinner } from '..'
import styles from './Home.module.css'

export const Home = () => {
  const [loadingTopSelling, setLoadingTopSelling] = useState(true)
  const [newArrivalsLoading, setNewArrivalsLoading] = useState(true)
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Sarah M.',
      text: `I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.`,
      rating: 5,
    },
    {
      id: 2,
      name: 'Sarah M.',
      text: `I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.`,
      rating: 5,
    },
    {
      id: 3,
      name: 'Sarah M.',
      text: `I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.`,
      rating: 5,
    },
  ])

  const [newArrivals, setNewArrivals] = useState()
  const [topSelling, setTopSelling] = useState()

  useEffect(() => {
    setNewArrivalsLoading(true)
    getNewArrivals().then((response) => {
      setNewArrivals(response.data)
      setNewArrivalsLoading(false)
    })

    setLoadingTopSelling(true)
    getTopSelling().then((response) => {
      setTopSelling(response.data)
      setLoadingTopSelling(false)
    })
  }, [])

  return (
    <div className={styles.home}>
      <div className={`container ${styles.landing}`}>
        <div className={styles.landingWrapper}>
          <div className={styles.title}>FIND CLOTHES THAT MATCHES YOUR STYLE</div>
          <div className={styles.text}>
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality
            and cater to your sense of style.
          </div>
          <a href='/shop' className={styles.shopNowButton}>
            Shop Now
          </a>
          <div className={styles.achievements}>
            <div className={styles.achievement}>
              <div className={styles.value}>200+</div>
              <div className={styles.text}>International Brands</div>
            </div>
            <span className={styles.columnDelimeter}></span>
            <div className={styles.achievement}>
              <div className={styles.value}>2,000+</div>
              <div className={styles.text}>High-Quality Products</div>
            </div>
            <span className={styles.columnDelimeter}></span>
            <div className={styles.achievement}>
              <div className={styles.value}>30,000+</div>
              <div className={styles.text}>Happy Customers</div>
            </div>
          </div>
        </div>
        <img src='/src/assets/landingBG.png' alt='Landing image' />
      </div>
      <div className={`container ${styles.brands}`}>
        <img className={styles.brand} src='/src/assets/versage.svg' alt='' />
        <img className={styles.brand} src='/src/assets/zara.svg' alt='' />
        <img className={styles.brand} src='/src/assets/gucci.svg' alt='' />
        <img className={styles.brand} src='/src/assets/prada.svg' alt='' />
        <img className={styles.brand} src='/src/assets/ck.svg' alt='' />
      </div>
      <div className={`container ${styles.offers}`}>
        <div className={styles.arrivals}>
          <div className={styles.arrivalsTitle}>New Arrivals</div>
          <div className={styles.clothes}>
            {newArrivalsLoading ? (
              <LoadingSpinner />
            ) : (
              newArrivals.map((cloth) => <ClothItem key={cloth.id} cloth={cloth} />)
            )}
          </div>
          <a href='/shop' className={styles.viewAllButton}>
            View All
          </a>
        </div>
        <div className={styles.rowDelimiter}></div>
        <div className={styles.topSelling}>
          <div className={styles.sellingTitle}>Top Selling</div>
          <div className={styles.clothes}>
            {loadingTopSelling ? (
              <LoadingSpinner />
            ) : (
              topSelling.map((cloth) => <ClothItem key={cloth.id} cloth={cloth} />)
            )}
          </div>
          <a href='/shop' className={styles.viewAllButton}>
            View All
          </a>
        </div>
        <div className={styles.choiceStyle}>
          <div className={styles.title}>BROWSE BY dress STYLE</div>
          <div className={styles.stylesWrapper}>
            <div className={`${styles.card} ${styles.casual}`}>
              <span>Casual</span>
              <img src='/src/assets/casual.png' alt='' />
            </div>
            <div className={`${styles.card} ${styles.formal}`}>
              <span>Formal</span>
              <img src='/src/assets/formal.png' alt='' />
            </div>
            <div className={`${styles.card} ${styles.party}`}>
              <span>Party</span>
              <img src='/src/assets/party.png' alt='' />
            </div>
            <div className={`${styles.card} ${styles.gym}`}>
              <span>Gym</span>
              <img src='/src/assets/gym.png' alt='' />
            </div>
          </div>
        </div>
        <div className={styles.commentsSlider}>
          <div className={styles.commentsWrapper}>
            <div className={styles.commentsTitle}>OUR HAPPY CUSTOMERS</div>
            <div className={styles.sliderArrows}>
              <button>
                <svg xmlns='http://www.w3.org/2000/svg' width='20' height='16' viewBox='0 0 20 16' fill='none'>
                  <path
                    d='M7.70406 0.454104L0.954061 7.2041C0.849182 7.30862 0.765966 7.43281 0.709186 7.56956C0.652405 7.7063 0.623175 7.85291 0.623175 8.00098C0.623175 8.14904 0.652405 8.29565 0.709186 8.4324C0.765966 8.56915 0.849182 8.69334 0.954061 8.79785L7.70406 15.5479C7.91541 15.7592 8.20205 15.8779 8.50094 15.8779C8.79982 15.8779 9.08647 15.7592 9.29781 15.5479C9.50916 15.3365 9.62789 15.0499 9.62789 14.751C9.62789 14.4521 9.50916 14.1654 9.29781 13.9541L4.46875 9.12504L18.25 9.12504C18.5484 9.12504 18.8345 9.00651 19.0455 8.79554C19.2565 8.58456 19.375 8.29841 19.375 8.00004C19.375 7.70167 19.2565 7.41552 19.0455 7.20455C18.8345 6.99357 18.5484 6.87504 18.25 6.87504L4.46875 6.87504L9.29875 2.04598C9.51009 1.83463 9.62883 1.54799 9.62883 1.2491C9.62883 0.950218 9.51009 0.663574 9.29875 0.45223C9.08741 0.240885 8.80076 0.122151 8.50187 0.122151C8.20299 0.122151 7.91634 0.240885 7.705 0.45223L7.70406 0.454104Z'
                    fill='black'
                  />
                </svg>
              </button>
              <button>
                <svg xmlns='http://www.w3.org/2000/svg' width='20' height='16' viewBox='0 0 20 16' fill='none'>
                  <path
                    d='M12.2959 0.454104L19.0459 7.2041C19.1508 7.30862 19.234 7.43281 19.2908 7.56956C19.3476 7.7063 19.3768 7.85291 19.3768 8.00098C19.3768 8.14904 19.3476 8.29565 19.2908 8.4324C19.234 8.56915 19.1508 8.69334 19.0459 8.79785L12.2959 15.5479C12.0846 15.7592 11.7979 15.8779 11.4991 15.8779C11.2002 15.8779 10.9135 15.7592 10.7022 15.5479C10.4908 15.3365 10.3721 15.0499 10.3721 14.751C10.3721 14.4521 10.4908 14.1654 10.7022 13.9541L15.5313 9.12504L1.75 9.12504C1.45163 9.12504 1.16548 9.00651 0.954505 8.79554C0.743527 8.58456 0.625 8.29841 0.625 8.00004C0.625 7.70167 0.743527 7.41552 0.954505 7.20455C1.16548 6.99357 1.45163 6.87504 1.75 6.87504L15.5313 6.87504L10.7013 2.04598C10.4899 1.83463 10.3712 1.54799 10.3712 1.2491C10.3712 0.950218 10.4899 0.663574 10.7013 0.45223C10.9126 0.240885 11.1992 0.122151 11.4981 0.122151C11.797 0.122151 12.0837 0.240885 12.295 0.45223L12.2959 0.454104Z'
                    fill='black'
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className={styles.comments}>
            {users.map((user) => (
              <Comment key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
