import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface Annonce {
  id: string
  userName: string
  location: string
  title: string
  description: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  price: string
  petIds: string[]
  createdAt: number
}

interface AnnoncesContextValue {
  annonces: Annonce[]
  addAnnonce: (a: Omit<Annonce, 'id' | 'createdAt'>) => void
}

const AnnoncesContext = createContext<AnnoncesContextValue | null>(null)
const STORAGE_KEY = 'pawpy_annonces'

const INITIAL_ANNONCES: Annonce[] = [
  {
    id: 'seed-1',
    userName: 'Elisabeth Quilomaitre',
    location: 'Paris VIIIe',
    title: 'Promenade tous les mardis',
    description: 'Chien plus proche du nounours et tortue capricieuse, gardés à domicile avec attention, jeux et updates photo régulière.',
    startDate: '2025-10-24',
    startTime: '17:00',
    endDate: '2025-10-24',
    endTime: '00:00',
    price: '30.00',
    petIds: [],
    createdAt: Date.now() - 3600_000,
  },
]

function loadFromStorage(): Annonce[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Annonce[]
  } catch {
    // ignore parse errors
  }
  return INITIAL_ANNONCES
}

function saveToStorage(annonces: Annonce[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(annonces))
}

export function AnnoncesProvider({ children }: { children: ReactNode }) {
  const [annonces, setAnnonces] = useState<Annonce[]>(loadFromStorage)

  // Sync changes made in other tabs
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setAnnonces(JSON.parse(e.newValue) as Annonce[])
        } catch {
          // ignore parse errors
        }
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  function addAnnonce(data: Omit<Annonce, 'id' | 'createdAt'>) {
    setAnnonces(prev => {
      const next = [
        { ...data, id: crypto.randomUUID(), createdAt: Date.now() },
        ...prev,
      ]
      saveToStorage(next)
      return next
    })
  }

  return (
    <AnnoncesContext.Provider value={{ annonces, addAnnonce }}>
      {children}
    </AnnoncesContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAnnonces() {
  const ctx = useContext(AnnoncesContext)
  if (!ctx) throw new Error('useAnnonces must be used inside AnnoncesProvider')
  return ctx
}
