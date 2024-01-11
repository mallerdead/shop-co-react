import { useEffect } from 'react'
import styles from './ModalNotice.module.css'

export const ModalNotice = ({ notice, deleteHandler }) => {
  useEffect(() => {
    setTimeout(deleteHandler, 1500)
  }, [])
  return (
    <div className={`${styles.notice} ${styles[notice.state]}`}>
      <h4 className={styles.title}>{notice.title}</h4>
      <div className={styles.description}>{notice.description}</div>
    </div>
  )
}
