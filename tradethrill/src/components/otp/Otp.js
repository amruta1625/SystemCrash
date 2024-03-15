import React, { useContext, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";

const Otp = () => {
  const {authCreds, setAuthCreds} = useContext(AuthContext);
  const [packet, setPacket] = useState({
    user_id: "",
    otp: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPacket((prevPacket) => ({
      ...prevPacket,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/otp", packet)
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "success") {
          setAuthCreds({
            ...authCreds,
            active: 1,
          });
          alert("OTP verified");
          navigate("/login");
        } else {
          alert("Invalid OTP");
          navigate("/register")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="user_id">User ID : </label>
        <input
          type="text"
          placeholder="Enter OTP"
          name="user_id"
          id="user_id"
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="otp">OTP : </label>
        <input
          type="text"
          placeholder="Enter OTP"
          name="otp"
          id="otp"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Otp;
