import styles from './Size.module.css'

export const Size = ({ size, isActive, toggleActive }) => {
    return (<button className={`${styles.size} ${isActive ? styles.active : ""}`} onClick={toggleActive}>{size}</button>)
}