import { useEffect, useState, Fragment } from 'react'
import { getCartItems } from "/src/api/api"
import { LoadingSpinner, CartItem } from ".."
import styles from './Cart.module.css'

export const Cart = () => {
    const [cartItems, setCartItems] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const deleteCartItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id))
    }

    const changeQuantity = (id, newQuantity) => {
        setCartItems(prev => prev.map(item => item.clothId === id ? { ...item, quantity: newQuantity } : item))
    }

    useEffect(() => {
        setIsLoading(true)
        setCartItems(getCartItems())
        setIsLoading(false)
    }, [])

    return (
        <div className='container'>
            <div className={styles.cart}>
                <h4>Your cart</h4>
                <div className={styles.cartInfo}>
                    <div className={styles.items}>
                        {isLoading ? <LoadingSpinner /> :
                            cartItems.length ?
                                cartItems.map((item, index) => (
                                    <Fragment key={item.id}>
                                        <CartItem cloth={item} deleteHandler={() => deleteCartItem(item.id)} changeQuantity={changeQuantity} />
                                        {index !== cartItems.length - 1 && <div className={styles.delimiter}></div>}
                                    </Fragment>
                                )) :
                                <div className={styles.cartEmpty}>
                                    <h4>Cart is empty</h4>
                                    <img src="/src/assets/cart.svg" alt="Cart icon" />
                                    <a href="/shop">Go to shop</a>
                                </div>}
                    </div>
                    <div className={styles.orderSummary}>
                        <h4>Order Summary</h4>
                        <div className={styles.subtotal}>
                            <h3>Subtotal</h3>
                            <span>
                                ${isLoading ? 0 : cartItems.reduce((accum, cur) => accum + (cur.discount ? +cur.oldPrice : +cur.price) * +cur.quantity, 0)}
                            </span>
                        </div>
                        <div className={styles.discount}>
                            <h3>Discount (-20%)</h3>
                            <span>
                                {isLoading ? "$0" : `-$${cartItems.reduce((accum, cur) => cur.discount ? accum + (+cur.oldPrice - +cur.price) * cur.quantity : accum, 0)}`}
                            </span>
                        </div>
                        <div className={styles.delivery}>
                            <h3>Delivery Fee</h3>
                            <span>$15</span>
                        </div>
                        <div className={styles.delimiter}></div>
                        <div className={styles.total}>
                            <h3>Total</h3>
                            <span>${isLoading ? 0 : cartItems.reduce((accum, cur) => accum + +cur.price * +cur.quantity, 0)}</span>
                        </div>
                        <div className={styles.promo}>
                            <div className={styles.promoInputBar}>
                                <img src="/src/assets/promo.svg" alt="" />
                                <input type="text" placeholder='Add promo code' />
                            </div>

                            <button>Apply</button>
                        </div>
                        <button className={styles.checkout}>Go to Checkout</button>
                    </div>
                </div>
            </div>
        </div>)
}