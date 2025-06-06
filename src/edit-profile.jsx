import { useState } from 'react';

function EditProfileModalContent({ profileData, setProfileData, onClose, onSubmit }) {
  // Use local state for editing
  const [localProfile, setLocalProfile] = useState(profileData);

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    if (type === "file") {
      // Handle file input (e.g., image upload)
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setLocalProfile(prev => ({
            ...prev,
            image: reader.result // Store base64 string or URL
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setLocalProfile(prev => ({
        ...prev,
        [id]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(localProfile); // Only update parent on submit
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={localProfile.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="job">Job Title:</label>
        <input
          type="text"
          id="job"
          value={localProfile.job}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          value={localProfile.bio}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="image">Profile Image:</label>
        <input
          type="file"
          id="image"
          onChange={handleChange}
        />
      </div>
      <div className="buttons" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}

export default EditProfileModalContent;