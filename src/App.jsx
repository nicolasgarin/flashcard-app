import { useState } from 'react'
import { Route, Routes } from "react-router"
import './App.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/pages/Home'
import Stats from './components/pages/Stats'

function App() {
  const [infoResp, setInfoResp] = useState([])
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])
  const [catActual, setCatActual] = useState('')

  return (
    <>
      <Header infoResp={infoResp} setInfoResp={setInfoResp} setFlashcards={setFlashcards} />
      <Routes>
        <Route path="/" element={<Home infoResp={infoResp} setInfoResp={setInfoResp} flashcards={flashcards} setFlashcards={setFlashcards} categories={categories} setCategories={setCategories} catActual={catActual} setCatActual={setCatActual} />} />
        <Route path='/stats' element={<Stats infoResp={infoResp} />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
