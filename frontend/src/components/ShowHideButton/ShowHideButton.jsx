import styles from './ShowHideButton.module.css'

export const ShowHideButton = ({ isActive, onClickHandler }) => {
  return (
    <button className={`${styles.showHideButton} ${isActive ? styles.active : ''}`} onClick={onClickHandler}></button>
  )
}
