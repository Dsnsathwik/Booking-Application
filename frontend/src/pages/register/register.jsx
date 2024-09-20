import React from "react";
import "./register.css";

function Register() {
  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Create an Account</h2>
        <form className="register-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Enter your username" />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" placeholder="Confirm your password" />
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
        <div className="register-footer">
          <p>Already have an account? <a href="#">Login</a></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
