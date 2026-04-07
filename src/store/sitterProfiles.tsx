import { createContext, useContext, useState, type ReactNode } from 'react'

export interface SitterProfile {
  id: string
  firstName: string
  lastName: string
  postal: string
  age: string
  description: string
  badges: string[]
  rating: number
  registeredAt: number
}

interface SitterProfilesContextValue {
  sitterProfiles: SitterProfile[]
  registerSitterProfile: (profile: Omit<SitterProfile, 'id' | 'registeredAt'>) => void
}

const STORAGE_KEY = 'pawpy_sitter_profiles'

const SEED_PROFILES: SitterProfile[] = [
  {
    id: 'seed-sitter-1',
    firstName: 'Steve',
    lastName: 'Travail',
    postal: '75007',
    age: '55',
    description: '55 ans - VIIe. CEO chez Samsoul basé à la Défense.',
    badges: ['Pawpy lvl 1', 'ACACED'],
    rating: 4.5,
    registeredAt: Date.now() - 86400_000,
  },
  {
    id: 'seed-sitter-2',
    firstName: 'Marie',
    lastName: 'Dupont',
    postal: '75012',
    age: '32',
    description: '32 ans - XIIe. Passionnée des animaux, je promène des chiens depuis 5 ans.',
    badges: ['ACACED'],
    rating: 4.8,
    registeredAt: Date.now() - 172800_000,
  },
  {
    id: 'seed-sitter-3',
    firstName: 'Thomas',
    lastName: 'Bernard',
    postal: '75011',
    age: '28',
    description: '28 ans - XIe. Étudiant vétérinaire, disponible les week-ends.',
    badges: ['Pawpy lvl 2', 'ACACED'],
    rating: 4.2,
    registeredAt: Date.now() - 259200_000,
  },
]

function loadFromStorage(): SitterProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as SitterProfile[]
  } catch {
    // ignore
  }
  return SEED_PROFILES
}

function saveToStorage(profiles: SitterProfile[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles))
}

const SitterProfilesContext = createContext<SitterProfilesContextValue | null>(null)

export function SitterProfilesProvider({ children }: { children: ReactNode }) {
  const [sitterProfiles, setSitterProfiles] = useState<SitterProfile[]>(loadFromStorage)

  function registerSitterProfile(data: Omit<SitterProfile, 'id' | 'registeredAt'>) {
    setSitterProfiles(prev => {
      const id = crypto.randomUUID()
      const next = [{ ...data, id, registeredAt: Date.now() }, ...prev]
      saveToStorage(next)
      return next
    })
  }

  return (
    <SitterProfilesContext.Provider value={{ sitterProfiles, registerSitterProfile }}>
      {children}
    </SitterProfilesContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSitterProfiles() {
  const ctx = useContext(SitterProfilesContext)
  if (!ctx) throw new Error('useSitterProfiles must be used inside SitterProfilesProvider')
  return ctx
}
