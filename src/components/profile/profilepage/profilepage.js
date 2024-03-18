import React, { useState, useContext } from "react";
import "./profilepage.css";
import Navbar from "../Navbar/navbar";
import axios from "axios";
import AuthContext from "../../../context/AuthProvider";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const { authCreds, setAuthCreds } = useContext(AuthContext);

  const [newUserData, setNewUserData] = useState({
    name: authCreds.name,
    user_id: authCreds.user_id,
    email: authCreds.email,
    profile_pic: authCreds.profile_pic,
    // ...authCreds,
  });
  const [newProfilePic, setNewProfilePic] = useState(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", newUserData.name);
      formData.append("user_id", newUserData.user_id);
      formData.append("email", newUserData.email);
      if (newProfilePic) {
        formData.append("profile_pic", newProfilePic);
      }

      const response = await axios.post("https://elan.iith-ac.in:8082/edit_profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);

      if (response.data.message === "success") {
        setAuthCreds({
          ...authCreds,
          name: newUserData.name,
          // email: newUserData.email,
          profile_pic: newUserData.profile_pic,
        });
        setIsEditing(false);
      } else {
        alert("There was an error in updating the Profile Information. Please try again.");
      }
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
                    {/* Remove Roll Number and Email fields in editing mode */}
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
                      <pre style={{ display: "inline-block" }}>EMAIL :</pre>
                    </span>
                    <span id="email" className="br">
                      {authCreds.email}
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
