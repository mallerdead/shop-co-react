import { useEffect, useState } from 'react'
import { getClothesById } from '/src/api/api'
import styles from './ClothPage.module.css'
import { LoadingSpinner, ClothInfo, ModalNotices } from '..'

export const ClothPage = () => {
  const [notices, setNotices] = useState([])
  const [cloth, setCloth] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const addNotice = (id, title, description, state) => {
    setNotices((prev) => [...prev, { id, title, description, state }])
  }
  const deleteNotice = (id) => {
    setNotices((prev) => prev.filter((notice) => notice.id !== id))
  }

  useEffect(() => {
    setIsLoading(true)
    const url = new URL(window.location.href)
    getClothesById(+url.searchParams.get('id')).then((cloth) => {
      setCloth(cloth)
      setIsLoading(false)
    })
  }, [])

  return (
    <div className='container'>
      <div className={styles.notices}>
        <ModalNotices notices={notices} setNotices={setNotices} />
      </div>
      <div className={styles.clothPage}>
        {isLoading ? <LoadingSpinner /> : <ClothInfo cloth={cloth} addNotice={addNotice} />}
      </div>
    </div>
  )
}
