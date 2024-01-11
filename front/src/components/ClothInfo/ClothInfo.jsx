import styles from './ClothInfo.module.css'
import { Star, Color, Size } from '..'
import { addCartProductToCart } from '../../api/api'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const ClothInfo = ({ cloth, addNotice }) => {
  const [images, setImages] = useState([
    { id: 1, isActive: true, imageLink: cloth.imageURL },
    { id: 2, isActive: false, imageLink: cloth.imageURL },
    { id: 3, isActive: false, imageLink: cloth.imageURL },
  ])
  const [colors, setColors] = useState(cloth.colors.map((color, index) => ({ ...color, isActive: index === 0 })))
  const [sizes, setSizes] = useState(cloth.sizes.map((size, index) => ({ ...size, isActive: index === 0 })))
  const [count, setCount] = useState(1)

  const toggleSize = (id) => setSizes((prev) => prev.map((size) => ({ ...size, isActive: size.id === id })))

  const toggleColor = (id) => setColors((prev) => prev.map((color) => ({ ...color, isActive: color.id === id })))

  const toggleActiveImage = (id) => setImages((prev) => prev.map((image) => ({ ...image, isActive: image.id === id })))

  const handleInputChange = (e) => {
    const inputValue = e.target.value
    setCount(inputValue)
  }

  const handleAddToCart = () => {
    addCartProductToCart({
      clothId: cloth.id,
      sizeId: sizes.find((size) => size.isActive).id,
      colorId: colors.find((color) => color.isActive).id,
      count: count,
    }).then((status) => {
      if (status === 201) {
        addNotice(uuidv4(), 'Cloth added', `${cloth.name} added to cart`, 'ok')
      } else if (status === 200) {
        addNotice(
          uuidv4(),
          'Cloth count increased',
          `${cloth.name} are already in your cart so their quantity has been increased by ${count}`,
          'ok',
        )
      }
    })
  }

  const rating = new Array(Math.floor(cloth.rating)).fill(null)
  const stars = rating.map((e, index) => <Star key={index} isFull />)
  if (cloth.rating.toFixed(1).split('.')[1] !== '0') {
    stars.push(<Star key={5} />)
  }
  return (
    <div className={styles.clothInfo}>
      <div className={styles.clothGalery}>
        <div className={styles.allImage}>
          {images.map((image) => (
            <button
              key={image.id}
              className={`${styles.imageButton} ${image.isActive ? styles.active : ''}`}
              onClick={() => toggleActiveImage(image.id)}
            >
              <img src={`src/assets/${image.imageLink}`} alt='' />
            </button>
          ))}
        </div>
        <div className={styles.currentImage}>
          {<img src={`src/assets/${images.find((image) => image.isActive).imageLink}`} alt='' />}
        </div>
      </div>
      <div className={styles.cloth}>
        <div className={styles.name}>{cloth.name}</div>
        <div className={styles.rating}>
          <div className={styles.stars}>{stars}</div>
          <div className={styles.ratingNumber}>
            {cloth.rating}/<span className={styles.maxRating}>5</span>
          </div>
        </div>
        <div className={styles.fullPrice}>
          <div className={styles.price}>
            ${cloth.discount ? (cloth.price * (1 - cloth.discount / 100)).toFixed(2) : cloth.price}
          </div>
          <div className={styles.oldPrice}>{cloth.discount ? `$${cloth.price}` : ''}</div>
          {cloth.discount ? <div className={styles.discount}>-{cloth.discount}%</div> : ''}
        </div>
        <div className={styles.description}>{cloth.description}</div>
        <span className={styles.delimiter}></span>
        <div className={styles.colors}>
          <div className={styles.title}>Select Colors</div>
          <div className={styles.clothColors}>
            {colors.map((color) => (
              <Color
                key={color.id}
                color={color.name}
                isActive={color.isActive}
                toggleActive={() => toggleColor(color.id)}
              />
            ))}
          </div>
        </div>
        <span className={styles.delimiter}></span>
        <div className={styles.sizes}>
          <div className={styles.title}>Choose Size</div>
          <div className={styles.clothSizes}>
            {sizes.map((size) => {
              return (
                <Size
                  key={size.id}
                  size={size.name}
                  isActive={size.isActive}
                  toggleActive={() => toggleSize(size.id)}
                />
              )
            })}
          </div>
        </div>
        <span className={styles.delimiter}></span>
        <div className={styles.cartInfo}>
          <div className={styles.count}>
            <button className={styles.decrementCount} onClick={() => setCount((prev) => (prev != 1 ? --prev : prev))}>
              <img src='src/assets/minus.svg' alt='' />
            </button>
            <input
              type='text'
              value={count}
              onBlur={() =>
                setCount((prev) => {
                  const onlyNumbers = prev.toString().replace(/[^0-9]/g, '')
                  return onlyNumbers ? onlyNumbers : 1
                })
              }
              onChange={handleInputChange}
            />
            <button className={styles.incrementCount} onClick={() => setCount((prev) => ++prev)}>
              <img src='src/assets/plus.svg' alt='' />
            </button>
          </div>
          <button className={styles.addCartButton} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
