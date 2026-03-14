import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/ui/BackButton'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import PageDots from '../../components/ui/PageDots'

export default function Profile() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [postal, setPostal] = useState('')

  return (
    <div className="flex flex-col h-full bg-bg-primary pt-16 pb-8 px-4 gap-6">
      <div className="flex items-center justify-between">
        <BackButton to="/onboarding/role" />
        <PageDots total={5} current={3} />
      </div>

      <div className="flex-1 flex flex-col gap-8">
        <h1 className="text-[34px] font-semibold text-text-primary leading-[1.2] tracking-[-1.02px]">
          Parlez-nous de vous
        </h1>

        <div className="flex flex-col gap-6">
          <Input
            label="Prénom"
            placeholder="Steve"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <Input
            label="Nom"
            placeholder="Travail"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <Input
            label="Code postal"
            placeholder="75000"
            type="text"
            inputMode="numeric"
            value={postal}
            onChange={e => setPostal(e.target.value)}
          />
        </div>
      </div>

      <Button onClick={() => navigate('/onboarding/verify')}>
        Étape suivante
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10H16M10 4L16 10L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Button>
    </div>
  )
}
