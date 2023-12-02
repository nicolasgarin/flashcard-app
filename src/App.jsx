import { useState } from 'react'
import { Route, Routes } from "react-router"
import './App.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import Classic from './components/pages/Classic'
import Stats from './components/pages/Stats'
import InitGame from './components/pages/InitGame'

function App() {
  const [gameMode, setGameMode] = useState('')
  const [infoResp, setInfoResp] = useState([])
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])
  const [catActual, setCatActual] = useState('')
  const [cardHeights, setCardHeights] = useState([])

  return (
    <>
      <Header gameMode={gameMode} infoResp={infoResp} setInfoResp={setInfoResp} flashcards={flashcards} setFlashcards={setFlashcards} setCardHeights={setCardHeights} />
      <Routes>
        <Route path='/' element={<InitGame setGameMode={setGameMode} />} />
        <Route path="/classic" element={<Classic infoResp={infoResp} setInfoResp={setInfoResp} flashcards={flashcards} setFlashcards={setFlashcards} categories={categories} setCategories={setCategories} catActual={catActual} setCatActual={setCatActual} cardHeights={cardHeights} setCardHeights={setCardHeights} />} />
        <Route path='/stats' element={<Stats infoResp={infoResp} />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
