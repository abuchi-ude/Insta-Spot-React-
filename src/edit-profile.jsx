import { useState, useEffect } from 'react';


function EditProfileModalContent({ ProfileData, onClose, onSubmit }) {
  // Use local state for editing, initialized from the current profileData prop
  const [localProfile, setLocalProfile] = useState(ProfileData);

  // Keep localProfile in sync if profileData changes (e.g., when modal is reopened)
  useEffect(() => {
    setLocalProfile(ProfileData);
  }, [ProfileData]);

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    if (type === "file") {
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
    if (onSubmit) onSubmit(localProfile); // Only update parent on submit
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
          accept="image/*"
          onChange={handleChange}

        />
        {localProfile.image && (
          <div style={{ marginTop: '10px' }}>
            <img
              src={localProfile.image}
              alt="Profile Preview"
              style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '50%' }}
            />
          </div>
        )}
      </div>
      <div className="buttons" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}

export default EditProfileModalContent;