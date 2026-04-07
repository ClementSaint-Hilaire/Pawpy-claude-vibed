import { createContext, useContext, useState, type ReactNode } from 'react'

export interface Pet {
  id: string
  name: string
  age: string
  breed: string
  description: string
  photo?: string
}

interface PetsContextValue {
  pets: Pet[]
  addPet: (data: Omit<Pet, 'id'>) => void
  updatePet: (id: string, partial: Partial<Omit<Pet, 'id'>>) => void
}

const PetsContext = createContext<PetsContextValue | null>(null)
const STORAGE_KEY = 'pawpy_pets'

const DEFAULT_PETS: Pet[] = [
  { id: 'marie', name: 'Marie', age: '2 ans', breed: 'Golden Retriever', description: '' },
  { id: 'toulonze', name: 'Toulonze', age: '4 ans', breed: 'Border Collie', description: '' },
  {
    id: 'berlioz',
    name: 'Berlioz',
    age: '6 mois',
    breed: 'Labrador',
    description:
      'Joueuse et capricieux de nature, la malheureuse est atteint de gingivite.\n\nElle à donc ses propres croquettes et un brossage de dents après chaque repas est obligatoire.',
  },
]

function loadFromStorage(): Pet[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Pet[]
  } catch {
    // ignore
  }
  return DEFAULT_PETS
}

function saveToStorage(pets: Pet[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pets))
}

export function PetsProvider({ children }: { children: ReactNode }) {
  const [pets, setPets] = useState<Pet[]>(loadFromStorage)

  function addPet(data: Omit<Pet, 'id'>) {
    setPets(prev => {
      const next = [...prev, { ...data, id: crypto.randomUUID() }]
      saveToStorage(next)
      return next
    })
  }

  function updatePet(id: string, partial: Partial<Omit<Pet, 'id'>>) {
    setPets(prev => {
      const next = prev.map(p => (p.id === id ? { ...p, ...partial } : p))
      saveToStorage(next)
      return next
    })
  }

  return (
    <PetsContext.Provider value={{ pets, addPet, updatePet }}>
      {children}
    </PetsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePets() {
  const ctx = useContext(PetsContext)
  if (!ctx) throw new Error('usePets must be used inside PetsProvider')
  return ctx
}
