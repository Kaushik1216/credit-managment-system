import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from'react-router-dom'
import signin from "./signin.svg"
export default function Register() {
  const [data,setData]=useState({
    firstname:"",
    lastname:"",
    email:"",
    rollno:"",
    branch:"",
    degree:"",
    password:"",
    cpassword:""
  });
  const [success, setSuccess] = useState(false);

  const navigate=useNavigate()
  useEffect(()=>{
    console.log(success)
    if(success){
      setSuccess(false);
      // if(res.status(422)!=null){
      //   console.log(res.status(422).error)
      // }
      navigate("/")
    }
  },[success])
  const handlechange=({currentTarget:input})=>{
    setData({...data,[input.name]:input.value});
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const url=`${process.env.REACT_APP_BACKENDURL}/signin`;
      const {data:res}=await axios.post(url,data);
      
      console.log("repon",res)
      setSuccess(true)
      // console.log("hhh",d)
    } catch (error) {
      console.log("ref eroor")
    }
  }
  return (
    <><section className=" gradient-custom"style={{marginTop:"-100px"}}  >
  <div className="container py-5 h-100 ">
    <div className="row justify-content-center align-items-center h-100">
        <div className="card shadow-2-strong card-registration">
        <div className="row formshadow"  style={{borderRadius: "10px"}}>
        <div className="col-6  leftlogin" >
        <div className="d-flex align-items-center justify-content-center " style={{marginTop:"40px"}}><h1 style={{color:"#6D83F2"}}>Welcome !</h1></div>
          <div className="d-flex align-items-center justify-content-center"><img src={signin} alt="" /></div>
   
      </div>
         <div className="col-6 mt-4">
          <div className="card-body p-1 p-md-3 ">
            <h3 className="mb-4   d-flex justify-content-center" style={{color:"#6D83F2"}}>Registration</h3>
            <form  onSubmit={handleSubmit} >
                  <div className="row">
                <div className="col-md-6 mb-3">

                  <div className="form-outline">
                    <label className="form-label" htmlFor="firstName">First Name*</label>
                    <input type="text" id="firstName"value={data.firstname} onChange={handlechange} className="form-control form-control-lg" name="firstname"required/>
                  </div>

                </div>
                <div className="col-md-6 mb-3">

                  <div className="form-outline">
                    <label className="form-label" htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" value={data.lastname} onChange={handlechange} className="form-control form-control-lg" name="lastname" required/>
                  </div>

                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3 d-flex align-items-center">
                 <div className="form-outline">
                    <label className="form-label" htmlFor="emailAddress" >Email</label>
                    <input type="email" id="emailAddress" value={data.email} onChange={handlechange} className="form-control form-control-lg" name="email" required/>
                  </div>

                </div>
                <div className="col-md-6 mb-3 d-flex align-items-center">
                 <div className="form-outline">
                    <label className="form-label" htmlFor="rollno" >Rollno</label>
                    <input type="text" id="rollno" value={data.rollno} onChange={handlechange} className="form-control form-control-lg" name="rollno" required/>
                  </div>

                </div>
                </div>
              <div className="row">
                <div className="col-md-6 mb-3 d-flex align-items-center">
                 <div className="form-outline">
                    <label className="form-label" htmlFor="branch" >Branch</label>
                    <input type="text" id="branch" value={data.branch} onChange={handlechange} className="form-control form-control-lg" name="branch" required/>
                  </div>

                </div>
                <div className="col-md-6 mb-3 d-flex align-items-center">
                 <div className="form-outline">
                    <label className="form-label" htmlFor="degree" >Degree</label>
                    <input type="text" id="degree" value={data.degree} onChange={handlechange} className="form-control form-control-lg" name="degree" required/>
                  </div>

                </div>
                </div>
              <div className="row">
                <div className="col-md-6 mb-3 pb-2">
                 <div className="form-outline">
                    <label className="form-label" htmlFor="phoneNumber">Password</label>
                    <input type="password" id="password" value={data.password} onChange={handlechange} className="form-control form-control-lg"name="password" required/>
                  </div>

                </div>
                <div className="col-md-6 mb-3 pb-2">

                  <div className="form-outline">
                    <label className="form-label" htmlFor="phoneNumber">Confirm Password</label>
                    <input type="password" id="cpassword" value={data.cpassword} onChange={handlechange} className="form-control form-control-lg" name="cpassword" required/>
                  </div>

                </div>
              </div>

              <div className="mt-3 pt-2  d-flex justify-content-center">
                <input className="btn btn-primary btn-lg" type="submit" value="Register" />
              </div>

            </form>
            <div className="m-2 d-flex justify-content-center text-decoration-underline"> <Link to="/login">login</Link></div>

          </div>
        </div>
      </div>
    </div>
  </div>

  </div>
</section>
    </>
  )
}
