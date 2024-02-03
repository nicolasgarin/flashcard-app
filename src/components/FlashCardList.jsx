import React, { useEffect, useState } from 'react'
import FlashCard from './FlashCard'
import { useGame } from '../context/GameContext'

export default function FlashCardList({ restaVidas }) {
  const [height, setHeight] = useState('initial')
  const { flashcards, cardHeights } = useGame()
  useEffect(setMaxHeight, [cardHeights])

  function setMaxHeight() {
    setHeight(Math.max(...cardHeights))
  }

  return (
    <div className='row pt-3'>
      {flashcards.map(flashcard => {
        return <div className='col-sm-6 col-md-4 col-lg-3 mb-3'>
          <FlashCard flashcard={flashcard} height={height} restaVidas={restaVidas} />
        </div>
      })}
    </div>
  )
}
