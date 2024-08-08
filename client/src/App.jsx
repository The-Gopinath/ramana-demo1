import { useState } from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Eventpage from './Eventpage';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Eventpage/>}/>
      </Routes>
    </>
  )
}

export default App
