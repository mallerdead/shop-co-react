import styles from './Comment.module.css'
import { Stars } from '..'

export const Comment = ({ user }) => {
  return (
    <div className={styles.comment}>
      <div className={styles.rating}>
        <Stars rating={user.rating} />
      </div>
      <div className={styles.name}>{user.name}</div>
      <div className={styles.text}>{user.text}</div>
    </div>
  )
}
