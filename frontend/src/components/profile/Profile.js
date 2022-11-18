import React, { useEffect } from 'react'
import './profile.css'
import axios from 'axios';
import { useState } from 'react';
export default function Profile(props) {
    const [edit,setedit]=useState(false);
    const [data,setData]=useState({
        firstname:"dds",
        lastname:"ds",
        email:"sds",
        rollno:"ds",
        branch:"dsds",
        degree:"dsds"
      });
   
   const getdata=async()=>{
    try {
        const url=`${process.env.REACT_APP_BACKENDURL}/profile`;
        const res=await axios.post(url,{
            user:props.user,
          });
        setData(res.data.data)
    } catch (error) {
        console.log("profileload error")
    }
   }
   useEffect(()=>{
    getdata()
   },[])
      const updateprofile=async()=>{
        try {
          const url=`${process.env.REACT_APP_BACKENDURL}/profile`;
          const {data:res}=await axios.post(url,{
            user:props.user,
            data:data
          });
          // console.log("hhh",d)
        } catch (error) {
          console.log("ref eroor")
        }
      }
      const handlechange=({currentTarget:input})=>{
        setData({...data,[input.name]:input.value});
      }
      const isupdate=async()=>{
        if(edit===false){
            updateprofile();
        }
        setedit(false);
      }
  return (
    <>
    <div className="container w-75 profilecard"  >
        <div className="row " style={{minHeight:"80vh"}}>
            <div className="col-4 leftprofile" >33</div>
            <div className="col-8 rightprofile" >
                <form >
            <div className="row mt-4">
                 <div className="col-sm-2">
                    <label className="form-label" htmlFor="firstname">FirstName</label></div>
                    <div className="col-sm-6">
                        <p style={{display:`${edit!==false?"none":"block"}`}}>{data.firstname}</p>
                    <input  style={{display:`${edit===false?"none":"block"}`}}type="text" id="firstname" value={data.firstname} onChange={handlechange} className="form-control form-control-md readonly" name="firstname" required/>
                  
                  </div>
                
              </div>
            <div className="row mt-4">
                 <div className="col-sm-2">
                    <label className="form-label" htmlFor="lastname">Lastname</label></div>
                    <div className="col-sm-6">
                    <p style={{display:`${edit!==false?"none":"block"}`}}>{data.lastname}</p>

                    <input style={{display:`${edit===false?"none":"block"}`}} type="text" id="lastname" value={data.lastname} onChange={handlechange} className="form-control form-control-md" name="lastname" required/>
                  
                  </div>
                
              </div>
            <div className="row mt-4">
                 <div className="col-sm-2">
                    <label className="form-label" htmlFor="email">Email</label></div>
                    <div className="col-sm-6">
                    <p style={{display:`${edit!==false?"none":"block"}`}}>{data.email}</p>

                    <input style={{display:`${edit===false?"none":"block"}`}} type="text" id="email" value={data.email} onChange={handlechange} className="form-control form-control-md" name="email" required/>
                  
                  </div>
                
              </div>
            <div className="row mt-4">
                 <div className="col-sm-2">
                    <label className="form-label" htmlFor="rollno">Roll No</label></div>
                    <div className="col-sm-6">
                    <p style={{display:`${edit!==false?"none":"block"}`}}>{data.rollno}</p>
                    <input style={{display:`${edit===false?"none":"block"}`}} type="text" id="rollno" value={data.rollno} onChange={handlechange} className="form-control form-control-md" name="rollno" required/>
                  
                  </div>
                
              </div>
            <div className="row mt-4">
                 <div className="col-sm-2">
                    <label className="form-label" htmlFor="rollno">Branch</label></div>
                    <div className="col-sm-6">
                    <p style={{display:`${edit!==false?"none":"block"}`}}>{data.branch}</p>
                    <input style={{display:`${edit===false?"none":"block"}`}} type="text" id="branch" value={data.branch} onChange={handlechange} className="form-control form-control-md" name="branch" required/>
                  
                  </div>
                
              </div>
            <div className="row mt-4">
                 <div className="col-sm-2">
                    <label className="form-label" htmlFor="rollno">Degree</label></div>
                    <div className="col-sm-6">
                    <p style={{display:`${edit!==false?"none":"block"}`}}>{data.degree}</p>
                    <input style={{display:`${edit===false?"none":"block"}`}} type="text" id="degree" value={data.rollno} onChange={handlechange} className="form-control form-control-md" name="degree" required/>
                  
                  </div>
                
              </div>
         <div className=' mt-4 d-flex justify-content-center'>
          <div className="row ">
            <button className='btn btn-info'  style={{display:`${edit!==false?"none":"block"}`}}>Edit Profile</button>
            <button className='btn btn-info'  style={{display:`${edit===false?"none":"block"}`}} >Update Profile</button>
          </div>
          </div>
          </form>
            </div>
        </div>
    </div>
    </>
  )
}
