import { useState } from 'react'
import { Route, Routes } from "react-router"
import './App.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import Classic from './components/pages/Classic'
import Stats from './components/pages/Stats'
import InitGame from './components/pages/InitGame'
import Survival from './components/pages/Survival'
import Contrareloj from './components/pages/Contrareloj'

function App() {
  const [gameMode, setGameMode] = useState('')
  const [infoResp, setInfoResp] = useState([])
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])
  const [catActual, setCatActual] = useState('')
  const [cardHeights, setCardHeights] = useState([])
  const [vidas, setVidas] = useState()

  return (
    <>
      <Header gameMode={gameMode} setGameMode={setGameMode} infoResp={infoResp} setInfoResp={setInfoResp} flashcards={flashcards} setFlashcards={setFlashcards} setCardHeights={setCardHeights} vidas={vidas} />
      <Routes>
        <Route path='/' element={<InitGame setGameMode={setGameMode} />} />
        <Route path="/classic" element={<Classic infoResp={infoResp} setInfoResp={setInfoResp} flashcards={flashcards} setFlashcards={setFlashcards} categories={categories} setCategories={setCategories} catActual={catActual} setCatActual={setCatActual} cardHeights={cardHeights} setCardHeights={setCardHeights} />} />
        <Route path="/contrareloj" element={<Contrareloj infoResp={infoResp} setInfoResp={setInfoResp} flashcards={flashcards} setFlashcards={setFlashcards} categories={categories} setCategories={setCategories} catActual={catActual} setCatActual={setCatActual} cardHeights={cardHeights} setCardHeights={setCardHeights} />} />
        <Route path="/survival" element={<Survival gameMode={gameMode} vidas={vidas} setVidas={setVidas} infoResp={infoResp} setInfoResp={setInfoResp} flashcards={flashcards} setFlashcards={setFlashcards} categories={categories} setCategories={setCategories} catActual={catActual} setCatActual={setCatActual} cardHeights={cardHeights} setCardHeights={setCardHeights} />} />
        <Route path='/stats' element={<Stats infoResp={infoResp} />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
