import styles from './Orders.module.css'

export const Orders = () => {
  return (
    <div>
      <h4>Orders</h4>
      <div className={styles.items}>
        <div className={styles.item}>
          <div>
            <h4>Name order</h4>
            <div></div>
          </div>
          <div>
            <h4>Total price</h4>
            <div></div>
          </div>
          <div>
            <h4>Order processing time</h4>
            <div></div>
          </div>
          <div>
            <h4>Status</h4>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
