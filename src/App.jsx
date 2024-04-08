import './App.css'
import {Routes,Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Home from './components/Home'



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </>
  )
}

export default App
