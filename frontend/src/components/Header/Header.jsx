import { useState } from 'react'
import styles from './Header.module.css'

export const Header = () => {
    const [burgerActive, setBurgerActive] = useState(false)
    const [searchBarActive, setSearchBarActive] = useState(false)

    const toggleBurger = () => {
        setSearchBarActive(false)
        setBurgerActive(prev => !prev)
    }
    const toggleSearch = () => {
        setBurgerActive(false)
        setSearchBarActive(prev => !prev)
    }

    const startSearch = (e) => {
        e.preventDefault();
        console.log("Search!!!")
    }

    return (
        <div className={`container ${styles.header}`}>
            <div className={styles.burgerMenuWrapper}>
                <button className={`${styles.burgerMenu} ${burgerActive ? styles.active : " "}`} onClick={toggleBurger}>
                    <span></span>
                </button>
                <a href="/" className={styles.logo}>SHOP.CO</a>
            </div>

            <nav className={`${styles.navigation} ${burgerActive ? styles.active : ""}`}>
                <a href="/shop" className={styles.navLink}>Shop</a>
                <a href="/shop" className={styles.navLink}>On Sale</a>
                <a href="/shop" className={styles.navLink}>New Arrivals</a>
                <a href="/shop" className={styles.navLink}>Brands</a>
            </nav>
            <form className={`${styles.searchBar} ${searchBarActive ? styles.active : ""}`} onSubmit={startSearch}>
                <img src="/src/assets/search.svg" alt="Search icon" />
                <input className={styles.search} type="text" placeholder='Search for products...' />
            </form>
            <div className={styles.userButtons}>
                <button className={styles.searchButton} onClick={toggleSearch}>
                    <img src="/src/assets/search.svg" alt="Search icon" />
                </button>
                <a href='/cart' className={styles.cartButton}>
                    <img src="/src/assets/cart.svg" alt="Cart icon" />
                </a>
                <a href='/user' className={styles.userButton}>
                    <img src="/src/assets/user.svg" alt="User icon" />
                </a>
            </div>
        </div >
    )
}