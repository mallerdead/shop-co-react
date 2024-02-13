import styles from './FilterItem.module.css'
import { ShowHideButton } from '..'

export const FilterItem = ({ title, isShowing, onClickHandler, content }) => {
    return (
        <div className={styles.filter}>
            <div className={styles.title}>
                <h4>{title}</h4>
                <ShowHideButton isActive={isShowing} onClickHandler={onClickHandler} />
            </div>
            <div className={`${styles.filterContent} ${isShowing ? styles.active : ""}`}>
                {content}
            </div>
        </div>)
}