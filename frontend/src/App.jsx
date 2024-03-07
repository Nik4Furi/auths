import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import {Toaster} from 'react-hot-toast'

//Pages
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {

  return (
    <>
      <BrowserRouter >

        <Routes >
          {/* Home/Secret Page  */}
          <Route path='/users' element={<Home />} ></Route>

          {/* Register Page  */}
          <Route path='/register' element={<Register />} ></Route>

          {/* Login Page  */}
          <Route path='/' element={<Login />} ></Route>


        </Routes>

        <Toaster />

      </BrowserRouter>
    </>
  )
}

export default App
