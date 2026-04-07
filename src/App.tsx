import { Routes, Route, Navigate } from 'react-router-dom'
import { AnnoncesProvider } from './store/annonces'
import { ConversationsProvider } from './store/conversations'
import { UserProfileProvider } from './store/userProfile'
import { PetsProvider } from './store/pets'
import { SitterProfilesProvider } from './store/sitterProfiles'
import { FavoritesProvider } from './store/favorites'
import Splash from './pages/onboarding/Splash'
import Landing from './pages/onboarding/Landing'
import Signup from './pages/onboarding/Signup'
import Password from './pages/onboarding/Password'
import RoleSelection from './pages/onboarding/RoleSelection'
import Profile from './pages/onboarding/Profile'
import Verify from './pages/onboarding/Verify'
import Certification from './pages/onboarding/Certification'
import OwnerCertificationInfo from './pages/onboarding/OwnerCertificationInfo'
import SitterHome from './pages/sitter/Home'
import SitterProfil from './pages/sitter/Profil'
import SitterMessagerie from './pages/sitter/Messagerie'
import SitterRecherche from './pages/sitter/Recherche'
import SitterMessagerieConversation from './pages/sitter/MessagerieConversation'
import SitterProfilTransactions from './pages/sitter/ProfilTransactions'
import SitterRechercheAnnonce from './pages/sitter/RechercheAnnonce'
import SitterCommunaute from './pages/sitter/Communaute'
import SitterProfilDescription from './pages/sitter/ProfilDescription'
import SitterProfilGallerie from './pages/sitter/ProfilGallerie'
import OwnerHome from './pages/owner/Home'
import OwnerProfil from './pages/owner/Profil'
import OwnerMessagerie from './pages/owner/Messagerie'
import OwnerRecherche from './pages/owner/Recherche'
import OwnerMessagerieConversation from './pages/owner/MessagerieConversation'
import OwnerProfilTransactions from './pages/owner/ProfilTransactions'
import OwnerProfilAnimal from './pages/owner/ProfilAnimal'
import OwnerRechercheProfil from './pages/owner/RechercheProfil'
import SitterMap from './pages/sitter/Map'
import OwnerMap from './pages/owner/Map'
import OwnerFavoris from './pages/owner/Favoris'
import SitterFavoris from './pages/sitter/Favoris'

function App() {
  return (
    <UserProfileProvider>
    <PetsProvider>
    <SitterProfilesProvider>
    <FavoritesProvider>
    <AnnoncesProvider>
    <ConversationsProvider>
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="w-[393px] h-[852px] bg-bg-primary relative overflow-hidden rounded-[40px]">
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/onboarding" element={<Landing />} />
          <Route path="/onboarding/signup" element={<Signup />} />
          <Route path="/onboarding/password" element={<Password />} />
          <Route path="/onboarding/role" element={<RoleSelection />} />
          <Route path="/onboarding/profile" element={<Profile />} />
          <Route path="/onboarding/verify" element={<Verify />} />
          <Route path="/onboarding/certification" element={<Certification />} />
          <Route path="/onboarding/owner-certification-info" element={<OwnerCertificationInfo />} />
          <Route path="/sitter/home" element={<SitterHome />} />
          <Route path="/sitter/profil" element={<SitterProfil />} />
          <Route path="/sitter/messagerie" element={<SitterMessagerie />} />
          <Route path="/sitter/messagerie/:id" element={<SitterMessagerieConversation />} />
          <Route path="/sitter/recherche" element={<SitterRecherche />} />
          <Route path="/sitter/recherche/:annonceId" element={<SitterRechercheAnnonce />} />
          <Route path="/sitter/profil/transactions" element={<SitterProfilTransactions />} />
          <Route path="/sitter/profil/communaute" element={<SitterCommunaute />} />
          <Route path="/sitter/profil/description" element={<SitterProfilDescription />} />
          <Route path="/sitter/profil/gallerie" element={<SitterProfilGallerie />} />
          <Route path="/owner/home" element={<OwnerHome />} />
          <Route path="/owner/profil" element={<OwnerProfil />} />
          <Route path="/owner/messagerie" element={<OwnerMessagerie />} />
          <Route path="/owner/messagerie/:id" element={<OwnerMessagerieConversation />} />
          <Route path="/owner/recherche" element={<OwnerRecherche />} />
          <Route path="/owner/recherche/:sitterId" element={<OwnerRechercheProfil />} />
          <Route path="/owner/profil/transactions" element={<OwnerProfilTransactions />} />
          <Route path="/owner/profil/animal/:animalId" element={<OwnerProfilAnimal />} />
          <Route path="/sitter/map" element={<SitterMap />} />
          <Route path="/owner/map" element={<OwnerMap />} />
          <Route path="/owner/favoris" element={<OwnerFavoris />} />
          <Route path="/sitter/favoris" element={<SitterFavoris />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
    </ConversationsProvider>
    </AnnoncesProvider>
    </FavoritesProvider>
    </SitterProfilesProvider>
    </PetsProvider>
    </UserProfileProvider>
  )
}

export default App
