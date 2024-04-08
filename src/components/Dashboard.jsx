import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Dashboard() {
  const navigate = useNavigate()
  const data = JSON.parse(sessionStorage.getItem("user"))

  const handleLogout = () => {
    toast.warning('Logout successfull')
    setTimeout(() => {
      navigate('/')
    }, 2000);

  }
  return (
    <>
      <div>
        <Navbar expand="lg" className="bg-primary">
          <Container>
            <Navbar.Brand className='ms-auto ' href="#">
              <button onClick={handleLogout} className='btn btn-danger shadow '>LogOut</button>
            </Navbar.Brand>
          </Container>
        </Navbar>



        <div className='log d-flex flex-column justify-content-center align-items-center' style={{height:"100vh"}}>
        <div className='d-flex align-items-center'>
          <h1 className='me-2 mb-0'>Hii.... {data.name.toUpperCase()}</h1>
        </div>
    
        <img className='img-fluid' src="https://cdni.iconscout.com/illustration/premium/thumb/welcome-board-3688623-3231454.png" alt="" />
      </div>
      </div>

      <ToastContainer position="top-center" theme="colored" autoClose={3000} />

    </>
  )
}

export default Dashboard