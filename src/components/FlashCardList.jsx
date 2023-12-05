import React, { useEffect, useState } from 'react'
import FlashCard from './FlashCard'

export default function FlashCardList({ gameMode, restaVidas, flashcards, setFlashcards, infoResp, setInfoResp, catActual, cardHeights, setCardHeights }) {
  const [height, setHeight] = useState('initial')

  useEffect(setMaxHeight, [cardHeights])

  function setMaxHeight() {
    setHeight(Math.max(...cardHeights))
  }

  return (
    <div className='row pt-3'>
      {flashcards.map(flashcard => {
        return <div className='col-sm-6 col-md-4 col-lg-3 mb-3'>
          <FlashCard  gameMode={gameMode} restaVidas={restaVidas} flashcard={flashcard} flashcards={flashcards} setFlashcards={setFlashcards} key={flashcard.id} catActual={catActual} infoResp={infoResp} setInfoResp={setInfoResp} height={height} setCardHeights={setCardHeights} />
        </div>
      })}
    </div>
  )
}
