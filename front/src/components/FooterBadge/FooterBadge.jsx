import styles from './FooterBadges.module.css'

export const FooterBadge = ({ link }) => {
    return <div className={styles.badge}><img src={`/src/assets/${link}.svg`} alt="" /></div>
}