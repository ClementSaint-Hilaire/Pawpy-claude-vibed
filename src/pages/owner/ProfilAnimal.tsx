import { useNavigate, useParams } from 'react-router-dom'
import OwnerBottomTabBar from '../../components/owner/BottomTabBar'
import BackButton from '../../components/ui/BackButton'
import { usePets } from '../../store/pets'
import { InlineField, InlineTextarea } from '../../components/ui/InlineField'

const glassStyle =
  'bg-gradient-to-r from-white/80 to-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)]'

function DotsVerticalIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="5" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="19" r="1.5" fill="currentColor" />
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export default function OwnerProfilAnimal() {
  const { animalId } = useParams<{ animalId: string }>()
  const navigate = useNavigate()
  const { pets, updatePet } = usePets()
  const pet = pets.find(p => p.id === animalId)

  if (!pet) {
    return (
      <div className="flex flex-col h-full bg-bg-primary items-center justify-center">
        <p className="text-text-secondary">Animal introuvable</p>
        <button className="mt-4 text-brand-primary" onClick={() => navigate(-1)}>
          Retour
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-bg-primary pt-[62px] pb-[127px] px-4 gap-8 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-2">
        <BackButton />
        <h1 className="flex-1 text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
          Profil
        </h1>
        <button className={`flex items-center justify-center p-3 rounded-full ${glassStyle}`}>
          <span className="text-text-primary">
            <DotsVerticalIcon />
          </span>
        </button>
      </div>

      {/* Photo */}
      <div className="flex items-end justify-center pr-8">
        <div className="w-32 h-32 rounded-full bg-brand-light flex-shrink-0 -mr-8 overflow-hidden">
          {pet.photo && (
            <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
          )}
        </div>
        <button className={`flex items-center justify-center p-3 rounded-full ${glassStyle} -mr-8 flex-shrink-0`}>
          <span className="text-text-primary">
            <CameraIcon />
          </span>
        </button>
      </div>

      {/* Ses informations */}
      <div className="flex flex-col gap-4">
        <h2 className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
          Ses informations
        </h2>
        <div className="flex flex-col w-full rounded-xl overflow-hidden bg-bg-secondary">
          <div className="border-b border-stroke/50">
            <InlineField value={pet.name} placeholder="Nom" onSave={v => updatePet(pet.id, { name: v })} />
          </div>
          <div className="border-b border-stroke/50">
            <InlineField value={pet.age} placeholder="Âge" onSave={v => updatePet(pet.id, { age: v })} isPlaceholder={!pet.age} />
          </div>
          <div>
            <InlineField value={pet.breed} placeholder="Race" onSave={v => updatePet(pet.id, { breed: v })} isPlaceholder={!pet.breed} />
          </div>
        </div>
      </div>

      {/* Informations Complémentaires */}
      <div className="flex flex-col gap-4">
        <h2 className="text-[20px] font-semibold text-text-primary leading-[1.3]">
          Informations Complémentaires
        </h2>
        <InlineTextarea
          value={pet.description}
          placeholder="Ajouter une description…"
          onSave={v => updatePet(pet.id, { description: v })}
        />
      </div>

      <OwnerBottomTabBar activeTab="profil" />
    </div>
  )
}
