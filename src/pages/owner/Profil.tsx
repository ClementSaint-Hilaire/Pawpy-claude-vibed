import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OwnerBottomTabBar from '../../components/owner/BottomTabBar'
import { useUserProfile } from '../../store/userProfile'
import { usePets } from '../../store/pets'
import { InlineField } from '../../components/ui/InlineField'
import NouvelAnimalModal from '../../components/owner/NouvelAnimalModal'
import PhotoPickerModal from '../../components/ui/PhotoPickerModal'

function ChevronRightIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

function SwitchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 7h14M3 7l3-3M3 7l3 3M17 13H3M17 13l-3-3M17 13l-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function EditIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M11 4H4C3.44772 4 3 4.44772 3 5V20C3 20.5523 3.44772 21 4 21H19C19.5523 21 20 20.5523 20 19V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.5 2.5C19.3284 1.67157 20.6716 1.67157 21.5 2.5C22.3284 3.32843 22.3284 4.67157 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

const glassSecondary = 'bg-gradient-to-r from-white/80 to-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)]'
const glassAccent = 'bg-gradient-to-r from-[rgba(4,52,26,0.8)] to-[rgba(4,52,26,0.8)] shadow-[0px_8px_30px_0px_rgba(4,52,26,0.2),0px_0px_4px_0px_rgba(4,52,26,0.15)]'

function NavField({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button className="flex items-center gap-2 h-12 px-4 w-full text-left" onClick={onClick}>
      <span className="flex-1 text-base leading-[1.2] tracking-[-0.16px] truncate text-text-primary">
        {label}
      </span>
      <span className="text-text-secondary flex-shrink-0"><ChevronRightIcon /></span>
    </button>
  )
}

function NavFieldGroup({ fields }: { fields: { label: string; onClick?: () => void }[] }) {
  return (
    <div className="flex flex-col w-full rounded-xl overflow-hidden bg-bg-secondary">
      {fields.map((f, i) => (
        <div key={i} className={i < fields.length - 1 ? 'border-b border-stroke/50' : ''}>
          <NavField label={f.label} onClick={f.onClick} />
        </div>
      ))}
    </div>
  )
}

function AnimalField({ label, photoUrl, onClick }: { label: string; photoUrl?: string; onClick?: () => void }) {
  return (
    <button className="flex items-center gap-2 h-12 px-4 w-full text-left" onClick={onClick}>
      <div className="flex items-center justify-end w-[27px] flex-shrink-0">
        {photoUrl
          ? <img src={photoUrl} alt={label} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
          : <div className="w-8 h-8 rounded-full bg-brand-light flex-shrink-0" />
        }
      </div>
      <span className="flex-1 text-base leading-[1.2] tracking-[-0.16px] truncate text-text-primary ml-2">
        {label}
      </span>
      <span className="text-text-secondary flex-shrink-0"><ChevronRightIcon /></span>
    </button>
  )
}

export default function OwnerProfil() {
  const navigate = useNavigate()
  const { profile, updateProfile } = useUserProfile()
  const { pets } = usePets()
  const [showNouvelAnimal, setShowNouvelAnimal] = useState(false)
  const [showPhotoPicker, setShowPhotoPicker] = useState(false)
  const [premiumVisible, setPremiumVisible] = useState(true)

  return (
    <div className="flex flex-col h-full bg-bg-primary pt-[62px] pb-[127px] px-4 gap-8 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-8">
        <h1 className="flex-1 text-[34px] font-semibold text-text-primary leading-[1.2] tracking-[-1.02px]">
          Profil
        </h1>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            className={`flex items-center justify-center p-3 rounded-full ${glassSecondary}`}
            onClick={() => navigate('/role-selection')}
          >
            <span className="text-text-primary"><SwitchIcon /></span>
          </button>
          <button
            className={`flex items-center justify-center p-3 rounded-full ${glassAccent}`}
            onClick={() => setShowNouvelAnimal(true)}
          >
            <span className="text-white"><PlusIcon /></span>
          </button>
        </div>
      </div>

      {/* Profile photo */}
      <div className="flex items-end justify-center pr-8">
        {profile.photoUrl
          ? <img src={profile.photoUrl} alt="Photo de profil" className="w-32 h-32 rounded-full object-cover flex-shrink-0 -mr-8" />
          : <div className="w-32 h-32 rounded-full bg-brand-light flex-shrink-0 -mr-8" />
        }
        <button
          className={`flex items-center justify-center p-3 rounded-full ${glassSecondary} -mr-8 flex-shrink-0`}
          onClick={() => setShowPhotoPicker(true)}
        >
          <span className="text-text-primary"><EditIcon /></span>
        </button>
      </div>

      {/* Premium banner */}
      {premiumVisible && (
        <div className="flex items-start gap-4 bg-[#fce9f9] rounded-2xl px-3 py-4">
          <div className="w-[52px] h-[52px] rounded-xl bg-[#f0d0ec] flex-shrink-0 flex items-center justify-center">
            <span className="text-2xl">🎁</span>
          </div>
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <p className="text-base font-semibold leading-[1.2] text-text-primary">
              Essayez Pawpy Premium gratuitement
            </p>
            <p className="text-[11px] leading-[1.1] text-text-tertiary">
              1 mois offerts pour profiter du boost de votre profil à 0€ et plus encore
            </p>
          </div>
          <button
            className="flex-shrink-0 text-text-secondary mt-0.5"
            onClick={() => setPremiumVisible(false)}
          >
            <CloseIcon />
          </button>
        </div>
      )}

      {/* Mes animaux */}
      <div className="flex flex-col gap-4">
        <h2 className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
          Mes animaux
        </h2>
        <div className="flex flex-col w-full rounded-xl overflow-hidden bg-bg-secondary">
          {pets.map((pet, i) => (
            <div key={pet.id} className={i < pets.length - 1 ? 'border-b border-stroke/50' : ''}>
              <AnimalField label={pet.name} onClick={() => navigate(`/owner/profil/animal/${pet.id}`)} />
            </div>
          ))}
        </div>
      </div>

      {/* Mes informations */}
      <div className="flex flex-col gap-4">
        <h2 className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
          Mes informations
        </h2>
        <div className="flex flex-col w-full rounded-xl overflow-hidden bg-bg-secondary">
          <div className="border-b border-stroke/50">
            <InlineField value={profile.firstName} placeholder="Prénom" onSave={v => updateProfile({ firstName: v })} isPlaceholder={!profile.firstName} />
          </div>
          <div className="border-b border-stroke/50">
            <InlineField value={profile.lastName} placeholder="Nom" onSave={v => updateProfile({ lastName: v })} isPlaceholder={!profile.lastName} />
          </div>
          <div className="border-b border-stroke/50">
            <InlineField value={profile.postal} placeholder="Localisation" onSave={v => updateProfile({ postal: v })} isPlaceholder={!profile.postal} />
          </div>
          <div className="border-b border-stroke/50">
            <InlineField value={profile.age} placeholder="Âge" onSave={v => updateProfile({ age: v })} isPlaceholder={!profile.age} />
          </div>
          <NavField label="Description" onClick={() => navigate('/owner/profil/description')} />
        </div>

        <NavFieldGroup
          fields={[
            { label: 'Favoris', onClick: () => navigate('/owner/favoris') },
          ]}
        />

        <NavFieldGroup
          fields={[
            { label: 'Galerie photo & vidéo' },
            { label: 'Historique des transactions', onClick: () => navigate('/owner/profil/transactions') },
            { label: 'Espace communautée' },
          ]}
        />
      </div>

      <OwnerBottomTabBar activeTab="profil" />

      {showNouvelAnimal && (
        <NouvelAnimalModal onClose={() => setShowNouvelAnimal(false)} />
      )}
      {showPhotoPicker && (
        <PhotoPickerModal
          onClose={() => setShowPhotoPicker(false)}
          onPhoto={dataUrl => updateProfile({ photoUrl: dataUrl })}
        />
      )}
    </div>
  )
}
