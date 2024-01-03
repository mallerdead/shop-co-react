import styles from './ClothInfo.module.css'
import { Star, Color, Size } from ".."
import { useState } from 'react'

export const ClothInfo = ({ cloth }) => {
    const [images, setImages] = useState([
        { id: 1, isActive: true, imageLink: cloth.imageLink },
        { id: 2, isActive: false, imageLink: cloth.imageLink },
        { id: 3, isActive: false, imageLink: cloth.imageLink }
    ])
    const [color, setColor] = useState({
        isActive: true,
        color: cloth.color.colorName
    })
    const [sizes, setSizes] = useState(cloth.sizes.map((size, index) => ({ id: size.id, size: size.size, isActive: index === 0 })))
    const [count, setCount] = useState(1)

    const toggleSize = (id) => {
        setSizes(prev => prev.map(size => ({ ...size, isActive: size.id === id })))
    }

    const toggleColor = () => {
        setColor(prev => ({ ...prev, isActive: !prev.isActive }))
    }

    const toggleActiveImage = (id) => {
        setImages(prev => prev.map(image => ({ ...image, isActive: image.id === id })))
    }
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setCount(inputValue);
    }

    const rating = new Array(Math.floor(cloth.rating)).fill(null)
    const stars = rating.map((e, index) => <Star key={index} isFull />)
    if (cloth.rating.toFixed(1).split('.')[1] !== "0") {
        stars.push(<Star key={5} />)
    }
    return (
        <div className={styles.clothInfo}>
            <div className={styles.clothGalery}>
                <div className={styles.allImage}>
                    {images.map(image =>
                        <button key={image.id} className={`${styles.imageButton} ${image.isActive ? styles.active : ""}`} onClick={() => toggleActiveImage(image.id)}>
                            <img src={`src/assets/${image.imageLink}`} alt="" />
                        </button>)}
                </div>
                <div className={styles.currentImage}>
                    {<img src={`src/assets/${images.find(image => image.isActive).imageLink}`} alt='' />}
                </div>
            </div>
            <div className={styles.cloth}>
                <div className={styles.name}>{cloth.name}</div>
                <div className={styles.rating}>
                    <div className={styles.stars}>{stars}</div>
                    <div className={styles.ratingNumber}>{cloth.rating}/<span className={styles.maxRating}>5</span></div>
                </div>
                <div className={styles.fullPrice}>
                    <div className={styles.price}>${cloth.price}</div>
                    <div className={styles.oldPrice}>{cloth.discount ? `$${cloth.oldPrice}` : ""}</div>
                    {cloth.discount ? <div className={styles.discount}>-{cloth.discount}%</div> : ""}
                </div>
                <div className={styles.description}>{cloth.description}</div>
                <span className={styles.delimiter}></span>
                <div className={styles.colors}>
                    <div className={styles.title}>Select Colors</div>
                    <div className={styles.clothColors}>
                        {<Color color={color.color} isActive={color.isActive} toggleActive={toggleColor} />}
                    </div>
                </div>
                <span className={styles.delimiter}></span>
                <div className={styles.sizes}>
                    <div className={styles.title}>Choose Size</div>
                    <div className={styles.clothSizes}>
                        {sizes.map(size => {
                            return <Size key={size.id} size={size.size} isActive={size.isActive} toggleActive={() => toggleSize(size.id)} />
                        })}
                    </div>
                </div>
                <span className={styles.delimiter}></span>
                <div className={styles.cartInfo}>
                    <div className={styles.count}>
                        <button className={styles.decrementCount} onClick={() => setCount(prev => prev != 1 ? --prev : prev)}>
                            <img src="src/assets/minus.svg" alt="" />
                        </button>
                        <input type='text' value={count} onBlur={() =>
                            setCount(prev => {
                                const onlyNumbers = prev.toString().replace(/[^0-9]/g, '')
                                return onlyNumbers ? onlyNumbers : 1
                            })
                        } onChange={handleInputChange} />
                        <button className={styles.incrementCount} onClick={() => setCount(prev => ++prev)}>
                            <img src="src/assets/plus.svg" alt="" />
                        </button>
                    </div>
                    <button className={styles.addCartButton}>Add to Cart</button>
                </div>
            </div>
        </div>)
}