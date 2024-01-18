import styles from './ClothItem.module.css'
import { Star } from '..'

export const ClothItem = ({ cloth }) => {
  const rating = new Array(Math.floor(cloth.rating)).fill(null)
  const stars = rating.map((e, index) => <Star key={index} isFull />)
  if (cloth.rating.toFixed(1).split('.')[1] !== '0') {
    stars.push(<Star key={5} />)
  }

  return (
    <a href={`cloth?id=${cloth.id}`} className={styles.item}>
      <div className={styles.clothPreview}>
        <img src={`https://192.168.1.37:7001/clothes/image/${cloth.imageURL}`} alt={`${cloth.imageURL} preview`} />
      </div>
      <div className={styles.name}>{cloth.name}</div>
      <div className={styles.rating}>
        <div className={styles.stars}>{stars}</div>
        <div className={styles.ratingNumber}>{cloth.rating}/5</div>
      </div>
      <div className={styles.fullPrice}>
        <div className={styles.price}>
          ${cloth.discount ? (cloth.price * (1 - cloth.discount / 100)).toFixed(2) : cloth.price}
        </div>
        <div className={styles.oldPrice}>{cloth.discount ? `$${cloth.price}` : ''}</div>
        {cloth.discount ? <div className={styles.discount}>-{cloth.discount}%</div> : ''}
      </div>
    </a>
  )
}
