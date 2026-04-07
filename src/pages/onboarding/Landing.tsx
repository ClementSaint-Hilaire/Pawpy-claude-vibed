import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'

const heroImage = 'https://www.figma.com/api/mcp/asset/d7456c72-814b-44fa-a445-c4b2aee5af4a'

export default function Landing() {
  const navigate = useNavigate()

  useEffect(() => {
    const role = localStorage.getItem('role')
    if (role === 'walker') navigate('/sitter/home', { replace: true })
    else if (role === 'owner') navigate('/owner/home', { replace: true })
  }, [])

  return (
    <div className="flex flex-col h-full bg-bg-primary pt-16 pb-8 px-4 gap-6">
      <h1 className="text-[34px] font-semibold text-text-primary leading-[1.2] tracking-[-1.02px]">
        L'application de dogwalking{'\n'}premium & certifiée.
      </h1>

      <div className="flex-1 flex items-center justify-center">
        <img
          src={heroImage}
          alt=""
          className="w-full max-w-[420px] object-contain"
        />
      </div>

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
