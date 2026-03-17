import React from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Protectedroutes from './services/routes/Protectedroutes'
import Profile from './pages/Settings/Profile'
import Users from './pages/Users'
import Products from './pages/Products'
import Sales from './pages/Sales'
import Othersettings from './pages/Settings/Othersettings'
// import Productform  from './components/Productform'



const App = () => {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />


          <Route element={<Protectedroutes><Layout /></Protectedroutes>}>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path='users' element = {<Users/>} />
            <Route path='products' element = {<Products/>} />
            <Route path='sales' element = {<Sales/>} />
            <Route path = "profile" element= {<Profile/>}/>
            <Route  path='systemsettings' element = {<Othersettings/>} />
           {/* <Route path='Productform' element = {<Productform/>} /> */}

      
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
