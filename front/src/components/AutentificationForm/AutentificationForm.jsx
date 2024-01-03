import { useState } from 'react'
import styles from './AutentificationForm.module.css'

export const AutentificationForm = () => {
    const [isSignUpActive, setSignUpActive] = useState(true)
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [signUpData, setSignUpData] = useState({
        login: "",
        email: "",
        password: "",
    })
    const [signInData, setSignInData] = useState({
        login: "",
        password: "",
    })
    const changeLoginSingUp = (e) => {
        setSignUpData(prev => ({ ...prev, login: e.target.value }))
    }
    const changeEmailSingUp = (e) => {
        setSignUpData(prev => ({ ...prev, email: e.target.value }))
    }
    const changePasswordSingUp = (e) => {
        setSignUpData(prev => ({ ...prev, password: e.target.value }))
    }

    const changeLoginSingIn = (e) => {
        setSignInData(prev => ({ ...prev, login: e.target.value }))
    }
    const changePasswordSingIn = (e) => {
        setSignInData(prev => ({ ...prev, password: e.target.value }))
    }

    const toggleShowPassword = () => {
        setIsShowPassword(prev => !prev)
    }


    const signUpSubmit = (e) => {
        e.preventDefault()
        console.log(signUpData)
    }
    const singInSubmit = (e) => {
        e.preventDefault()
        console.log(signInData)
    }

    return (
        <div className={styles.autentificationForm}>
            <div className={styles.formButtons}>
                <button className={`${styles.formButton} ${isSignUpActive ? styles.active : ""}`} onClick={() => setSignUpActive(true)}>Sign up</button>
                <button className={`${styles.formButton} ${!isSignUpActive ? styles.active : ""}`} onClick={() => setSignUpActive(false)}>Sign in</button>
            </div>

            <form className={isSignUpActive ? styles.active : ""} onSubmit={signUpSubmit}>
                <h4>Create Account</h4>
                <div className={styles.inputBar}>
                    <input className={styles.formInput} type="text" value={signUpData.login} onChange={changeLoginSingUp} required />
                    <div className={`${styles.inputText} ${signUpData.login ? styles.active : ""}`}>Login</div>
                </div>
                <div className={styles.inputBar}>
                    <input className={styles.formInput} type="email" value={signUpData.email} onChange={changeEmailSingUp} required />
                    <div className={`${styles.inputText} ${signUpData.email ? styles.active : ""}`}>Email Address</div>
                </div>
                <div className={styles.inputBar}>
                    <input className={styles.formInput} type={isShowPassword ? "text" : "password"} value={signUpData.password} onChange={changePasswordSingUp} required />
                    <div className={`${styles.inputText} ${signUpData.password ? styles.active : ""}`}>Password</div>
                    <button className={styles.showHidePassword} type="button" onClick={toggleShowPassword}>
                        <img src={`/src/assets/${isShowPassword ? "show" : "hide"}password.svg`} alt="" />
                    </button>
                </div>
                <button className={styles.submitButton} type='submit'>Create Account</button>
            </form>
            <form className={!isSignUpActive ? styles.active : ""} onSubmit={singInSubmit}>
                <h4>Sign in</h4>
                <div className={styles.inputBar}>
                    <input className={styles.formInput} type="text" value={signInData.login} onChange={changeLoginSingIn} required />
                    <div className={`${styles.inputText} ${signInData.login ? styles.active : ""}`}>Login or Email</div>
                </div>
                <div className={styles.inputBar}>
                    <input className={styles.formInput} type={isShowPassword ? "text" : "password"} value={signInData.password} onChange={changePasswordSingIn} required />
                    <div className={`${styles.inputText} ${signInData.password ? styles.active : ""}`}>Password</div>
                    <button className={styles.showHidePassword} type="button" onClick={toggleShowPassword}>
                        <img src={`/src/assets/${isShowPassword ? "show" : "hide"}password.svg`} alt="" />
                    </button>
                </div>
                <button className={styles.submitButton} type="submit">Log in</button>
            </form>
        </div>)
}