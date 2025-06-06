import { useState } from 'react';
import { loadCards, saveCards } from './data';

// Assuming InitialCardsData is not directly modified here,
// but rather new data is passed up to the parent via onSubmit.

function NewPostModalContent({ onClose, onSubmit }) {
  const [postTitle, setPostTitle] = useState('');
  const [imageURL, setImageURL] = useState(''); // Stores the Data URL for the selected image
  
  // Removed the incomplete destructuring that caused a syntax error: const { card, }

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission (page reload)

    // Generate a random number for the ID (between 7 and 100 inclusive)
    const randomNumber = Math.floor(Math.random() * (100 - 7 + 1)) + 7;

    // Prepare the new card data object
    const newCard = {
      title: postTitle,
      image: imageURL, // This will now be the Data URL (base64 encoded image)
      id: randomNumber,
      // Provide sensible default values for icon, iconName, liked
      icon: '📷', // Example default icon (emoji)
      iconName: 'Default Post', // Example default icon name
      liked: false // New posts are typically not liked by default
    };
    const storedCards = loadCards(); // Load existing cards from localStorage
    const updatedCards = [newCard, ...storedCards];
    saveCards(updatedCards) // Add the new card to the existing cards
    // Call the onSubmit prop from the parent component, passing the new card data.
    // The parent component is responsible for adding this new card to its main data state.
    if (onSubmit) { // Ensure onSubmit prop is provided before calling
      onSubmit(newCard);
    }

    // Clear the form fields after successful submission
    setPostTitle('');
    setImageURL('');

    // Close the modal. The check ensures it's a function before calling.
    if (onClose) {
      onClose();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // When the file is read, set the imageURL state to the Data URL
        setImageURL(reader.result);
      };
      reader.readAsDataURL(file); // Read the file as a Data URL (base64 encoded)
    } else {
      setImageURL(''); // Clear imageURL if no file is selected
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group" style={{ marginBottom: '15px' }}>
        <label htmlFor="postTitle" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Post Title</label>
        <input
          type="text"
          id="postTitle"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          required
        />
      </div>
      <div className="form-group" style={{ marginBottom: '20px',}}>
        <label htmlFor="imageUpload" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Image</label>
        <input
          type="file"
          id="imageUpload" // Changed ID to avoid confusion with imageURL state variable
          accept="image/*"
          onChange={handleImageChange} // Use the new handler for file input
          style={{}}
          required
        />
        {/* Optional: Display a preview of the selected image */}
        {imageURL && (
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <img src={imageURL} alt="Image Preview" style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '4px', border: '1px solid #eee' }} />
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          type="submit"
          style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', flex: 1 }}
        >
          Add to Gallery
        </button>
        <button
          type="button"
          onClick={onClose}
          style={{ padding: '10px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', flex: 1 }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default NewPostModalContent;
