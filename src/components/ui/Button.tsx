import { type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'light'
  fullWidth?: boolean
  children: React.ReactNode
}

export default function Button({ variant = 'primary', fullWidth = true, children, className = '', ...props }: ButtonProps) {
  const base = 'flex items-center justify-center gap-2 px-4 py-4 rounded-full font-medium text-base leading-[1.2] tracking-[0] transition-opacity active:opacity-80 cursor-pointer'

  const variants = {
    primary: 'bg-brand text-bg-primary shadow-[0px_8px_30px_0px_rgba(4,52,26,0.2),0px_0px_4px_0px_rgba(4,52,26,0.15)]',
    secondary: 'bg-white/80 text-text-primary shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)]',
    light: 'bg-brand-light text-text-primary',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
