import { useEffect, useState } from 'react'
import { getClothesById } from '/src/api/api'
import styles from './ClothPage.module.css'
import { LoadingSpinner, ClothInfo } from '..'

export const ClothPage = () => {
  const [cloth, setCloth] = useState()
  const [isLoading, setIsLoading] = useState(true)

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
      <div className={styles.clothPage}>{isLoading ? <LoadingSpinner /> : <ClothInfo cloth={cloth} />}</div>
    </div>
  )
}
