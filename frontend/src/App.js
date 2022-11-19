
import './App.css';
import Navbar from './components/navbar/Navbar';
// import Home from './components/home/Home';
import Register from './components/form/Register'
import Login from './components/form/Login'
import Course from './components/course/Course'
import {Navigate, Route,Routes} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Profile from './components/profile/Profile';
function App() {
  const [user,setuser]=useState("");
  const [loginmsg,setloginmsg]=useState("");
  const luser =(x)=>{
    if(user===""){
      setuser(x);
    }else{
      setuser("");
    }
  }
  useEffect(()=>{
const data=window.localStorage.getItem("loginuser");
if(data!=null) setuser(JSON.parse(data));
  },[])
  useEffect(()=>{
    window.localStorage.setItem("loginuser",JSON.stringify(user))
  },[user])
  const lmsg=(x)=>{
    setloginmsg(x);
  }
  // let ? <Navigate to="/" /> : <Login />;
  return (
    <>
   {user!=="" && <Navbar user={user} luser={luser}/>}
    <div id="app">
    <Routes>
        {/* <Route path="/" element={<Home loginmsg={loginmsg} user={user}/>}></Route> */}
        <Route path="" element={<Navigate to="/login"/>}></Route>
        <Route path="/signin" element={<Register/>}></Route>
        <Route path="/login" element={<Login luser={luser} lmsg={lmsg}/>}></Route>
        { user!=="" &&<Route path="/course" element={<Course user={user} loginmsg={loginmsg} lmsg={lmsg}/>}></Route>}
        { user!=="" &&<Route path="/profile" element={<Profile user={user} loginmsg={loginmsg}/>}></Route>}
        {<Route path="/editprofile" element={<Profile user={user} loginmsg={loginmsg}/>}></Route>}
        {/* <Route path="/" element={<Navigate replace to="/login"/>}></Route> */}
    </Routes>
    </div>
    </>
  );
}

export default App;
