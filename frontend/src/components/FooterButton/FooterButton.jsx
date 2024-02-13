import styles from './FooterButton.module.css'

export const FooterButton = ({ link, image }) => {
  return (
    <a href={link} className={styles.link} target='_blank'>
      {image}
    </a>
  )
}
