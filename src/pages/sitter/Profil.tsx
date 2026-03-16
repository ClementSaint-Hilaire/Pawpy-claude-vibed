import { useNavigate } from 'react-router-dom'
import BottomTabBar from '../../components/sitter/BottomTabBar'

function EditIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M11 4H4C3.44772 4 3 4.44772 3 5V20C3 20.5523 3.44772 21 4 21H19C19.5523 21 20 20.5523 20 19V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.5 2.5C19.3284 1.67157 20.6716 1.67157 21.5 2.5C22.3284 3.32843 22.3284 4.67157 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

interface SettingFieldProps {
  label: string
  rightIcon?: 'chevron' | 'edit' | 'check' | 'plus'
  placeholder?: boolean
  to?: string
}

const glassStyle = 'bg-gradient-to-r from-white/80 to-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)]'

function SettingField({ label, rightIcon = 'edit', placeholder = false, to }: SettingFieldProps) {
  const navigate = useNavigate()
  return (
    <button onClick={to ? () => navigate(to) : undefined} className="flex items-center gap-2 h-12 px-4 w-full text-left">
      <span className={`flex-1 text-base leading-[1.2] tracking-[-0.16px] truncate ${placeholder ? 'text-text-tertiary' : 'text-text-primary'}`}>
        {label}
      </span>
      <span className="text-text-secondary flex-shrink-0">
        {rightIcon === 'chevron' && <ChevronRightIcon />}
        {rightIcon === 'edit' && <EditIcon />}
        {rightIcon === 'check' && <CheckIcon />}
        {rightIcon === 'plus' && <PlusIcon />}
      </span>
    </button>
  )
}

interface FieldGroupProps {
  fields: { label: string; rightIcon?: 'chevron' | 'edit' | 'check' | 'plus'; placeholder?: boolean; to?: string }[]
}

function FieldGroup({ fields }: FieldGroupProps) {
  return (
    <div className="flex flex-col w-full rounded-xl overflow-hidden bg-bg-secondary">
      {fields.map((field, i) => (
        <div key={i} className={i < fields.length - 1 ? 'border-b border-stroke/50' : ''}>
          <SettingField {...field} to={field.to} />
        </div>
      ))}
    </div>
  )
}

export default function SitterProfil() {
  return (
    <div className="flex flex-col h-full bg-bg-primary pt-[62px] pb-[127px] px-4 gap-8 overflow-y-auto">
      {/* Title */}
      <h1 className="text-[34px] font-semibold text-text-primary leading-[1.2] tracking-[-1.02px]">
        Mon profil
      </h1>

      {/* Profile photo */}
      <div className="flex items-end justify-center pr-8">
        <div className="w-32 h-32 rounded-full bg-brand-light flex-shrink-0 -mr-8" />
        <button className={`flex items-center justify-center p-3 rounded-full ${glassStyle} -mr-8 flex-shrink-0`}>
          <span className="text-text-primary"><EditIcon /></span>
        </button>
      </div>

      {/* Premium banner */}
      <div className="bg-bg-secondary rounded-lg p-3 flex items-center gap-6">
        <div className="flex-1 flex flex-col gap-2">
          <p className="text-base font-medium text-text-primary leading-[1.2]">
            Essayez Pawpy Premium gratuitement
          </p>
          <p className="text-base font-normal text-text-secondary leading-[1.2] tracking-[-0.16px]">
            1 mois offerts pour profiter du boost de votre profil à 0€ et plus encore
          </p>
        </div>
        <div className="w-[66px] h-[64px] bg-brand-light rounded-lg flex-shrink-0 flex items-center justify-center">
          <span className="text-2xl">🎁</span>
        </div>
      </div>

      {/* Wallet */}
      <FieldGroup fields={[{ label: 'Mon porte-monnaie', rightIcon: 'chevron', to: '/sitter/profil/transactions' }]} />

      {/* My info section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
          Mes informations
        </h2>
        <FieldGroup
          fields={[
            { label: 'Jeanne', rightIcon: 'edit' },
            { label: 'Darbalette', rightIcon: 'edit' },
            { label: 'XXe arrondissement', rightIcon: 'edit' },
            { label: '26 ans', rightIcon: 'edit' },
            { label: 'Description', rightIcon: 'chevron' },
          ]}
        />
        <FieldGroup
          fields={[
            { label: 'Galerie photo & vidéo', rightIcon: 'chevron' },
            { label: 'Espace communautée', rightIcon: 'chevron' },
          ]}
        />
      </div>

      {/* Certifications section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
          Certifications
        </h2>
        <FieldGroup
          fields={[
            { label: 'Certifications Pawpy', rightIcon: 'chevron' },
            { label: 'ACACED', rightIcon: 'check' },
            { label: 'Importer une certification', rightIcon: 'plus', placeholder: true },
          ]}
        />
      </div>

      <BottomTabBar activeTab="profil" />
    </div>
  )
}
