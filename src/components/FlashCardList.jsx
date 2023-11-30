import React from 'react'
import FlashCard from './FlashCard'

export default function FlashCardList({ flashcards, setFlashcards, infoResp, setInfoResp, catActual }) {
  return (
    <div className='row pt-3'>
      {flashcards.map(flashcard => {
        return <div className='col-sm-6 col-md-4 col-lg-3 mb-3'>
          <FlashCard flashcard={flashcard} flashcards={flashcards} setFlashcards={setFlashcards} key={flashcard.id} catActual={catActual} infoResp={infoResp} setInfoResp={setInfoResp} />
        </div>
      })}
    </div>
  )
}
