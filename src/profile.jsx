import './App.css'
 import './index.css'
//import { ProfileData } from './data';
 function DisplayProfile({ profileData, handleEdit, handlePost}) {
   return (
    <section id='profile' className='text-xl font-semibold text-gray-800 mr-2'>
      <div id='pp'>
        <img src={profileData.image} alt={profileData.name} style={{height:'200px', width:'30%',  borderRadius: '20px'
}} />

        <div id='info'>
          <aside>
            <h1>{profileData.name}</h1>
            <p>{profileData.job}</p>
            <p id="profile-bio">{profileData.bio}</p>
          </aside>
          <aside id='edit'>
            <p onClick={handleEdit}>
              <i className="fa-solid fa-pen edit span" style={{ marginRight: 10 }} />
              Edit Profile
            </p>
          </aside>
        </div>
      </div>
      <div id='button' style={{padding: '10px 20px'}}>
        <button onClick={handlePost} style={{cursor: 'pointer', padding: '10px 20px',}}>
          <i className="fa-solid fa-plus" /> New Post
        </button>
      </div>
    </section>
  );
}
export default DisplayProfile;