import React, { useState } from "react";
import "./Register.css";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const Register = ({ user, setIsRegistered }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    rollNo: "",
    batch: "",
    gender: "",
    department: "",
  });

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
    // const uid = user?.uid || '';
    // Include UID in form data
    const userData = {
      uid: user.uid,
      ...formData,
    };
    // Send form data including UID to your SQL backend
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        await setDoc(doc(db, "user", user.uid), {
          isRegistered: false,
          isAdmin: false
        });
        throw new Error("Failed to register user");
      }
      // Update Firestore to mark user as registered
      await setReg();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error registering user:", error);
      await setDoc(doc(db, "user", user.uid), {
        isRegistered: false,
        isAdmin: false
      });
    }
  };

  return (
    <div className="register">
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
