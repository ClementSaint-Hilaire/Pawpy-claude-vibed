import { useNavigate } from 'react-router-dom'

interface BackButtonProps {
  to?: string
}

export default function BackButton({ to }: BackButtonProps) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => to ? navigate(to) : navigate(-1)}
      className="flex items-center justify-center w-12 h-12 rounded-full bg-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)] active:opacity-70 transition-opacity"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15 18L9 12L15 6" stroke="#010a05" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}
