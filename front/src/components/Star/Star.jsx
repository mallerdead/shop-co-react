import star from "/src/assets/Star.svg"
import halfStar from "/src/assets/Half star.svg"

export const Star = ({ isFull }) => {
    return <img src={isFull ? star : halfStar} alt="" />
}   