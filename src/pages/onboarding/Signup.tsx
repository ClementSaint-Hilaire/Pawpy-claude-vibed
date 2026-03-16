import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/ui/BackButton'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { useUserProfile } from '../../store/userProfile'

function GoogleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
      <path d="M16.365 12.783c-.023-2.56 2.09-3.797 2.185-3.858-1.19-1.74-3.044-1.978-3.703-2.003-1.572-.16-3.074.928-3.87.928-.795 0-2.022-.906-3.32-.882-1.705.025-3.283 1-4.16 2.533-1.775 3.082-.454 7.647 1.275 10.152.843 1.222 1.848 2.59 3.172 2.54 1.277-.051 1.758-.824 3.302-.824 1.545 0 1.977.824 3.326.799 1.373-.025 2.24-1.247 3.079-2.472.968-1.414 1.367-2.783 1.39-2.854-.031-.013-2.667-1.023-2.693-4.059zM13.844 4.41c.697-.853 1.17-2.034 1.042-3.21-1.007.042-2.226.673-2.948 1.522-.647.75-1.215 1.95-1.063 3.101 1.124.087 2.27-.572 2.969-1.413z" fill="#010a05"/>
    </svg>
  )
}

export default function Signup() {
  const navigate = useNavigate()
  const { updateProfile } = useUserProfile()
  const [email, setEmail] = useState('')

  return (
    <div className="flex flex-col h-full bg-bg-primary pt-16 pb-8 px-4 gap-6">
      {/* Header */}
      <div className="flex items-center">
        <BackButton to="/onboarding" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col gap-8">
        <h1 className="text-[34px] font-semibold text-text-primary leading-[1.2] tracking-[-1.02px]">
          Inscrivez vous<br />sur Pawpy
        </h1>

        <div className="flex flex-col gap-4">
          {/* Google SSO */}
          <button className="flex items-center gap-16 px-6 py-3 bg-bg-secondary rounded-xl w-full active:opacity-70 transition-opacity">
            <GoogleIcon />
            <span className="text-base font-normal text-text-primary tracking-[-0.16px]">
              S'inscrire avec Google
            </span>
          </button>

          {/* Apple SSO */}
          <button className="flex items-center gap-16 px-6 py-3 bg-bg-secondary rounded-xl w-full active:opacity-70 transition-opacity">
            <AppleIcon />
            <span className="text-base font-normal text-text-primary tracking-[-0.16px]">
              S'inscrire avec Apple
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-stroke" />
            <span className="text-base font-medium text-text-secondary">ou</span>
            <div className="flex-1 h-px bg-stroke" />
          </div>

          {/* Email input */}
          <Input
            label="Votre adresse e-mail"
            type="email"
            placeholder="exemple@domain.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col gap-4">
        <div className="text-center text-sm text-text-secondary">
          <p>Vous avez déjà un compte ?</p>
          <p className="text-brand font-medium cursor-pointer">Connexion</p>
        </div>
        <Button onClick={() => { updateProfile({ email }); navigate('/onboarding/password') }}>
          Créer mon compte
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M10 4L16 10L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
      </div>
    </div>
  )
}
