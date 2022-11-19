import React, { useEffect } from 'react'
import './profile.css'
import axios from 'axios';
import { useState } from 'react';
import pimg from "./profiletwo.svg"
export default function Profile(props) {
    const [edit,setedit]=useState(false);
     const [totalcredit,settotalcredit]=useState(0);
   const [totalcourse,settotalcourse]=useState(0);
    const [data,setData]=useState({
        firstname:"",
        lastname:"",
        email:"",
        rollno:"",
        branch:"",
        degree:""
      });
   
   const getdata=async()=>{
    try {
        const url=`${process.env.REACT_APP_BACKENDURL}/profile`;
        const res=await axios.post(url,{
            user:props.user,
          });
        setData(res.data.data)
        settotalcourse(res.data.totalcourse);
        settotalcredit(res.data.totalcredit);
    } catch (error) {
        console.log("profileload error")
    }
   }
   useEffect(()=>{
    getdata()
   },[])
      const updateprofile=async()=>{
        try {
          const url=`${process.env.REACT_APP_BACKENDURL}/editprofile`;
          const {data:res}=await axios.post(url,{
            user:props.user,
            data:data
          });
        } catch (error) {
          console.log("ref eroor")
        }
      }
      const handlechange=({currentTarget:input})=>{
        setData({...data,[input.name]:input.value});
      }
      const isupdate=async()=>{
  
          updateprofile();
          setedit(false);
     
      }
  return (
    <>
    <div className="container w-75 profilecard" >
        <div className="row " style={{minHeight:"80vh"}}>
            <div className="col-4 leftprofile" >
              <div className="row mt-4 d-flex justify-content-center"style={{minHeight:"30%"}}>
              <img src={pimg}alt=""style={{height:"200px",width:"200px"}} />
              <h6 className='text-center'>{data.firstname}  {data.lastname}</h6>
              <h6 className='text-center'> {data.email}</h6>
              </div>
              <div className="row text-center" >
                <h6>Total courses : {totalcourse}</h6>
                <h6>Total credits  : {totalcredit}</h6>
                <h6>Remaining credits  : {160-totalcredit}</h6>
              
              </div>
            </div>
            <div className="col-8 rightprofile" >
                <form >
            <div className="row mt-4 ">
                 <div className="col-sm-2">
                    <label className="form-label" htmlFor="firstname"> <h6>FirstName:</h6></label></div>
                    <div className="col-sm-6">
                        <h6 style={{display:`${edit!==false?"none":"block"}`}}>{data.firstname}</h6>
                    <input  style={{display:`${edit===false?"none":"block"}`}}type="text" id="firstname" value={data.firstname} onChange={handlechange} className="form-control form-control-md readonly" name="firstname" required/>
                  
                  </div>
                
              </div>
            <div className="row mt-4">
                 <div className="col-sm-2">
                    <label className="form-label" htmlFor="lastname"> <h6>Lastname :</h6></label></div>
                    <div className="col-sm-6">
                    <h6 style={{display:`${edit!==false?"none":"block"}`}}>{data.lastname}</h6>

                    <input style={{display:`${edit===false?"none":"block"}`}} type="text" id="lastname" value={data.lastname} onChange={handlechange} className="form-control form-control-md" name="lastname" required/>
                  
                  </div>
                
              </div>
            <div className="row mt-4">
                 <div className="col-sm-2">
                    <label className="form-label" htmlFor="email"> <h6>Email :</h6></label></div>
                    <div className="col-sm-6">
                    <h6 style={{display:`${edit!==false?"none":"block"}`}}>{data.email}</h6>

                    <input style={{display:`${edit===false?"none":"block"}`}} type="text" id="email" value={data.email} onChange={handlechange} className="form-control form-control-md" name="email" required/>
                  
                  </div>
                
              </div>
            <div className="row mt-4">
                 <div className="col-sm-2">
                    <label className="form-label" htmlFor="rollno"> <h6>Roll No :</h6></label></div>
                    <div className="col-sm-6">
                    <h6 style={{display:`${edit!==false?"none":"block"}`}}>{data.rollno}</h6>
                    <input style={{display:`${edit===false?"none":"block"}`}} type="text" id="rollno" value={data.rollno} onChange={handlechange} className="form-control form-control-md" name="rollno" required/>
                  
                  </div>
                
              </div>
            <div className="row mt-4">
                 <div className="col-sm-2">
                    <label className="form-label" htmlFor="rollno"><h6>Branch :</h6></label></div>
                    <div className="col-sm-6">
                    <h6 style={{display:`${edit!==false?"none":"block"}`}}>{data.branch}</h6>
                    <input style={{display:`${edit===false?"none":"block"}`}} type="text" id="branch" value={data.branch} onChange={handlechange} className="form-control form-control-md" name="branch" required/>
                  
                  </div>
                
              </div>
            <div className="row mt-4">
                 <div className="col-sm-2">
                    <label className="form-label" htmlFor="rollno"><h6>Degree :</h6></label></div>
                    <div className="col-sm-6">
                    <h6 style={{display:`${edit!==false?"none":"block"}`}}>{data.degree}</h6>
                    <input style={{display:`${edit===false?"none":"block"}`}} type="text" id="degree" value={data.rollno} onChange={handlechange} className="form-control form-control-md" name="degree" required/>
                  
                  </div>
                
              </div>
         <div className=' mt-4 d-flex justify-content-center'>
          <div className="row ">
          <input className="btn btn-primary btn-sm" onClick={()=>{
            setedit(true)
          }}style={{display:`${edit!==false?"none":"block"}`}} value="Edit profile" />
          <input className="btn btn-primary btn-sm" onClick={()=>{
              setedit(false)
              isupdate();          
          }}style={{display:`${edit===false?"none":"block"}`}}   value="Update profile" />
          </div>
          </div>
          </form>
            </div>
        </div>
    </div>
    </>
  )
}
