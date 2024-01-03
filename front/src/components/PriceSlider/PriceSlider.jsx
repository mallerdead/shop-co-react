import './PriceSlider.css'
import ReactSlider from "react-slider"

export const PriceSlider = ({ min, max, handleSliderChange }) => {
    return (
        <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            defaultValue={[min, max]}
            ariaLabel={['Lower thumb', 'Upper thumb']}
            min={min}
            max={max}
            renderThumb={(props, state) => <div {...props} ><span className='btn-value'>{`$ ${state.valueNow}`}</span></div>}
            pearling
            minDistance={0}
            onChange={handleSliderChange}
        />

    );
};