import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'

export default function Landing() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col h-full bg-bg-primary pt-16 pb-8 px-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-[28px] font-semibold text-text-primary leading-[1.2] tracking-[-0.56px]">
            Pawpy
          </h1>
          <p className="text-base font-normal text-text-secondary leading-[1.2] tracking-[-0.16px]">
            L'application de dogwalking<br />premium & certifiée.
          </p>
        </div>
        <button
          onClick={() => navigate('/onboarding/signup')}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)] active:opacity-70 transition-opacity"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M13 17L18 12L13 7M6 12H18" stroke="#010a05" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Image zone — placeholder */}
      <div className="flex-1" />

      {/* Buttons */}
      <div className="flex flex-col gap-4">
        <Button variant="secondary" onClick={() => navigate('/onboarding/signup')}>
          Se connecter
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M10 4L16 10L10 16" stroke="#010a05" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
        <Button onClick={() => navigate('/onboarding/signup')}>
          Créer mon compte
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
      </div>
    </div>
  )
}
