import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Addblog from './components/Addblog'
import Login from './components/Login'
import PrivateRoutes from './components/PrivateRoutes'
import LearnMore from './components/LearnMore'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route element={<PrivateRoutes/>}>
          <Route path='/addblog' element={<Addblog/>}></Route>
        </Route>
        <Route path='/more' element={<LearnMore/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </div>
  )
}

export default App
