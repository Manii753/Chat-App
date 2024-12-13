import { Routes,Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import useAuthStore from './store/useAuthStore'
import { useEffect } from 'react'
import {Loader }from "lucide-react";
import {Toaster} from "react-hot-toast";

const App = () => {

  const { isCheckingAuth , authUser, checkAuth} = useAuthStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  console.log("authUser checked");

  if(isCheckingAuth && !authUser){
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='animate-spin'/>
      </div>
    )
  }






  return (
    <div>
      <Navbar/>

      <Routes>
        <Route path='/' element={authUser ? <Homepage/> : <Navigate to="/login"/>}/>
        <Route path='/signup' element={!authUser ?<SignupPage/>:<Navigate to="/"/>}/>
        <Route path='/login' element={!authUser ? <LoginPage/>:<Navigate to="/"/>}/> 
        <Route path='/profile' element={authUser ? <ProfilePage/>:<Navigate to="/login"/>}/>
        <Route path='/settings' element={<SettingsPage/>}/>
      </Routes>

      <Toaster/>

    </div>
  )
}

export default App