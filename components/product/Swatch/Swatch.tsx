import cn from 'classnames'
import React from 'react'
import s from './Swatch.module.css'
import { Check } from '@components/icons'
import Button, { ButtonProps } from '@components/ui/Button'
import { isDark } from '@lib/colors' 
interface SwatchProps {
  active?: boolean
  children?: any
  className?: string
  variant?: 'size' | 'color' | string
  color?: string
  image?: string
  label?: string | null
}

const Swatch: React.FC<Omit<ButtonProps, 'variant'> & SwatchProps> = React.memo(
  ({
    active,
    className,
    color = '',
    image = '',
    label = null,
    variant = 'size', 
    ...props
  }) => {
    variant = variant?.toLowerCase() 
    if (label) {
      label = label?.toLowerCase()
    }

    const swatchClassName = cn(
      s.swatch,
      {
        [s.color]: color,
        [s.active]: active,
        [s.size]: variant === 'size',
        [s.dark]: color ? isDark(color) : false,
        [s.textLabel]: !color && label && label.length > 3,
      },
      className
    )

    return (
      <Button 
        aria-label="Variant Swatch"
        className={swatchClassName}
        {...(label && color && { title: label })}
        style={image ? { backgroundImage: `url(${image})` } : {}  }
        {...props}
      >
        {color && active && (
          <span>
            <Check />
          </span>
        )}
        <div className="">{!color ? label : null}</div> 
         
          
      </Button>
      
    )
  }
)

export default Swatch
