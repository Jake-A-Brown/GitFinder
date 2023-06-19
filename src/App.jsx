// eslint-disable-next-line no-unused-vars
import React, {  } from 'react';
import {Routes, Route} from 'react-router-dom';
import Logo from './components/Logo';
import Users from './Routes/Users';
import UserInfo from './Routes/UserInfo';

const App=()=> {

  return (
    <div className='min-h-screen bg-black'>
      <div className='container text-gray-200 py-3'>
        <Logo />
        <Routes>
          <Route path='/' element={<Users/>}></Route>
          <Route path='/:name' element={<UserInfo/>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
