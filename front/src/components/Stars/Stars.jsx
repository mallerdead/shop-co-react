import styles from './Stars.module.css'
import star from '/src/assets/Star.svg'
import halfStar from '/src/assets/Half star.svg'

export const Stars = ({ rating }) => {
  const stars = new Array(Math.floor(rating)).fill(true)
  if (+rating.toFixed(1) % 1 !== 0) {
    stars.push(false)
  }

  return (
    <div className={styles.stars}>
      {stars.map((starIsFull, index) => (
        <img key={index} src={starIsFull ? star : halfStar} alt='' />
      ))}
    </div>
  )
}
