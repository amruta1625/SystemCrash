import React, { useState, useContext } from "react";
import "./profilepage.css";
import Navbar from "../Navbar/navbar";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import AuthContext from "../../../context/AuthProvider";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  // const { authCreds, setAuthCreds } = useContext(AuthContext);
  const { authCreds, setAuthCreds, setIsLoggedIn } =
    useContext(AuthContext);
  const [user, setUser] = useState({
    user_id: "",
    hashed_password: "",
  });

  const [newUserData, setNewUserData] = useState({
    name: authCreds.name,
    user_id: authCreds.user_id,
    email: authCreds.email,
    profile_pic: authCreds.profile_pic,
  });
  const [newProfilePic, setNewProfilePic] = useState(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewProfilePic(file);
  };

  const handleSaveClick = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("data", JSON.stringify(newUserData));
      if (newProfilePic) {
        formData.append("file", newProfilePic);
      }
      const formDataEntries = formData.entries();
      for (let entry of formDataEntries) {
        console.log(entry);
      }

      const response = await axios.post("https://elan.iith-ac.in:8082/edit_profile", formData, {
        // const response = await axios.post("http://127.0.0.1:8000/edit_profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);

      // if (response.data.message === "success") {
      //   setAuthCreds({
      //     ...authCreds,
      //     name: newUserData.name,
      //     profile_pic: newUserData.profile_pic,
      //   });
      //   setIsEditing(false);
      // } else {
      //   alert("There was an error in updating the Profile Information. Please try again.");
      // }
      axios
        .post("https://elan.iith-ac.in:8082/login", user)
        // .post("http://127.0.0.1:8000/login", user)
        .then((res) => {
          if (res.data.message === "success") {
            setAuthCreds(prevAuthCreds => ({
              ...prevAuthCreds,
              user_id: res.data.user_id,
              name: res.data.name,
              email: res.data.email,
              active: res.data.verified,
              notification: res.data.notifications,
              profile_pic: res.data.photo
            }));
            setIsLoggedIn(true);
          } else {
            alert("Invalid Credentials");
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
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

  return (
    <>
      <Navbar />
      <div className="container">
        <section className="profile-section">
          <div className="xyz">
            <div className="abc">
              <div
                id="profile-pic"
              // style={{ backgroundImage: `url(${authCreds.profile_pic})` }}
              >
                {isEditing && (
                  <div>
                    <label htmlFor="newProfilePic">Change Profile Picture:</label>
                    <input
                      type="file"
                      id="newProfilePic"
                      name="newProfilePic"
                      accept="image/*"
                      onChange={handleFileChange}
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
                  </div>
                  <div className="btn">
                    <button type="submit" onClick={(e) => handleSaveClick(e)}>
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text">
                  <img
                    src={`data:image/png;base64,${authCreds.profile_pic}`}
                    alt={authCreds.profile_pic}
                    className="user-image"
                  />
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
                        IITK Roll Number :
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
