import { useReducer, useState } from 'react'
import { register, login } from '/src/api/api'
import styles from './AutentificationForm.module.css'
import { v4 as uuidv4 } from 'uuid'

export const AutentificationForm = ({ setHasToken, addNotice }) => {
  const [isSignUpActive, setSignUpActive] = useState(true)
  const [isShowPassword, setIsShowPassword] = useState(false)

  const [registerData, dispatchRegister] = useReducer(registerReducer, { login: '', email: '', password: '' })
  const [loginData, dispatchLogin] = useReducer(loginReducer, { login: '', password: '' })

  const registerReducer = (state, action) => {
    switch (action.type) {
      case 'login':
        return { ...state, login: action.payload }
      case 'email':
        return { ...state, email: action.payload }
      case 'password':
        return { ...state, password: action.payload }
      default:
        throw new Error()
    }
  }
  const loginReducer = (state, action) => {
    switch (action.type) {
      case 'login':
        return { ...state, login: action.payload }
      case 'password':
        return { ...state, password: action.payload }
    }
  }

  const changeLoginSingUp = (e) => dispatchRegister({ type: 'login', payload: e.target.value })
  const changeEmailSingUp = (e) => dispatchRegister({ type: 'email', payload: e.target.value })
  const changePasswordSingUp = (e) => dispatchRegister({ type: 'password', payload: e.target.value })

  const changeLoginSingIn = (e) => dispatchLogin({ type: 'login', payload: e.target.value })
  const changePasswordSingIn = (e) => dispatchLogin({ type: 'password', payload: e.target.value })

  const toggleShowPassword = () => setIsShowPassword((prev) => !prev)

  const signUpSubmit = (e) => {
    e.preventDefault()

    register(registerData)
      .then((response) => response.data)
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

    login(loginData)
      .then((response) => response.data)
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
            value={registerData.login}
            onChange={changeLoginSingUp}
            required
          />
          <label htmlFor='login-sign-up' className={`${styles.inputText} ${registerData.login ? styles.active : ''}`}>
            Login
          </label>
        </div>
        <div className={styles.inputBar}>
          <input
            id='email-sign-up'
            className={styles.formInput}
            type='email'
            value={registerData.email}
            onChange={changeEmailSingUp}
            required
          />
          <label htmlFor='email-sign-up' className={`${styles.inputText} ${registerData.email ? styles.active : ''}`}>
            Email Address
          </label>
        </div>
        <div className={styles.inputBar}>
          <input
            id='password-sign-up'
            className={styles.formInput}
            type={isShowPassword ? 'text' : 'password'}
            value={registerData.password}
            onChange={changePasswordSingUp}
            required
          />
          <label
            htmlFor='password-sign-up'
            className={`${styles.inputText} ${registerData.password ? styles.active : ''}`}
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
            value={loginData.login}
            onChange={changeLoginSingIn}
            required
          />
          <label htmlFor='login-sign-in' className={`${styles.inputText} ${loginData.login ? styles.active : ''}`}>
            Login or Email
          </label>
        </div>
        <div className={styles.inputBar}>
          <input
            id='password-sign-in'
            className={styles.formInput}
            type={isShowPassword ? 'text' : 'password'}
            value={loginData.password}
            onChange={changePasswordSingIn}
            required
          />
          <label
            htmlFor='password-sign-in'
            className={`${styles.inputText} ${loginData.password ? styles.active : ''}`}
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
