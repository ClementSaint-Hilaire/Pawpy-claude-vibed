import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'

export default function Splash() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col h-full bg-bg-primary pt-16 pb-8 px-4">
      <div className="flex-1 flex flex-col items-start gap-1">
        <p className="text-base font-normal text-text-primary leading-[1.2] tracking-[-0.16px] w-full text-center">
          Bienvenu sur
        </p>
        <h1 className="text-[64px] font-semibold text-text-primary leading-[1.2] tracking-[-1.92px] w-full text-center">
          Pawpy
        </h1>
      </div>
      <Button onClick={() => navigate('/onboarding')}>
        Accéder
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4L10 16M10 16L4 10M10 16L16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Button>
    </div>
  )
}
