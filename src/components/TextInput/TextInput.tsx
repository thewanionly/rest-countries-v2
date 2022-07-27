import { forwardRef } from 'react'
import './TextInput.style.scss'

type TextInputProps = {
  className?: string
  value?: string
  name: string
  placeholder?: string
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void
  required?: boolean
  disabled?: boolean
}

const TextInput = forwardRef<HTMLDivElement, TextInputProps>(
  ({ className = '', ...props }, ref) => {
    const textInputClassName = `text-input ${className}`

    return (
      <div ref={ref} className={textInputClassName}>
        <input
          className='text-input__field'
          data-testid='text-input-field'
          type='text'
          {...props}
        />
      </div>
    )
  }
)

export default TextInput
