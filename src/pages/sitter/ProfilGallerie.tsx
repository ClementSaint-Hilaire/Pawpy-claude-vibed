import { useState } from 'react'
import BackButton from '../../components/ui/BackButton'
import BottomTabBar from '../../components/sitter/BottomTabBar'
import PhotoPickerModal from '../../components/ui/PhotoPickerModal'
import { useUserProfile } from '../../store/userProfile'

const glassSecondary = 'bg-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)]'
const glassAccent = 'bg-[#04341a]/80 shadow-[0px_8px_30px_0px_rgba(4,52,26,0.2),0px_0px_4px_0px_rgba(4,52,26,0.15)]'

function PlusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 6H5H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6M19 6L18.1326 19.1305C18.0569 20.1755 17.1818 21 16.134 21H7.86603C6.81824 21 5.94309 20.1755 5.86742 19.1305L5 6H19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DeletePhotoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M3 6H5H21" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6M19 6L18.1326 19.1305C18.0569 20.1755 17.1818 21 16.134 21H7.86603C6.81824 21 5.94309 20.1755 5.86742 19.1305L5 6H19Z" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function SitterProfilGallerie() {
  const { profile, updateProfile } = useUserProfile()
  const photos = profile.galleryPhotos ?? []
  const [editMode, setEditMode] = useState(false)
  const [showPicker, setShowPicker] = useState(false)

  function addPhoto(dataUrl: string) {
    updateProfile({ galleryPhotos: [...photos, dataUrl] })
  }

  function removePhoto(index: number) {
    updateProfile({ galleryPhotos: photos.filter((_, i) => i !== index) })
  }

  return (
    <div className="flex flex-col h-full bg-bg-primary pt-[62px] pb-[127px] px-4 gap-16 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-2">
        <BackButton to="/sitter/profil" />
        <h1 className="flex-1 text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
          Galerie photos
        </h1>

        {editMode ? (
          <button
            className={`flex items-center justify-center w-12 h-12 rounded-full ${glassSecondary} text-text-primary active:opacity-70 transition-opacity`}
            onClick={() => setEditMode(false)}
          >
            <CloseIcon />
          </button>
        ) : (
          <button
            className={`flex items-center justify-center w-12 h-12 rounded-full ${glassSecondary} text-text-primary active:opacity-70 transition-opacity`}
            onClick={() => setEditMode(true)}
          >
            <TrashIcon />
          </button>
        )}

        <button
          className={`flex items-center justify-center w-12 h-12 rounded-full ${glassAccent} active:opacity-70 transition-opacity`}
          onClick={() => setShowPicker(true)}
        >
          <PlusIcon />
        </button>
      </div>

      {/* Grid */}
      {photos.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 flex-1 text-center">
          <p className="text-text-secondary text-base leading-[1.4]">
            Aucune photo pour l'instant.{'\n'}Ajoutez des photos pour enrichir votre profil !
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {photos.map((url, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden flex-shrink-0"
              style={{ width: 'calc(50% - 8px)', height: 220 }}
            >
              <img
                src={url}
                alt={`Photo ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {editMode && (
                <button
                  className={`absolute top-3 right-3 flex items-center justify-center w-10 h-10 rounded-full ${glassSecondary} active:opacity-70 transition-opacity`}
                  onClick={() => removePhoto(i)}
                >
                  <DeletePhotoIcon />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <BottomTabBar activeTab="profil" />

      {showPicker && (
        <PhotoPickerModal
          onClose={() => setShowPicker(false)}
          onPhoto={addPhoto}
        />
      )}
    </div>
  )
}
