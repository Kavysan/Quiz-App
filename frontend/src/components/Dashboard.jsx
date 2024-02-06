import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/Dashboard.css'
import avatar1 from '../images/avatars/a1.png'
import avatar2 from '../images/avatars/a2.png'
import avatar3 from '../images/avatars/a3.png'
import avatar4 from '../images/avatars/a4.png'
import avatar5 from '../images/avatars/a5.png'
import avatar6 from '../images/avatars/a6.png'
import { Button, Modal} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate()
    const [profileData, setProfileData] = useState(null)
    const [updateName, setUpdateName] = useState('');
    const [updatePhone, setUpdatePhone] = useState('');
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

     
    useEffect(() => {
        getUsers();
        const storedAvatar = localStorage.getItem('selectedAvatar');
        if (storedAvatar) {
          setSelectedAvatar(storedAvatar);
        }
    }, []);
     
    const email = localStorage.getItem('email');
     
    function getUsers() { 
        axios({
          method: "GET",
          // url:`http://127.0.0.1:5000/profile/${email}`, 
          url:`https://quiz-backend-aao5.onrender.com/profile/${email}`, 
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then((response) => {
          const res =response.data
          res.access_token && props.setToken(res.access_token)
          setProfileData(({
            profile_name: res.name,
            profile_email: res.email,
            profile_phone: res.phone,
            }))
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })
    }; 

    const handleUpdateProfile = () => {
      setUpdateName(profileData.profile_name || '');
      setUpdatePhone(profileData.profile_phone || '');
      setShowUpdateForm(true);
    };

    const handleUpdateFormSubmit = async (e) => {
      e.preventDefault();
      try{
        // const response = await axios.put(`http://127.0.0.1:5000/profile/${email}`,
        const response = await axios.put(`https://quiz-backend-aao5.onrender.com/profile/${email}`,
        
        {
          name: updateName,
          phone: updatePhone,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );

      const updatedUserData = response.data;

      
      setProfileData({
        profile_name: updatedUserData.name,
        profile_email: updatedUserData.email,
        profile_phone: updatedUserData.phone,
      });

    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setShowUpdateForm(false);
    }
  };
  


    const handleEditClick = () => {
      setShowAvatarModal(true);
    };
  
    const handleHideAvatarModal = () => {
      setShowAvatarModal(false);
    };
  
    const handleSelectAvatar = (avatar) => {
      setSelectedAvatar(avatar);
      localStorage.setItem('selectedAvatar', avatar);
    };

    const handleDeleteProfile = () => {
      setShowDeleteConfirmation(true);
    };

    const handleDeleteConfirmation = async (confirmed) => {
      setShowDeleteConfirmation(false);
  
      if (confirmed) {
        try {
          // await axios.delete(`http://127.0.0.1:5000/profile/${email}`, {
            await axios.delete(`https://quiz-backend-aao5.onrender.com/profile/${email}`, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          });
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          navigate('/login');
        } catch (error) {
          console.error('Error deleting profile:', error);
        }
      }
    };
  
     
    let imgs = [
      avatar1,avatar2,avatar3,avatar4,avatar5,avatar6
    ];
  return (

      
    <div className="container dashboard">
    <h1 className="text-center" style={{color: "#2357be"}}>Here is your profile!!</h1>
        <div className=" row d-flex justify-content-center align-items-center h-50">
          <div className=" col col-lg-12">
                <div className=" profile-box card mb-3">
                    {profileData && <div className="row g-0">
                    <div className="col-md-6 bg-c-lite-green text-center text-white">
                        <img src={selectedAvatar || imgs[0]} className="img-fluid my-3" width="150"/>
                        <div>
                          <button className="change-avatar" onClick={handleEditClick}>Change Avatar</button>
                        </div>
                        <div className="button-group">
                          <button className="up-del" onClick={handleUpdateProfile}>Update Profile</button>
                        </div>
                        <div className="button-group">
                          <button className="up-del " onClick={handleDeleteProfile}>Delete Profile</button>
                        </div>
                       
                        
                    </div>
             
                    <div className="col-md-6">
                        <div className="card-body p-4">
                        <div className="row pt-1">
                            <div className="col-12 mb-3">
                                <h6>Name</h6>
                                <p className="text-muted">{profileData.profile_name}</p>
                            </div>
                            <div className="col-12 mb-3">
                                <h6>Email</h6>
                                <p className="text-muted">{profileData.profile_email}</p>
                            </div>
                            <div className="col-12 mb-3">
                                <h6>Phone</h6>
                                <p className="text-muted">{profileData.profile_phone}</p>
                            </div>

                            
                        </div>
                            
                        </div>
                    </div>    
 
                </div>
                }
                <div className="btns d-flex row ">
                    
                </div>
            </div>
          </div>
        </div>
        <Modal show={showAvatarModal} onHide={handleHideAvatarModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
          <div className="avatar-list">
            {imgs.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`Avatar ${index + 1}`}
                className="avatar-image"
                onClick={() => handleSelectAvatar(avatar)}
              />
            ))}

          </div>
          <div>
            <button type="submit"  className="change-avatar d-flex flex-row col-12 justify-content-center align-items-center" onClick={handleHideAvatarModal}>Update Avatar</button>
          </div>
          </>
         
        </Modal.Body>
      </Modal>
      <Modal show={showUpdateForm} onHide={() => setShowUpdateForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateFormSubmit}>
            <div className="mb-3">
              <label htmlFor="updateName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="updateName"
                value={updateName}
                onChange={(e) => setUpdateName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="updatePhone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="updatePhone"
                value={updatePhone}
                onChange={(e) => setUpdatePhone(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        </Modal.Body>
      </Modal>
      <Modal show={showDeleteConfirmation} onHide={() => handleDeleteConfirmation(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete your profile?</p>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={() => handleDeleteConfirmation(false)}>
              No
            </Button>
            <Button variant="danger" onClick={() => handleDeleteConfirmation(true)}>
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>

  );
}

export default Dashboard