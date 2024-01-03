import styles from './Comment.module.css'
import { Star } from '..'

export const Comment = ({ user }) => {
    const rating = new Array(Math.floor(user.rating)).fill(null)
    const stars = rating.map(() => <Star isFull />)

    if (user.rating.toFixed(1).split('.')[1] !== "0") {
        stars.push(<Star />)    
    }

    return (
        <div className={styles.comment}>
            <div className={styles.rating}>{stars}</div>
            <div className={styles.name}>{user.name}</div>
            <div className={styles.text}>{user.text}</div>
        </div>)
}