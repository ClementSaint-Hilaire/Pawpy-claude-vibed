import BackButton from '../../components/ui/BackButton'
import BottomTabBar from '../../components/sitter/BottomTabBar'

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M9 1.5L11.163 6.27L16.5 7.035L12.75 10.68L13.725 16L9 13.5L4.275 16L5.25 10.68L1.5 7.035L6.837 6.27L9 1.5Z"
        fill="#F4B400"
        stroke="#F4B400"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CertBadgePawpy({ level }: { level: 'P1' | 'P2' }) {
  const color = level === 'P1' ? '#7B5E3A' : '#8B8B8B'
  return (
    <div
      className="flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0"
      style={{ background: color }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 1.5L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5L6 1.5Z" fill="white" strokeWidth="0.5" stroke="white" />
      </svg>
    </div>
  )
}

function CertBadgeCheck({ color }: { color: string }) {
  return (
    <div
      className="flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0"
      style={{ background: color }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

const REVIEWS = [
  {
    id: 1,
    name: 'Élizabeth Q.',
    date: 'Il y a 1 j',
    rating: 4.5,
    text: 'Merci pour votre professionnalisme et votre attention. Notre compagnon a été parfaitement choyé, et vos nouvelles régulières nous ont apporté une vraie sérénité. Nous avons pleinement confiance en vous et serons ravis de vous recontacter pour une prochaine garde.',
    initials: 'ÉQ',
    avatarColor: '#C2956B',
  },
  {
    id: 2,
    name: 'Arthur M.',
    date: 'Il y a 4 j',
    rating: 4.5,
    text: 'Merci pour votre soin et votre fiabilité. Notre compagnon est rentré serein et bien choyé, et vos comptes rendus détaillés nous ont vraiment rassurés. Votre professionnalisme et votre gentillesse font toute la différence.',
    initials: 'AM',
    avatarColor: '#7B9B8A',
  },
  {
    id: 3,
    name: 'Marie L.',
    date: 'Il y a 1 sem',
    rating: 5,
    text: 'Excellente expérience, je recommande vivement. Notre chien était en de bonnes mains et nous avons pu profiter de nos vacances l\'esprit tranquille.',
    initials: 'ML',
    avatarColor: '#9B7BA8',
  },
]

function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  return (
    <div className="bg-bg-secondary rounded-2xl p-4 flex flex-col gap-4 flex-shrink-0 w-[345px]">
      {/* Header */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div
          className="w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center"
          style={{ background: review.avatarColor }}
        >
          <span className="text-white font-semibold text-base">{review.initials}</span>
        </div>
        {/* Name + rating */}
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          <div className="flex items-center gap-2">
            <span className="flex-1 text-base font-semibold text-text-primary leading-[1.2] truncate">
              {review.name}
            </span>
            <span className="text-[11px] font-normal text-text-secondary leading-[1.1] flex-shrink-0">
              {review.date}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <StarIcon />
            <span className="text-base font-normal text-text-primary leading-[1.2] tracking-[-0.16px]">
              {review.rating.toString().replace('.', ',')}
            </span>
          </div>
        </div>
      </div>
      {/* Text */}
      <p className="text-base font-normal text-text-secondary leading-[1.2] tracking-[-0.16px]">
        {review.text}
      </p>
    </div>
  )
}

export default function SitterCommunaute() {
  return (
    <div className="flex flex-col h-full bg-bg-primary pt-[62px] pb-[127px] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 mb-8">
        <BackButton />
        <h1 className="flex-1 text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
          Communautée
        </h1>
      </div>

      <div className="flex flex-col gap-8 px-4">
        {/* Statistiques */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
            Statistiques
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-1">
              <span className="flex-1 text-base font-normal text-text-secondary leading-[1.2] tracking-[-0.16px]">
                Notes globale :
              </span>
              <StarIcon />
              <span className="text-base font-normal text-text-primary leading-[1.2] tracking-[-0.16px] text-center">
                4,5
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="flex-1 text-base font-normal text-text-secondary leading-[1.2] tracking-[-0.16px]">
                Nombre de promenades :
              </span>
              <span className="text-base font-normal text-text-primary leading-[1.2] tracking-[-0.16px] text-center">
                350
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="flex-1 text-base font-normal text-text-secondary leading-[1.2] tracking-[-0.16px]">
                Expériences sur Pawpy :
              </span>
              <span className="text-base font-normal text-text-primary leading-[1.2] tracking-[-0.16px] text-center">
                2 ans
              </span>
            </div>
          </div>
        </div>

        {/* Certifications affichées */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px]">
            Certifications affichées
          </h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-bg-secondary px-3 py-3 rounded-full">
              <CertBadgePawpy level="P1" />
              <span className="text-base font-semibold text-text-primary leading-[1.2]">
                Pawpy P1
              </span>
            </div>
            <div className="flex items-center gap-2 bg-bg-secondary px-3 py-3 rounded-full">
              <CertBadgePawpy level="P2" />
              <span className="text-base font-semibold text-text-primary leading-[1.2]">
                Pawpy P2
              </span>
            </div>
            <div className="flex items-center gap-2 bg-bg-secondary px-3 py-3 rounded-full">
              <CertBadgeCheck color="#04341A" />
              <span className="text-base font-semibold text-text-primary leading-[1.2]">
                ACACED
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Avis */}
      <div className="flex flex-col gap-4 mt-8">
        <h2 className="text-[22px] font-semibold text-text-primary leading-[1.2] tracking-[-0.44px] px-4">
          Avis
        </h2>
        {/* Horizontal scroll carousel */}
        <div className="flex gap-4 overflow-x-auto pl-4 pr-4 pb-2 no-scrollbar">
          {REVIEWS.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>

      <BottomTabBar activeTab="profil" />
    </div>
  )
}
