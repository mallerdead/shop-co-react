import { useState } from 'react'
import { register, login } from '/src/api/api'
import styles from './AutentificationForm.module.css'
import { v4 as uuidv4 } from 'uuid'

export const AutentificationForm = ({ setHasToken, setIsLoading, addNotice }) => {
  const [isSignUpActive, setSignUpActive] = useState(true)
  const [isShowPassword, setIsShowPassword] = useState(false)

  const [signUpData, setSignUpData] = useState({
    login: '',
    email: '',
    password: '',
  })
  const [signInData, setSignInData] = useState({
    login: '',
    password: '',
  })

  const changeLoginSingUp = (e) => setSignUpData((prev) => ({ ...prev, login: e.target.value }))
  const changeEmailSingUp = (e) => setSignUpData((prev) => ({ ...prev, email: e.target.value }))
  const changePasswordSingUp = (e) => setSignUpData((prev) => ({ ...prev, password: e.target.value }))

  const changeLoginSingIn = (e) => setSignInData((prev) => ({ ...prev, login: e.target.value }))
  const changePasswordSingIn = (e) => setSignInData((prev) => ({ ...prev, password: e.target.value }))

  const toggleShowPassword = () => setIsShowPassword((prev) => !prev)

  const signUpSubmit = (e) => {
    e.preventDefault()

    register(signUpData)
      .then((token) => {
        document.cookie = `token=${token}; path=/;`
        addNotice(uuidv4(), 'Successfully registered', 'You have successfully registered', 'ok')
        setHasToken(true)
      })
      .catch((err) => {
        if (err.code === 'ERR_NETWORK') {
          addNotice(uuidv4(), 'Network error', 'Please check your internet connection', 'error')
        } else if (err.response.status === 409) {
          addNotice(uuidv4(), 'Error', err.response.data, 'error')
        } else {
          console.error(err)
        }
      })
  }
  const singInSubmit = (e) => {
    e.preventDefault()

    login(signInData)
      .then((token) => {
        document.cookie = `token=${token}; path=/;`
        setHasToken(true)
        addNotice(uuidv4(), 'Successfully authorized', 'You have successfully logged in to your account', 'ok')
      })
      .catch((err) => {
        if (err.code === 'ERR_NETWORK') {
          addNotice(uuidv4(), 'Network error', 'Please check your internet connection', 'error')
        } else if (err.response.status === 404) {
          addNotice(uuidv4(), 'Error', err.response.data, 'error')
        } else {
        }
      })
  }

  return (
    <div className={styles.autentificationForm}>
      <div className={styles.formButtons}>
        <button
          className={`${styles.formButton} ${isSignUpActive ? styles.active : ''}`}
          onClick={() => setSignUpActive(true)}
        >
          Sign up
        </button>
        <button
          className={`${styles.formButton} ${!isSignUpActive ? styles.active : ''}`}
          onClick={() => setSignUpActive(false)}
        >
          Sign in
        </button>
      </div>

      <form className={isSignUpActive ? styles.active : ''} onSubmit={signUpSubmit}>
        <h4>Create Account</h4>
        <div className={styles.inputBar}>
          <input
            id='login-sign-up'
            className={styles.formInput}
            type='text'
            value={signUpData.login}
            onChange={changeLoginSingUp}
            required
          />
          <label htmlFor='login-sign-up' className={`${styles.inputText} ${signUpData.login ? styles.active : ''}`}>
            Login
          </label>
        </div>
        <div className={styles.inputBar}>
          <input
            id='email-sign-up'
            className={styles.formInput}
            type='email'
            value={signUpData.email}
            onChange={changeEmailSingUp}
            required
          />
          <label htmlFor='email-sign-up' className={`${styles.inputText} ${signUpData.email ? styles.active : ''}`}>
            Email Address
          </label>
        </div>
        <div className={styles.inputBar}>
          <input
            id='password-sign-up'
            className={styles.formInput}
            type={isShowPassword ? 'text' : 'password'}
            value={signUpData.password}
            onChange={changePasswordSingUp}
            required
          />
          <label
            htmlFor='password-sign-up'
            className={`${styles.inputText} ${signUpData.password ? styles.active : ''}`}
          >
            Password
          </label>
          <button className={styles.showHidePassword} type='button' onClick={toggleShowPassword}>
            <img src={`/src/assets/${isShowPassword ? 'show' : 'hide'}password.svg`} alt='' />
          </button>
        </div>
        <button className={styles.submitButton} type='submit'>
          Create Account
        </button>
      </form>
      <form className={!isSignUpActive ? styles.active : ''} onSubmit={singInSubmit}>
        <h4>Sign in</h4>
        <div className={styles.inputBar}>
          <input
            id='login-sign-in'
            className={styles.formInput}
            type='text'
            value={signInData.login}
            onChange={changeLoginSingIn}
            required
          />
          <label htmlFor='login-sign-in' className={`${styles.inputText} ${signInData.login ? styles.active : ''}`}>
            Login or Email
          </label>
        </div>
        <div className={styles.inputBar}>
          <input
            id='password-sign-in'
            className={styles.formInput}
            type={isShowPassword ? 'text' : 'password'}
            value={signInData.password}
            onChange={changePasswordSingIn}
            required
          />
          <label
            htmlFor='password-sign-in'
            className={`${styles.inputText} ${signInData.password ? styles.active : ''}`}
          >
            Password
          </label>
          <button className={styles.showHidePassword} type='button' onClick={toggleShowPassword}>
            <img src={`/src/assets/${isShowPassword ? 'show' : 'hide'}password.svg`} alt='' />
          </button>
        </div>
        <button className={styles.submitButton} type='submit'>
          Log in
        </button>
      </form>
    </div>
  )
}
