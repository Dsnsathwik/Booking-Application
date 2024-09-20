import React, { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/authContext";
import axios from "axios"
import { useNavigate } from "react-router-dom";

function Login() {

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined
  })

  const { loading, error, dispatch } = useContext(AuthContext)

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value}))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    dispatch({type: "LOGIN_START" })
    
    try{
      
      const res = await axios.post("/api/auth/login", credentials)
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user })
      console.log("Login Success: ", res.data.user)
      navigate("/")

    } catch(error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data })
    }
  }

  const navigate = useNavigate()
  
  
  
  console.log(credentials)

  

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome Back</h2>
        <form className="login-form">
          <div className="input-group">
            <label htmlFor="email">Username</label>
            <input type="text" id="username" onChange={handleChange} placeholder="Enter your username" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={handleChange} placeholder="Enter your password" />
          </div>
          <button type="submit" disabled={loading} className="login-button" onClick={handleClick}>Login</button>
          {error && <span id="errorMsgs">{error.message}</span>}
        </form>

        <div className="login-footer">
          <p>Don't have an account? <a href="/register">Sign up</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
