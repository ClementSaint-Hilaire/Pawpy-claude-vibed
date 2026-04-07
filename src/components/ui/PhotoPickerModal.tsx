import { useRef } from 'react'

const glassStyle = 'bg-gradient-to-r from-white/80 to-white/80 shadow-[0px_8px_30px_0px_rgba(214,213,212,0.4),0px_0px_4px_0px_rgba(214,213,212,0.3)]'

function CameraIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

function GalleryIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

interface Props {
  onClose: () => void
  onPhoto: (dataUrl: string) => void
}

export default function PhotoPickerModal({ onClose, onPhoto }: Props) {
  const cameraRef = useRef<HTMLInputElement>(null)
  const galleryRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File | null | undefined) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = e => {
      const result = e.target?.result
      if (typeof result === 'string') {
        onPhoto(result)
        onClose()
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30" />
      <div
        className={`relative w-full max-w-[300px] mx-4 rounded-3xl ${glassStyle} flex flex-col py-3`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center px-4 pb-2 border-b border-stroke/30">
          <span className="flex-1 text-base font-semibold text-text-primary">Photo de profil</span>
          <button className="p-2 text-text-secondary" onClick={onClose}>
            <XIcon />
          </button>
        </div>

        <button
          className="flex items-center gap-4 px-4 py-4 text-text-primary text-base leading-[1.2] tracking-[-0.16px] text-left"
          onClick={() => cameraRef.current?.click()}
        >
          <span className="flex-shrink-0"><CameraIcon /></span>
          Prendre une photo
        </button>

        <div className="border-t border-stroke/30" />

        <button
          className="flex items-center gap-4 px-4 py-4 text-text-primary text-base leading-[1.2] tracking-[-0.16px] text-left"
          onClick={() => galleryRef.current?.click()}
        >
          <span className="flex-shrink-0"><GalleryIcon /></span>
          Choisir dans la galerie
        </button>

        {/* Hidden file inputs */}
        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="user"
          className="hidden"
          onChange={e => handleFile(e.target.files?.[0])}
        />
        <input
          ref={galleryRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => handleFile(e.target.files?.[0])}
        />
      </div>
    </div>
  )
}
