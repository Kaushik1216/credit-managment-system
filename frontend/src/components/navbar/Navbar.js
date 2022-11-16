import React from 'react'
import './navbar.css'
import {Link,useNavigate} from'react-router-dom'
import { useState,useEffect } from 'react'
export default function Navbar(props) {
  console.log(props.user)
  const [success, setSuccess] = useState(false);

  const navigate=useNavigate()
  useEffect(()=>{
    if(success){
      navigate("/login")
      setSuccess(false)
    }
  },[success])
  const logout =async()=>{
    localStorage.clear();
    props.luser("")
    setSuccess(true);
  }
  return (
    <>
    <nav class="navbar">
        <div class="navbar-container container">
            <input type="checkbox" />
            <div class="hamburger-lines">
                <span class="line line1"></span>
                <span class="line line2"></span>
                <span class="line line3"></span>
            </div>
                <ul class="menu-items">
                    {/* <li><Link to="/">Home</Link></li> */}
                    { props.user==="" && <li><Link to="/signin">Signin</Link></li>}
                    { props.user==="" && <li><Link to="/login">login</Link></li>}
                    {props.user!=="" && <li><Link to="/course">course</Link></li>}
                    {props.user!=="" && <li><Link onClick={logout}>logout</Link></li>}
                    <li><Link to="/course">{props.user}</Link></li>
                </ul>
                <h1 class="logo">CMS</h1>
           
        </div>
    </nav>
    </>
  )
}
