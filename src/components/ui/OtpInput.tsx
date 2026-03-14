import { useRef, type KeyboardEvent, type ClipboardEvent } from 'react'

interface OtpInputProps {
  length?: number
  value: string[]
  onChange: (val: string[]) => void
}

export default function OtpInput({ length = 5, value, onChange }: OtpInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, char: string) => {
    if (!/^\d?$/.test(char)) return
    const next = [...value]
    next[index] = char
    onChange(next)
    if (char && index < length - 1) refs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      refs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    const next = Array(length).fill('')
    text.split('').forEach((c, i) => { next[i] = c })
    onChange(next)
    const focusIndex = Math.min(text.length, length - 1)
    refs.current[focusIndex]?.focus()
  }

  return (
    <div className="flex gap-2 w-full">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={el => { refs.current[i] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ''}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className="w-full h-12 bg-bg-secondary border-[1.5px] border-stroke rounded-xl text-center text-base font-normal text-text-primary outline-none focus:border-brand transition-colors"
        />
      ))}
    </div>
  )
}
