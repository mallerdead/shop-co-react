import { useEffect, useState, Fragment } from 'react'
import { getCart, removeProductFromCart, changeCountInCart } from '../../api/api'
import { LoadingSpinner, CartItem, ModalNotices } from '..'
import { v4 as uuidv4 } from 'uuid'
import styles from './Cart.module.css'

export const Cart = () => {
  const [notices, setNotices] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const addNotice = (id, title, description, state) =>
    setNotices((prev) => [...prev, { id, title, description, state }])

  const deleteCartItem = (id) => {
    const product = cartItems.find((item) => item.id === id)

    removeProductFromCart({
      clothId: product.clothId,
      sizeId: product.size.id,
      colorId: product.color.id,
      count: product.count,
    }).then(() => {
      addNotice(uuidv4(), 'Cloth removed', `${product.name} removed from cart`, 'ok')
      setCartItems((prev) => prev.filter((item) => item.id !== id))
    })
  }

  const changeQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      newQuantity = 1
    }
    setCartItems((prev) =>
      prev.map((product) => {
        return product.id === id ? { ...product, count: newQuantity } : product
      }),
    )
    const product = cartItems.find((item) => item.id === id)

    changeCountInCart({
      clothId: product.clothId,
      sizeId: product.size.id,
      colorId: product.color.id,
      count: newQuantity,
    })
  }

  useEffect(() => {
    setIsLoading(true)
    getCart()
      .then((data) => {
        setCartItems(data)
      })
      .then(() => setIsLoading(false))
  }, [])

  return (
    <div className='container'>
      <ModalNotices notices={notices} setNotices={setNotices} />
      <div className={styles.cart}>
        <h4>Your cart</h4>
        <div className={styles.cartInfo}>
          <div className={styles.items}>
            {isLoading ? (
              <LoadingSpinner />
            ) : cartItems.length ? (
              cartItems.map((product, index) => (
                <Fragment key={product.id}>
                  <CartItem
                    product={product}
                    productCount={product.count}
                    deleteHandler={() => deleteCartItem(product.id)}
                    changeQuantity={changeQuantity}
                  />
                  {index !== cartItems.length - 1 && <div className={styles.delimiter}></div>}
                </Fragment>
              ))
            ) : (
              <div className={styles.cartEmpty}>
                <h4>Cart is empty</h4>
                <img src='/src/assets/cart.svg' alt='Cart icon' />
                <a href='/shop'>Go to shop</a>
              </div>
            )}
          </div>
          <div className={styles.orderSummary}>
            <h4>Order Summary</h4>
            <div className={styles.subtotal}>
              <h3>Subtotal</h3>
              <span>
                $
                {isLoading
                  ? 0
                  : cartItems.reduce(
                      (accum, cur) => accum + (cur.discount ? +cur.oldPrice : +cur.price) * +cur.count,
                      0,
                    )}
              </span>
            </div>
            <div className={styles.discount}>
              <h3>Discount (-20%)</h3>
              <span>
                {isLoading
                  ? '$0'
                  : `-$${cartItems.reduce(
                      (accum, cur) => (cur.discount ? accum + (+cur.oldPrice - +cur.price) * cur.count : accum),
                      0,
                    )}`}
              </span>
            </div>
            <div className={styles.delivery}>
              <h3>Delivery Fee</h3>
              <span>$15</span>
            </div>
            <div className={styles.delimiter}></div>
            <div className={styles.total}>
              <h3>Total</h3>
              <span>${isLoading ? 0 : cartItems.reduce((accum, cur) => accum + +cur.price * +cur.count, 0)}</span>
            </div>
            <div className={styles.promo}>
              <div className={styles.promoInputBar}>
                <img src='/src/assets/promo.svg' alt='' />
                <input type='text' placeholder='Add promo code' />
              </div>

              <button>Apply</button>
            </div>
            <button className={styles.checkout}>Go to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}
