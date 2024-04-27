import React from "react";
import "./Register.css";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";


const Register = ({ user, setIsRegistered}) => {
  const navigate = useNavigate();

  const setReg = async () => {
    if (user) {
      await setDoc(doc(db, "user", user.uid), {
        isRegistered: true,
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsRegistered(true);
    await setReg(); // Wait for setReg to complete before navigating
    navigate("/dashboard");
  };

  return (
    <div className="register">
      <div className="container">
        <div className="heading">Enter Your Information</div>
        <form className="form" onSubmit={handleRegister}>
          <div className="input-field">
            <input
              required="on"
              autocomplete="off"
              type="text"
              name="text"
              id="username"
              placeholder=""
            />
            <label for="username">Name</label>
          </div>
          <div className="input-field">
            <input
              required="on"
              autocomplete="off"
              type="text"
              inputMode="numeric"
              pattern="[^A-Za-z]*"
              name="number"
              id="email"
              placeholder=""
            />
            <label for="email">Mobile No.</label>
          </div>
          <div className="input-field">
            <input
              required="on"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="number"
              id="password"
              placeholder=""
            />
            <label for="username">Roll No.</label>
          </div>
          <div className="input-field">
            <input
              required="on"
              autocomplete="off"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="text"
              id="password"
              placeholder=""
            />
            <label for="username">Batch</label>
          </div>

          <div className="radio-inputs">
            <label className="radio male">
              <input type="radio" name="radioGender" />
              <span className="name">Male</span>
            </label>
            <label className="radio female">
              <input type="radio" name="radioGender" />
              <span className="name">Female</span>
            </label>
          </div>
          <div className="radio-inputs">
            <label className="radio">
              <input type="radio" name="radio" />
              <span className="name">CSE</span>
            </label>
            <label className="radio">
              <input type="radio" name="radio" />
              <span className="name">ECE</span>
            </label>

            <label className="radio">
              <input type="radio" name="radio" />
              <span className="name">MCA</span>
            </label>
          </div>

          <div className="btn-container">
            <button className="btn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
