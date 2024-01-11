import styles from './UserPage.module.css'
import { AutentificationForm, LoadingSpinner, ModalNotices, UserInfo } from '..'
import { useEffect, useState } from 'react'

import { getUserInfo } from '/src/api/api'

export const UserPage = () => {
  const [notices, setNotices] = useState([])
  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [hasToken, setHasToken] = useState(false)

  const addNotice = (id, title, description, state) =>
    setNotices((prev) => [...prev, { id, title, description, state }])

  const changeName = (newName) => setUser((prev) => ({ ...prev, name: newName }))
  const changeEmail = (newEmail) => setUser((prev) => ({ ...prev, email: newEmail }))

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
          setUser(response.data)
          setIsLoading(false)
        })
        .catch(() => {
          setHasToken(false)
          document.cookie = 'token=; path=/;'
          setIsLoading(false)
        })
    }
  }, [hasToken])
  return (
    <div className='container'>
      <ModalNotices notices={notices} setNotices={setNotices} />
      <div className={styles.userPage}>
        {isLoading ? (
          <LoadingSpinner />
        ) : hasToken && user ? (
          <UserInfo user={user} changeName={changeName} changeEmail={changeEmail} />
        ) : (
          <AutentificationForm setHasToken={setHasToken} setIsLoading={setIsLoading} addNotice={addNotice} />
        )}
      </div>
    </div>
  )
}
