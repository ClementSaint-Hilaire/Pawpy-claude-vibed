import { useNavigate } from 'react-router-dom'
import OwnerBottomTabBar from '../../components/owner/BottomTabBar'
import { useUserProfile } from '../../store/userProfile'

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

function DotsVerticalIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="5" r="1.5" fill="currentColor"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
      <circle cx="12" cy="19" r="1.5" fill="currentColor"/>
    </svg>
  )
}

const glassStyle = 'bg-gradient-to-r from-white/80 to-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)]'

interface SettingFieldProps {
  label: string
  rightIcon?: 'chevron' | 'edit'
  leftAvatar?: boolean
  onClick?: () => void
}

function SettingField({ label, rightIcon = 'edit', leftAvatar = false, onClick }: SettingFieldProps) {
  return (
    <button className="flex items-center gap-2 h-12 px-4 w-full text-left" onClick={onClick}>
      {leftAvatar && (
        <div className="flex items-center justify-end w-[27px] flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-brand-light flex-shrink-0" />
        </div>
      )}
      <span className="flex-1 text-base leading-[1.2] tracking-[-0.16px] truncate text-text-primary">
        {label}
      </span>
      <span className="text-text-secondary flex-shrink-0">
        {rightIcon === 'chevron' && <ChevronRightIcon />}
        {rightIcon === 'edit' && <EditIcon />}
      </span>
    </button>
  )
}

interface FieldGroupProps {
  fields: { label: string; rightIcon?: 'chevron' | 'edit'; leftAvatar?: boolean; onClick?: () => void }[]
}

function FieldGroup({ fields }: FieldGroupProps) {
  return (
    <div className="flex flex-col w-full rounded-xl overflow-hidden bg-bg-secondary">
      {fields.map((field, i) => (
        <div key={i} className={i < fields.length - 1 ? 'border-b border-stroke/50' : ''}>
          <SettingField key={i} {...field} />
        </div>
      ))}
    </div>
  )
}

export default function OwnerProfil() {
  const navigate = useNavigate()
  const { profile } = useUserProfile()
  const firstName = profile.firstName || 'Prénom'
  const lastName = profile.lastName || 'Nom'
  const postal = profile.postal || 'Localisation'

  return (
    <div className="flex flex-col h-full bg-bg-primary pt-[62px] pb-[127px] px-4 gap-8 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-8">
        <h1 className="flex-1 text-[34px] font-semibold text-text-primary leading-[1.2] tracking-[-1.02px]">
          Profil
        </h1>
        <button className={`flex items-center justify-center p-3 rounded-full flex-shrink-0 ${glassStyle}`}>
          <span className="text-text-primary"><DotsVerticalIcon /></span>
        </button>
      </div>

      {/* Profile photo */}
      <div className="flex items-end justify-center pr-8">
        <div className="w-32 h-32 rounded-full bg-brand-light flex-shrink-0 -mr-8" />
        <button className={`flex items-center justify-center p-3 rounded-full ${glassStyle} -mr-8 flex-shrink-0`}>
          <span className="text-text-primary"><EditIcon /></span>
        </button>
      </div>

      {/* Mes animaux */}
      <div className="flex flex-col gap-4">
        <h2 className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
          Mes animaux
        </h2>
        <FieldGroup
          fields={[
            { label: 'Marie', rightIcon: 'chevron', leftAvatar: true },
            { label: 'Toulonze', rightIcon: 'chevron', leftAvatar: true },
            { label: 'Berlioz', rightIcon: 'chevron', leftAvatar: true },
          ]}
        />
      </div>

      {/* Mes informations */}
      <div className="flex flex-col gap-4">
        <h2 className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
          Mes informations
        </h2>
        <FieldGroup
          fields={[
            { label: firstName, rightIcon: 'edit' },
            { label: lastName, rightIcon: 'edit' },
            { label: postal, rightIcon: 'edit' },
            { label: 'Âge', rightIcon: 'edit' },
            { label: 'Description', rightIcon: 'chevron' },
          ]}
        />
        <FieldGroup
          fields={[
            { label: 'Galerie photo & vidéo', rightIcon: 'chevron' },
            { label: 'Historique des transactions', rightIcon: 'chevron', onClick: () => navigate('/owner/profil/transactions') },
            { label: 'Espace communautée', rightIcon: 'chevron' },
          ]}
        />
      </div>

      <OwnerBottomTabBar activeTab="profil" />
    </div>
  )
}
