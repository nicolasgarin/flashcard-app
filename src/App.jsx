import { useState } from 'react'
import { Route, Routes } from "react-router"
import './App.scss'
import Header from './layouts/Header'
import Footer from './layouts/Footer'
import Classic from './pages/Classic'
import Stats from './pages/Stats'
import InitGame from './pages/InitGame'
import Survival from './pages/Survival'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<InitGame />} />
        <Route path="/classic" element={<Classic />} />
        <Route path="/survival" element={<Survival />} />
        <Route path='/stats' element={<Stats />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App