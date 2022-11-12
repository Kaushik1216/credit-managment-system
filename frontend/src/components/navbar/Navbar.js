import React from 'react'
import './navbar.css'
import {Link} from'react-router-dom'
export default function Navbar() {
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
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/signin">Signin</Link></li>
                    <li><Link to="/login">login</Link></li>
                    <li><Link to="/course">course</Link></li>
                </ul>
                <h1 class="logo">VCure</h1>
           
        </div>
    </nav>
    </>
  )
}
