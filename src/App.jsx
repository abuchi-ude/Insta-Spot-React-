import Header from "./header";
import DisplayProfile from "./profile";
import DisplayCards from "./gallery";
import Footer from "./footer";
 import { cards, saveCards, loadCards, saveProfile, loadProfile} from "./data";
 import { ProfileData } from "./data";
import { useState } from "react";
import { useEffect } from "react";
import ImageModal from "./modals";
import { Modal } from "./modals";
import NewPostModalContent from "./new-post";
import EditProfileModalContent from "./edit-profile";


function App(){
  // hooks for gallery
  const [Cards, setCards] = useState(() => {
    const stored = loadCards();
    return stored && stored.length > 0 ? stored : cards;});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {saveCards(Cards);}, [Cards]); // Save cards to localStorage whenever they change
  // hooks for profile
   const [profileData, setProfileData] = useState(() => {
    const stored = loadProfile();
    return stored ? stored : ProfileData;
   });
  const [ProfileModal, setProfileModal] = useState(false);
  const [PostModal, setPostModal] = useState(false);

  useEffect(() => {
  saveProfile(profileData);
}, [profileData]);

  // Handlers for opening and closing modals
  const handleEdit = () => setProfileModal(true);
  const CloseEditProfile = () => setProfileModal(false);

  const handlePost = () => setPostModal(true);
  const handleCloseNewPostModal = () => setPostModal(false);

  // Submission handler for New Post
  const handleNewPostSubmit = (postData) => {
    // In a real app, you'd send `postData` to a backend to create a new post
      setCards((prevCards) => [postData, ...prevCards]);

    console.log("Creating new post:", postData);
    // After submitting, you might want to refresh a list of posts or show a success message
    handleCloseNewPostModal();
  };
    //Submission handler for Edit Profile
  const handleEditProfileSubmit = (updatedData) => {
    // In a real app, you'd send `updatedData` to a backend or update global state
    console.log("Saving profile changes...", updatedData);
    setProfileData(updatedData); // Update the state in the parent component
    CloseEditProfile();
  };

  // function for new post modal
  
     
  // Functions for gallery
  const handleLoveIcon = (id) => {
      setCards((Cards) =>
        Cards.map((card) =>
          card.id === id ? { ...card, liked: !card.liked } : card
        )
      );
    };
    const openModal = (card) => {
      setSelectedCard(card);
      setIsModalOpen(true);
    };
    const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  // Functions for profile

  return (
    <div className="App">
      <Header />
<DisplayProfile profileData={profileData} handleEdit={handleEdit} handlePost={handlePost} />
      <Modal
        show={ProfileModal}
        onClose={CloseEditProfile}
        title="Edit Profile"
      >
        <EditProfileModalContent
          ProfileData={profileData}
          // setProfileData={setProfileData} // Pass setProfileData to allow internal state changes
          onClose={CloseEditProfile}
          onSubmit={handleEditProfileSubmit}
        />
      </Modal>

      {/* New Post Modal */}
      <Modal
        show={PostModal}
        onClose={handleCloseNewPostModal}
        title="Create New Post"
      >
        <NewPostModalContent
          onClose={handleCloseNewPostModal}
          onSubmit={handleNewPostSubmit}
        />
      </Modal>
      <DisplayCards cards = {Cards} openModal = {openModal} handleLoveIcon = {handleLoveIcon} />
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        cardData={selectedCard} />
      <Footer />
    </div>
  );
}
export default App;