import './Button.style.scss'

type ButtonProps = {
  className?: string
  label?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  children?: React.ReactNode
}

const Button = ({ className = '', label, onClick, children }: ButtonProps) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {label || children || ''}
    </button>
  )
}

export default Button
