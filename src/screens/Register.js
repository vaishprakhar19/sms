
import React from 'react'
import "./Register.css"

const Register = () => {

  

  return (
    <div>
        <div className="container">
  <div className="heading">SignIn to your account</div>
  <form className="form" action="">
    <div className="input-field">
      <input
        required=""
        autocomplete="off"
        type="text"
        name="text"
        id="username"
      />
      <label for="username">Full Name</label>
    </div>
    <div className="input-field">
      <input
        required=""
        autocomplete="off"
        type="email"
        name="email"
        id="email"
      />
      <label for="email">Email</label>
    </div>
    <div className="input-field">
      <input
        required=""
        autocomplete="off"
        type="password"
        name="text"
        id="password"
      />
      <label for="username">Password</label>
    </div>

    <div className="btn-container">
      <button className="btn">Submit</button>
      <div className="acc-text">
        New here ?
        <span style={{color :" #0000ff"}}>Create Account</span>
      </div>
    </div>
  </form>
</div>

    </div>
  )
}

export default Register