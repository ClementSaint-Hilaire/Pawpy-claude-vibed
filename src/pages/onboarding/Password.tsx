import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/ui/BackButton'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import PageDots from '../../components/ui/PageDots'

export default function Password() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  return (
    <div className="flex flex-col h-full bg-bg-primary pt-16 pb-8 px-4 gap-6">
      <div className="flex items-center justify-between">
        <BackButton to="/onboarding/verify" />
        <PageDots total={6} current={3} />
      </div>

      <div className="flex-1 flex flex-col gap-8">
        <h1 className="text-[34px] font-semibold text-text-primary leading-[1.2] tracking-[-1.02px]">
          Pour la sécurité, créer un mot de passe sûr
        </h1>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Input
              label="Entrer un mot de passe"
              type="password"
              placeholder="*************"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <p className="text-[11px] font-normal text-text-secondary leading-[1.1]">
              7 caractères, dont au moins un spécial, une majuscule, une minuscule et un chiffre.
            </p>
          </div>
          <Input
            label="Confirmer votre mot de passe"
            type="password"
            placeholder="*************"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
          />
        </div>
      </div>

      <Button onClick={() => navigate('/onboarding/role')}>
        C'est bon pour moi
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10H16M10 4L16 10L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Button>
    </div>
  )
}
