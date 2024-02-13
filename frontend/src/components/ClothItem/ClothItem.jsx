import styles from './ClothItem.module.css'
import { Stars } from '..'

export const ClothItem = ({ cloth }) => {
  return (
    <a href={`cloth?id=${cloth.id}`} className={styles.item}>
      <div className={styles.clothPreview}>
        <img src={`https://192.168.1.37:7001/clothes/image/${cloth.imageURL}`} alt={`${cloth.imageURL} preview`} />
      </div>
      <div className={styles.name}>{cloth.name}</div>
      <div className={styles.rating}>
        <div className={styles.stars}>
          <Stars rating={cloth.rating} />
        </div>
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
