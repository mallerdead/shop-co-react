import styles from './ModalNotices.module.css'
import { ModalNotice } from './comp/ModalNotice/ModalNotice'

export const ModalNotices = ({ notices, setNotices }) => {
  const deleteNotice = (id) => setNotices((prev) => prev.filter((notice) => notice.id !== id))

  return (
    <div className={styles.notices}>
      {notices.map((notice) => (
        <ModalNotice key={notice.id} notice={notice} deleteHandler={() => deleteNotice(notice.id)} />
      ))}
    </div>
  )
}
