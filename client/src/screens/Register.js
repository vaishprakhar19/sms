import React, { useState } from "react";
import "./Register.css";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from '../firebase'
import BackHandler from "../components/BackHandler";
import axios from "axios";
const Register = ({ user, setIsRegistered }) => {
  BackHandler();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    rollNo: "",
    batch: "",
    gender: "",
    department: "",
  });
axios.defaults.withCredentials= true;
  const setReg = async () => {
    if (user) {
      await setDoc(doc(db, "user", user.uid), {
        isRegistered: true,
        isAdmin:false
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsRegistered(true);
    const userData = {
      uid: user.uid,
      ...formData,
    };
    // Send form data including UID to SQL backend
    try {
      const response = await fetch("https://biasportalback.vercel.app/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        await setDoc(doc(db, "user", user.uid), {
          isRegistered: false,
          isAdmin: false
        });
        throw new Error(data.error || "Failed to register user");
      }
      
      // Update Firestore to mark user as registered
      await setReg();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error registering user:", error);
      setIsRegistered(false);
      await setDoc(doc(db, "user", user.uid), {
        isRegistered: false,
        isAdmin: false
      });
    }
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(result => {
        navigate('/login');
      })
      .catch(error => {
        console.log('error', error.message);
      })
  }


  return (
    <div className="register">
      <button className="Logout-Btn" onClick={handleSignOut}>
            <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
            <div className="text">Logout</div>
          </button>
      <div className="container">
        <div className="heading">Enter Your Information</div>
        <form className="form" onSubmit={handleRegister}>
          <div className="input-field">
            <input
              required="on"
              autoComplete="off"
              type="text"
              name="name"
              id="username"
              placeholder=""
              value={formData.name}
              onChange={handleInputChange}
            />
            <label for="username">Name</label>
          </div>
          <div className="input-field">
            <input
              required="on"
              autoComplete="off"
              type="text"
              inputMode="numeric"
              pattern="[^A-Za-z]*"
              name="mobile"
              id="email"
              placeholder=""
              value={formData.mobile}
              onChange={handleInputChange}
            />
            <label for="email">Mobile No.</label>
          </div>
          <div className="input-field">
            <input
              required="on"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="rollNo"
              id="password"
              placeholder=""
              value={formData.rollNo}
              onChange={handleInputChange}
            />
            <label for="username">Roll No.</label>
          </div>
          <div className="input-field">
            <input
              required="on"
              autoComplete="off"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="batch"
              id="password"
              placeholder=""
              value={formData.batch}
              onChange={handleInputChange}
            />
            <label for="username">Batch</label>
          </div>

          <div className="radio-inputs">
            <label className="radio male">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleInputChange}
              />
              <span className="name">Male</span>
            </label>
            <label className="radio female">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleInputChange}
              />
              <span className="name">Female</span>
            </label>
          </div>
          <div className="radio-inputs">
            <label className="radio">
              <input
                type="radio"
                name="department"
                value="CSE"
                checked={formData.department === "CSE"}
                onChange={handleInputChange}
              />
              <span className="name">CSE</span>
            </label>
            <label className="radio">
              <input
                type="radio"
                name="department"
                value="ECE"
                checked={formData.department === "ECE"}
                onChange={handleInputChange}
              />
              <span className="name">ECE</span>
            </label>

            <label className="radio">
              <input
                type="radio"
                name="department"
                value="MCA"
                checked={formData.department === "MCA"}
                onChange={handleInputChange}
              />
              <span className="name">MCA</span>
            </label>
          </div>

          <div className="btn-container">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
