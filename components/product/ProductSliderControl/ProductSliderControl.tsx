import cn from 'classnames'
import React from 'react'
import s from './ProductSliderControl.module.css'
import { ArrowLeft, ArrowRight } from '@components/icons'

interface ProductSliderControl {
  onPrev: React.MouseEventHandler<HTMLButtonElement>
  onNext: React.MouseEventHandler<HTMLButtonElement>
}

const ProductSliderControl: React.FC<ProductSliderControl> = React.memo(
  ({ onPrev, onNext }) => (
    <div className={cn(s.control,'buttonBG')}>
      <button
        className={cn(s.leftControl)}
        onClick={onPrev}
        aria-label="Previous Product Image"
      >
        <ArrowLeft />
      </button>
      <button
        className={cn(s.rightControl)}
        onClick={onNext}
        aria-label="Next Product Image"
      >
        <ArrowRight />
      </button>
    </div>
  )
)
export default ProductSliderControl
