import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate=useNavigate()
  const handlechange=({currentTarget:input})=>{
    setData({...data,[input.name]:input.value});
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const url=`${process.env.REACT_APP_BACKENDURL}/signin`;
      const {data:res}=await axios.post(url,data);
      navigate("/signin")
      console.log(res.message)
    } catch (error) {
      
    }
  }
  return (
    <><section className="vh-100 gradient-custom">
  <div className="container py-5 h-100">
    <div className="row justify-content-center align-items-center h-100">
      <div className="col-12 col-lg-9 col-xl-7">
        <div className="card shadow-2-strong card-registration" style={{borderRadius: "15px"}}>
          <div className="card-body p-4 p-md-5">
            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
            <form  onSubmit={handleSubmit} >
                  <div className="row">
                <div className="col-md-6 mb-4">

                  <div className="form-outline">
                    <label className="form-label" htmlFor="firstName">First Name*</label>
                    <input type="text" id="firstName"value={data.firstname} onChange={handlechange}className="form-control form-control-lg" name="firstname"required/>
                  </div>

                </div>
                <div className="col-md-6 mb-4">

                  <div className="form-outline">
                    <label className="form-label" htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" value={data.lastname} onChange={handlechange}className="form-control form-control-lg" name="lastname" required/>
                  </div>

                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-4 d-flex align-items-center">
                 <div className="form-outline">
                    <label className="form-label" htmlFor="emailAddress" >Email</label>
                    <input type="email" id="emailAddress" value={data.email} onChange={handlechange} className="form-control form-control-lg" name="email" required/>
                  </div>

                </div>
                <div className="col-md-6 mb-4 d-flex align-items-center">
                 <div className="form-outline">
                    <label className="form-label" htmlFor="rollno" >Rollno</label>
                    <input type="text" id="rollno" value={data.rollno} onChange={handlechange} className="form-control form-control-lg" name="rollno" required/>
                  </div>

                </div>
                </div>
              <div className="row">
                <div className="col-md-6 mb-4 d-flex align-items-center">
                 <div className="form-outline">
                    <label className="form-label" htmlFor="branch" >Branch</label>
                    <input type="text" id="branch" value={data.branch} onChange={handlechange} className="form-control form-control-lg" name="branch" required/>
                  </div>

                </div>
                <div className="col-md-6 mb-4 d-flex align-items-center">
                 <div className="form-outline">
                    <label className="form-label" htmlFor="degree" >Degree</label>
                    <input type="text" id="degree" value={data.degree} onChange={handlechange} className="form-control form-control-lg" name="degree" required/>
                  </div>

                </div>
                </div>
              <div className="row">
                <div className="col-md-6 mb-4 pb-2">
                 <div className="form-outline">
                    <label className="form-label" htmlFor="phoneNumber">Password</label>
                    <input type="password" id="password" value={data.password} onChange={handlechange} className="form-control form-control-lg"name="password" required/>
                  </div>

                </div>
                <div className="col-md-6 mb-4 pb-2">

                  <div className="form-outline">
                    <label className="form-label" htmlFor="phoneNumber">Confirm Password</label>
                    <input type="password" id="cpassword" value={data.cpassword} onChange={handlechange} className="form-control form-control-lg" name="cpassword" required/>
                  </div>

                </div>
              </div>

              <div className="mt-4 pt-2">
                <input className="btn btn-primary btn-lg" type="submit" value="Register" />
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}
