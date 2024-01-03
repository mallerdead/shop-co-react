import styles from './UserPage.module.css'
import { AutentificationForm, LoadingSpinner, UserInfo } from ".."
import { useEffect, useState } from 'react'
import { checkToken, getUser } from "/src/api/api"

export const UserPage = () => {
    const [user, setUser] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [hasToken, setHasToken] = useState(false)

    const changeName = (newName) => {
        setUser(prev => ({ ...prev, name: newName }))
    }
    const changeEmail = (newEmail) => {
        setUser(prev => ({ ...prev, email: newEmail }))
    }

    useEffect(() => {
        setIsLoading(true)
        if (checkToken()) {
            setUser(getUser())
            setHasToken(true)
        }
        else {
            setHasToken(false)
        }
        setIsLoading(false)
    }, [])
    return (
        <div className="container">
            <div className={styles.userPage}>
                {isLoading ? <LoadingSpinner /> : hasToken ? <UserInfo user={user} changeName={changeName} changeEmail={changeEmail} /> : <AutentificationForm />}
            </div>
        </div>)
}