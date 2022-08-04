import { forwardRef } from 'react'

import Icon, { IconProps } from '../Icon'
import './TextInput.style.scss'

type TextInputProps = {
  className?: string
  value?: string
  name: string
  placeholder?: string
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void
  required?: boolean
  disabled?: boolean
  iconLeft?: IconProps
  iconRight?: IconProps
}

const TextInput = forwardRef<HTMLDivElement, TextInputProps>(
  ({ className = '', iconLeft, iconRight, ...props }, ref) => {
    const textInputClassName = `text-input ${className}`

    return (
      <div ref={ref} className={textInputClassName}>
        {!!iconLeft && (
          <Icon
            className={`text-input__icon ${iconLeft.className || ''}`}
            name={iconLeft.name}
            onClick={iconLeft.onClick}
          />
        )}
        <input
          className='text-input__field'
          data-testid='text-input-field'
          type='text'
          {...props}
        />
        {!!iconRight && (
          <Icon
            className={`text-input__icon ${iconRight.className || ''}`}
            name={iconRight.name}
            onClick={iconRight.onClick}
          />
        )}
      </div>
    )
  }
)

export default TextInput
