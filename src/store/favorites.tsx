import { createContext, useContext, useState, type ReactNode } from 'react'

interface FavoritesContextValue {
  favoriteSitterIds: string[]
  favoriteAnnonceIds: string[]
  toggleFavoriteSitter: (id: string) => void
  toggleFavoriteAnnonce: (id: string) => void
  isFavoriteSitter: (id: string) => boolean
  isFavoriteAnnonce: (id: string) => boolean
}

const STORAGE_KEY = 'pawpy_favorites'

function loadFromStorage(): { sitters: string[]; annonces: string[] } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore
  }
  return { sitters: [], annonces: [] }
}

function saveToStorage(sitters: string[], annonces: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ sitters, annonces }))
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const initial = loadFromStorage()
  const [favoriteSitterIds, setFavoriteSitterIds] = useState<string[]>(initial.sitters)
  const [favoriteAnnonceIds, setFavoriteAnnonceIds] = useState<string[]>(initial.annonces)

  function toggleFavoriteSitter(id: string) {
    setFavoriteSitterIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      saveToStorage(next, favoriteAnnonceIds)
      return next
    })
  }

  function toggleFavoriteAnnonce(id: string) {
    setFavoriteAnnonceIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      saveToStorage(favoriteSitterIds, next)
      return next
    })
  }

  function isFavoriteSitter(id: string) {
    return favoriteSitterIds.includes(id)
  }

  function isFavoriteAnnonce(id: string) {
    return favoriteAnnonceIds.includes(id)
  }

  return (
    <FavoritesContext.Provider value={{
      favoriteSitterIds,
      favoriteAnnonceIds,
      toggleFavoriteSitter,
      toggleFavoriteAnnonce,
      isFavoriteSitter,
      isFavoriteAnnonce,
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used inside FavoritesProvider')
  return ctx
}
