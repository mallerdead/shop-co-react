import styles from './UserPage.module.css'
import { AutentificationForm, LoadingSpinner, ModalNotices, Orders, UserInfo } from '..'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { getUserInfo, ChangeUserName, ChangeUserEmail } from '../../api/user'

export const UserPage = () => {
  const [notices, setNotices] = useState([])
  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [hasToken, setHasToken] = useState(false)

  const addNotice = (id, title, description, state) =>
    setNotices((prev) => [...prev, { id, title, description, state }])

  const changeName = (newName) => {
    ChangeUserName(newName).then(() => {
      setUser((prev) => ({ ...prev, login: newName }))
      addNotice(uuidv4(), 'Name changed', 'Your name has been changed', 'ok')
    })
  }

  const changeEmail = (newEmail) => {
    ChangeUserEmail(newEmail).then(() => {
      setUser((prev) => ({ ...prev, email: newEmail }))
      addNotice(uuidv4(), 'Email changed', 'Your email has been changed', 'ok')
    })
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
          setUser(response.data)
          setIsLoading(false)
        })
        .catch((err) => {
          if (err.code === 'ERR_NETWORK') {
            addNotice(uuidv4(), 'Network error', 'Please check your internet connection', 'error')
          } else if (err.response.status === 401) {
            addNotice(uuidv4(), 'Aythentication error', err.response.data, 'error')
            setHasToken(false)
            document.cookie = 'token=; path=/;'
            setIsLoading(false)
          }
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
          <>
            <UserInfo user={user} changeName={changeName} changeEmail={changeEmail} setHasToken={setHasToken} />
            <Orders />
          </>
        ) : (
          <AutentificationForm setHasToken={setHasToken} setIsLoading={setIsLoading} addNotice={addNotice} />
        )}
      </div>
    </div>
  )
}
