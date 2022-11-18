import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from'react-router-dom'
import loginimg from "./login.svg"
export default function Login(props) {
    const [data,setData]=useState({
        rollno:"",
        password:""
      });
    const [success, setsuccess] = useState(false);

  const navigate=useNavigate()
  useEffect(()=>{
    console.log(success,"login")
    if(success){
      navigate("/course")
    }
   
  },[success])
      // const navigate=useNavigate()
      const handlechange=({currentTarget:input})=>{
        setData({...data,[input.name]:input.value});
      }
      const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
          const url=`${process.env.REACT_APP_BACKENDURL}/login`;
          const {data:res}=await axios.post(url,data);
          console.log(res.data.message);
          if(res.status==="success"){
            props.lmsg(res.data.message)
          }
          props.luser(res.data.rollno);
          setsuccess(true)
        } catch (error) {
          console.log("loginerror")
        }
      }
  return ( <>
    <section className=" gradient-custom " onLoad={()=>{
      window.localStorage.removeItem('loginuser');
    }} style={{marginTop:"-100px"}} >
  <div className="container py-5 " style={{width:"70%"}}>
    <div className="row justify-content-center align-items-center h-100 " >
      {/* <div className="col-12 col-lg-9 col-xl-7" style={{border:"1px solid red"}}> */}
      
        <div className="card shadow-2-strong card-registration" >
        <div className="row formshadow" style={{borderRadius: "10px"}}>
        <div className="col-6  leftlogin" >
          <div className="d-flex align-items-center justify-content-center " style={{marginTop:"45px"}}><h1 style={{color:"#6D83F2"}}>Welcome back !</h1></div>
          <div className="d-flex align-items-center justify-content-center"><img src={loginimg} alt="" /></div>
   
      </div>
         <div className="col-6">
          <div className="card-body p-4 p-md-5">
            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5  d-flex justify-content-center" style={{color:"#6D83F2"}}>Login </h3>
            <form  onSubmit={handleSubmit} >
              <div className="row">
                <div className="col mb-4 pb-2">

                  <div className="form-outline">
                    <label className="form-label" htmlFor="rollno">Rollno</label>
                    <input type="text" id="rollno" value={data.rollno} onChange={handlechange} className="form-control form-control-lg" name="rollno" required/>
                  </div>

                </div>
              </div>
              <div className='row'>
                <div className="col mb-4 pb-2">
                 <div className="form-outline">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input type="password" id="password" value={data.password} onChange={handlechange} className="form-control form-control-lg"name="password" required/>
                  </div>

                </div>
              </div>

              <div className="mt-2 pt-2  d-flex justify-content-center">
                <input className="btn btn-primary btn-lg" type="submit" value="Login" />
              </div>

            </form>
          <div className="m-2 d-flex justify-content-center text-decoration-underline"> <Link to="/signin">Signin</Link></div>
         
          </div>
        </div>
        </div>
        </div>
      {/* </div> */}
    </div>
  </div>
</section>
    </>
  )
}
