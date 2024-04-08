import React, { useEffect, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';





function Home() {
    const[googleDetails,setGoogleDetails]=useState(null)
    const navigate=useNavigate()

    useEffect(()=>{
        if(googleDetails){
            sessionStorage.setItem("user",JSON.stringify(googleDetails))
            toast.success("Login Successfull")
            setTimeout(() => {
                navigate('/dashboard')
            }, 2000);
        }

    },[googleDetails])
    return (
        <>
            <div style={{ Height: '100vh' }} className='container row d-flex '>

                <div className="col-lg-6">
                    <img className='w-100' src="https://relprod.relianceanimation.in/dist/images/login_illustration1.png" alt="" />
                </div>


                <div className="col-lg-6 ">

                    <div className='text-center mt-5'>
                        <h2 className='fw-bolder'>Welcome <span className='text-primary'>Back</span></h2>
                    </div>

                    <div className=' mt-5 d-flex  flex-column align-items-center'>

                        <FloatingLabel controlId="floatingPassword" label="Username" className=' mb-3 w-75 shadow'>
                            <Form.Control type="text" placeholder="Username" />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-3 w-75 shadow"
                        >
                            <Form.Control type="email" placeholder="name@example.com" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password" className='w-75 shadow'>
                            <Form.Control type="password" placeholder="Password" />
                        </FloatingLabel>

                        <button className='btn btn-primary mt-4 rounded mb-4 w-75'>Sign Up</button>

                        <h5>or</h5>

                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                const result=jwtDecode(credentialResponse.credential)
                                setGoogleDetails(result)
                                console.log(result);
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />




                    </div>


                </div>

            </div>
            <ToastContainer position="top-center" theme="colored" autoClose={3000}/>
        </>
    )
}

export default Home