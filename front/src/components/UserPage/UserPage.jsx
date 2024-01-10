import styles from './UserPage.module.css'
import { AutentificationForm, LoadingSpinner, UserInfo } from '..'
import { useEffect, useState } from 'react'
import { getUserInfo } from '/src/api/api'

export const UserPage = () => {
  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [hasToken, setHasToken] = useState(false)

  const changeName = (newName) => {
    setUser((prev) => ({ ...prev, name: newName }))
  }
  const changeEmail = (newEmail) => {
    setUser((prev) => ({ ...prev, email: newEmail }))
  }

  useEffect(() => {
    setIsLoading(true)
    const token = document.cookie.split('=')[1]

    if (token) {
      setHasToken(true)
    } else {
      setHasToken(false)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (hasToken) {
      setIsLoading(true)
      getUserInfo()
        .then((response) => {
          if (response.status === 200) {
            setUser(response.data)
          } else {
            document.cookie = 'token=test; path=/;'
            setHasToken(false)
          }
        })
        .then(() => setIsLoading(false))
        .catch(() => {
          document.cookie = 'token=; path=/;'
          setIsLoading(false)
        })
    }
  }, [hasToken])
  return (
    <div className='container'>
      <div className={styles.userPage}>
        {isLoading ? (
          <LoadingSpinner />
        ) : hasToken && user ? (
          <UserInfo user={user} changeName={changeName} changeEmail={changeEmail} />
        ) : (
          <AutentificationForm setHasToken={setHasToken} />
        )}
      </div>
    </div>
  )
}
