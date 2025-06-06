 import './App.css'
 import './index.css'
// import { loadProfile, saveProfile } from './data'
// import { useState, useEffect } from 'react';


// function Profile() {
//     //   const { name = 'Bessie Coleman', bio = 'Bessie Coleman was the first African American', jobTitle = 'Civil Aviator', profileImage = "./assets/image 2.svg" } = profileData || {};
//     const [profileData, setProfileData] = useState(() => loadProfile());
//     useEffect(() => {
//     saveProfile(profileData);
//   }, [profileData]);
//     return(
//         <section id='profile' className='text-xl font-semibold text-gray-800 mr-2'>
//             <div id='pp'>
//                 <img src= {profileData.url}  alt= {profileData.name}/>
            
//             <div id='info'>
//                 <aside>
//                     <h1>{profileData.name}</h1>
//                     <p>{profileData.job}</p>
//                     <p id="profile-bio">{profileData.bio}</p>
//                 </aside>
//                 <aside id='edit'>
//                     <p><i className="fa-solid fa-pen edit span " style={{ marginRight: 10 }} />Edit Profile</p>
//                 </aside>
//             </div>
//             </div>
//             <div id='button'>
//                 <button><i className="fa-solid fa-plus" /> New Post</button>
//             </div>
//         </section>

//     )
// }

// export default Profile


// ProfileWithModals.jsx
import { useState, useEffect } from 'react';
import './App.css'; // Assuming you still want to use your App.css for general styling
import { loadProfile, saveProfile } from './data';
import {Modal} from './modals'; // Import our generic Modal component
import EditProfileModalContent from './edit-profile'; // Import the new component
import NewPostModalContent from './new-post'; // Import the new component

function ProfileWithModals() {
  const [profileData, setProfileData] = useState(() => loadProfile());
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  useEffect(() => {
    saveProfile(profileData);
  }, [profileData]);

  // Handlers for opening and closing modals
  const handleOpenEditProfileModal = () => setShowEditProfileModal(true);
  const handleCloseEditProfileModal = () => setShowEditProfileModal(false);

  const handleOpenNewPostModal = () => setShowNewPostModal(true);
  const handleCloseNewPostModal = () => setShowNewPostModal(false);

  // Submission handler for Edit Profile
  const handleEditProfileSubmit = (updatedData) => {
    // In a real app, you'd send `updatedData` to a backend or update global state
    console.log("Saving profile changes...", updatedData);
    setProfileData(updatedData); // Update the state in the parent component
    handleCloseEditProfileModal();
  };

  // Submission handler for New Post
  const handleNewPostSubmit = (postData) => {
    // In a real app, you'd send `postData` to a backend to create a new post
    console.log("Creating new post:", postData);
    // After submitting, you might want to refresh a list of posts or show a success message
    handleCloseNewPostModal();
  };

  return (
    <section id='profile' className='text-xl font-semibold text-gray-800 mr-2'>
      <div id='pp'>
        <img src={profileData.url} alt={profileData.name} />

        <div id='info'>
          <aside>
            <h1>{profileData.name}</h1>
            <p>{profileData.job}</p>
            <p id="profile-bio">{profileData.bio}</p>
          </aside>
          <aside id='edit'>
            <p onClick={handleOpenEditProfileModal}>
              <i className="fa-solid fa-pen edit span" style={{ marginRight: 10 }} />
              Edit Profile
            </p>
          </aside>
        </div>
      </div>
      <div id='button'>
        <button onClick={handleOpenNewPostModal}>
          <i className="fa-solid fa-plus" /> New Post
        </button>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        show={showEditProfileModal}
        onClose={handleCloseEditProfileModal}
        title="Edit Profile"
      >
        <EditProfileModalContent
          profileData={profileData}
          setProfileData={setProfileData} // Pass setProfileData to allow internal state changes
          onClose={handleCloseEditProfileModal}
          onSubmit={handleEditProfileSubmit}
        />
      </Modal>

      {/* New Post Modal */}
      <Modal
        show={showNewPostModal}
        onClose={handleCloseNewPostModal}
        title="Create New Post"
      >
        <NewPostModalContent
          onClose={handleCloseNewPostModal}
          onSubmit={handleNewPostSubmit}
        />
      </Modal>
    </section>
  );
}

export default ProfileWithModals;

ProfileWithModals.jsx
// import  { useState, useEffect, useRef } from 'react'; // Import useRef
// import './App.css';
// import { loadProfile, saveProfile } from './data'; // for profile data
// import {Modal} from './modals';
// import EditProfileModalContent from './edit-profile';
// import NewPostModalContent from './new-post';
// import DisplayCards from './gallery'; // Import your DisplayCards component

// function ProfileWithModals() {
//   const [profileData, setProfileData] = useState(() => loadProfile());
//   const [showEditProfileModal, setShowEditProfileModal] = useState(false);
//   const [showNewPostModal, setShowNewPostModal] = useState(false);

//   // Using a ref to hold a mutable object that can store a callback
//   // This allows us to pass a stable function to DisplayCards' useEffect
//   // while still being able to update the actual function being called later.
//   const addCardCallbackRef = useRef(null);

//   useEffect(() => {
//     saveProfile(profileData);
//   }, [profileData]);

//   const handleOpenEditProfileModal = () => setShowEditProfileModal(true);
//   const handleCloseEditProfileModal = () => setShowEditProfileModal(false);

//   const handleOpenNewPostModal = () => setShowNewPostModal(true);
//   const handleCloseNewPostModal = () => setShowNewPostModal(false);

//   const handleEditProfileSubmit = (updatedData) => {
//     console.log("Saving profile changes...", updatedData);
//     setProfileData(updatedData);
//     handleCloseEditProfileModal();
//   };

//   // This is the function that NewPostModalContent will call
//   const handleNewPostSubmit = (cardData) => {
//     console.log("Attempting to add new card:", cardData);
//     if (cardData.image && cardData.title) {
//       const newCard = {
//         id: Date.now(), // Simple unique ID
//         image: cardData.image,
//         title: cardData.title,
//         liked: false, // Default to not liked
//       };
//       // Call the function stored in the ref, if it exists
//       if (addCardCallbackRef.current) {
//         addCardCallbackRef.current(newCard);
//         console.log("New card dispatched to gallery:", newCard);
//       }
//     } else {
//       console.warn("Cannot add card: Missing image URL or title.", cardData);
//     }
//     handleCloseNewPostModal();
//   };

//   // Function to provide to DisplayCards for it to call when a new card is added
//   // This function is passed to DisplayCards via the onAddCardToGallery prop
//   const onAddCardToGallery = (callback) => {
//     // Store the callback provided by DisplayCards in a ref
//     addCardCallbackRef.current = callback;
//     // Return an unsubscribe function if DisplayCards needs it for cleanup
//     return () => {
//       addCardCallbackRef.current = null;
//     };
//   };


//   return (
//     <section id='profile' className='text-xl font-semibold text-gray-800 mr-2'>
//       <div id='pp'>
//         <img src={profileData.url} alt={profileData.name} />

//         <div id='info'>
//           <aside>
//             <h1>{profileData.name}</h1>
//             <p>{profileData.job}</p>
//             <p id="profile-bio">{profileData.bio}</p>
//           </aside>
//           <aside id='edit'>
//             <p onClick={handleOpenEditProfileModal}>
//               <i className="fa-solid fa-pen edit span" style={{ marginRight: 10 }} />
//               Edit Profile
//             </p>
//           </aside>
//         </div>
//       </div>
//       <div id='button'>
//         <button onClick={handleOpenNewPostModal}>
//           <i className="fa-solid fa-plus" /> New Post
//         </button>
//       </div>

//       {/* Edit Profile Modal */}
//       <Modal
//         show={showEditProfileModal}
//         onClose={handleCloseEditProfileModal}
//         title="Edit Profile"
//       >
//         <EditProfileModalContent
//           profileData={profileData}
//           setProfileData={setProfileData}
//           onClose={handleCloseEditProfileModal}
//           onSubmit={handleEditProfileSubmit}
//         />
//       </Modal>

//       {/* New Post Modal */}
//       <Modal
//         show={showNewPostModal}
//         onClose={handleCloseNewPostModal}
//         title="Create New Gallery Post"
//       >
//         <NewPostModalContent
//           onClose={handleCloseNewPostModal}
//           onSubmit={handleNewPostSubmit}
//         />
//       </Modal>

//       {/* --- Gallery Display --- */}
//       <h2 style={{ marginTop: '40px', marginBottom: '20px', textAlign: 'center', fontSize: '2em', color: '#333' }}>Your Gallery</h2>
//       <DisplayCards onAddCardToGallery={onAddCardToGallery} />
//     </section>
//   );
// }

// export default ProfileWithModals;