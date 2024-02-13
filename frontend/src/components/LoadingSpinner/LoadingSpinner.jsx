import styles from './LoadingSpinner.module.css'

export const LoadingSpinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <div className={`${styles.inner} ${styles.one}`}></div>
        <div className={`${styles.inner} ${styles.two}`}></div>
        <div className={`${styles.inner} ${styles.three}`}></div>
      </div>
      <span>Loading...</span>
    </div>
  )
}
