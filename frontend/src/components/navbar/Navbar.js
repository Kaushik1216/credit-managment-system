import React from 'react'
import './navbar.css'
import {Link,useNavigate} from'react-router-dom'
import { useState,useEffect } from 'react'
export default function Navbar(props) {
  const [success, setSuccess] = useState(false);

  const navigate=useNavigate()
  useEffect(()=>{
    if(success){
      navigate("/login")
      setSuccess(false)
    }
  },[success])
  const logout =async()=>{
    // localStorage.clear();
    window.localStorage.setItem("loginuser",JSON.stringify(""))
    props.luser("")
    setSuccess(true);
  }
  return (
    <>
    <nav className="navbar">
        <div className="navbar-container container">
            <input type="checkbox" />
            <div className="hamburger-lines">
                <span className="line line1"></span>
                <span className="line line2"></span>
                <span className="line line3"></span>
            </div>
                <ul className="menu-items">
                    {/* <li><Link to="/">Home</Link></li> */}
                    { props.user==="" && <li><Link to="/signin">Signin</Link></li>}
                    { props.user==="" && <li><Link to="/login">Login</Link></li>}
                    {props.user!=="" && <li><Link to="/course">Course</Link></li>}
                    {props.user!=="" && <li><Link onClick={logout} to="/login">Logout</Link></li>}
                    {props.user!=="" && <li><Link to="/profile">Profile</Link></li>}
                    <li><Link to="/course">{props.user}</Link></li>      
                </ul>
                <h1 className="logo">CMS</h1>
           
        </div>
    </nav>
    </>
  )
}
