import React, { useState, useEffect, useContext } from "react";
import "./profilepage.css";
import Navbar from "../Navbar/navbar";
import axios from "axios";
import AuthContext from "../../../context/AuthProvider";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const { authCreds, setAuthCreds } = useContext(AuthContext);

  const [newUserData, setNewUserData] = useState({
    name: "",
    user_id: "",
    email: "",
    profile_pic: "",
  });
  const [newProfilePic, setNewProfilePic] = useState(null);


  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    try {
      // add code for profile pic update
      e.preventDefault();
      axios
        .post("http://127.0.0.1:8000/edit_profile", newUserData)
        .then((response) => {
          console.log(response);
          if (response.data.message === "success") {
            setAuthCreds({
              ...authCreds,
              name: newUserData.name,
              email: newUserData.email,
              user_id: newUserData.user_id,
            });
          } else {
            alert(
              "There was an error in updation of the Profile Information. Please try again."
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({
      ...newUserData,
      [name]: value,
    });
  };

  const handleProfilePicChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setNewProfilePic(file);
  };

  return (
    <>
      <Navbar />
      <div className="container">
      <section className="profile-section">
      <div className="xyz">
          <div className="abc">
            <div
              id="profile-pic"
              style={{ backgroundImage: `url(${authCreds.profile_pic})` }}
            >
              {isEditing && (
                <div>
                  <label htmlFor="newProfilePic">Change Profile Picture:</label>
                  <input
                    type="file"
                    id="newProfilePic"
                    name="newProfilePic"
                    accept="image/*"
                    onChange={(e) => handleProfilePicChange(e)}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="matter">
            {isEditing ? (
              <form>
                <div className="text">
                  <div>
                    <span className="ar">
                      <pre style={{ display: "inline-block" }}>NAME :</pre>
                    </span>
                    <input
                      type="text"
                      id="name"
                      className="br"
                      name="name"
                      value={newUserData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <span className="ar">
                      <pre style={{ display: "inline-block" }}>
                        IITK-Roll Number :
                      </pre>
                    </span>
                    <input
                      type="text"
                      id="rollno-id"
                      className="br"
                      name="rollno"
                      value={newUserData.user_id}
                      readOnly
                    />
                  </div>
                  <div>
                    <span className="ar">
                      <pre style={{ display: "inline-block" }}>USERNAME :</pre>
                    </span>
                    <input
                      type="text"
                      id="userName"
                      className="br"
                      name="username"
                      value={newUserData.user_id}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="btn">
                <button type="submit" onClick={(e) => handleSaveClick(e)}>
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <div className="text">
                <div>
                  <span className="ar">
                    <pre style={{ display: "inline-block" }}>NAME :</pre>
                  </span>
                  <span id="name" className="br">
                    {authCreds.name}
                  </span>
                </div>
                <div>
                  <span className="ar">
                    <pre style={{ display: "inline-block" }}>
                      IITK-Roll Number :
                    </pre>
                  </span>
                  <span id="rollno-id" className="br">
                    {authCreds.user_id}
                  </span>
                </div>
                <div>
                  <span className="ar">
                    <pre style={{ display: "inline-block" }}>USERNAME :</pre>
                  </span>
                  <span id="userName" className="br">
                  {authCreds.user_id}
                  </span>
                </div>
                <div>
                  <span className="ar">
                    <pre style={{ display: "inline-block" }}>USERNAME :</pre>
                  </span>
                  <span id="userName" className="br">
                    {authCreds.user_id}
                  </span>
                </div>
              </div>
            )}
            <div className="btn">
              {!isEditing && (
                <button type="button" onClick={handleEditClick}>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
                </div>
        </section>
      </div>
      
      
    </>
  );
}
