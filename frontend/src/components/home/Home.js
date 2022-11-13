import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Home(props) {
  const notify = () => toast.success(`${props.loginmsg}`,{
    position:"top-center",
    autoClose:3000,
    theme:"colored"
  });
  useEffect(()=>{
    notify();
  },[])
  return (
    <>
    <div >home</div>
    <ToastContainer/>
    </>
  )
}
