import React, { useEffect, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';






function Home({ insideSignUp }) {
    const [googleDetails, setGoogleDetails] = useState(null)
    const[userDetails,setUserDetails]=useState({
        username:"",password:"",email:""
    })
    // console.log(userDetails);

    const navigate = useNavigate()

    const handleLogin =()=>{
        const {username,password}=userDetails
        if(username&&password){
            navigate('/dashboard')
        }
        else{
            toast.warning("Please fill the form completely!!!")
        }
    }

    const handleRegister =()=>{
        const {username,password,email}=userDetails
        if(username&&password&&email){
            navigate('/')
            setUserDetails("")
        }
        else{
            toast.warning("Please fill the form completely!!!")
        }
    }

    useEffect(() => {
        if (googleDetails) {
            sessionStorage.setItem("user", JSON.stringify(googleDetails))
            toast.success("Login Successfull")
            setTimeout(() => {
                navigate('/dashboard')
            }, 2000);
        }

    }, [googleDetails])
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

                    <div className='text-center'>
                        <h3>Sign {insideSignUp ? 'Up' : 'In'}</h3>
                    </div>

                    <div className=' mt-5 d-flex  flex-column align-items-center'>

                        {insideSignUp &&
                            <FloatingLabel controlId="floatingPassword" label="Username" className=' mb-3 w-75 shadow'>
                                <Form.Control onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})} type="text" placeholder="Username" />
                            </FloatingLabel>
                        }

                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-3 w-75 shadow"
                        >
                            <Form.Control onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})} type="email" placeholder="name@example.com" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password" className='w-75 shadow'>
                            <Form.Control onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})} type="password" placeholder="Password" />
                        </FloatingLabel>

                        {insideSignUp ?
                            <button onClick={handleRegister} className='btn btn-primary mt-4 rounded mb-4 w-75'>Sign Up</button>
                            :
                            <button onClick={handleLogin} className='btn btn-primary mt-4 rounded mb-4 w-75'>Sign In</button>
                        }

                        <h5>or</h5>

                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                const result = jwtDecode(credentialResponse.credential)
                                setGoogleDetails(result)
                                console.log(result);
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />




                    </div>

                    <div className='text-center mt-2'>
                        {insideSignUp ?
                            <p>Already have an accout? <Link to={'/'} >Sign In</Link></p> :

                            <p>Don't have an account? <Link to={'/signup'} >Sign Up</Link></p>
                        }
                    </div>


                </div>

            </div>
            <ToastContainer position="top-center" theme="colored" autoClose={3000} />
        </>
    )
}

export default Home