import { type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export default function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-base font-normal text-text-primary leading-[1.2] tracking-[-0.16px]">
          {label}
        </label>
      )}
      <input
        className={`w-full bg-bg-secondary border-[1.5px] border-stroke rounded-xl px-3 py-3 text-base font-normal text-text-primary leading-[1.2] tracking-[-0.16px] placeholder:text-text-tertiary outline-none focus:border-brand transition-colors ${className}`}
        {...props}
      />
    </div>
  )
}
