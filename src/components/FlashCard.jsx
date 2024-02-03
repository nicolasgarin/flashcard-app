import React, { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useGame } from '../context/GameContext';

export default function FlashCard({ restaVidas, flashcard, height }) {
  const [btnActive, setBtnActive] = useState(false)
  const [userAnswer, setUserAnswer] = useState(flashcard.userAnswer)
  const frontEl = useRef()
  const backEl = useRef()
  const flipBtn = useRef()
  const { gameMode, flashcards, setFlashcards, catActual, infoResp, setInfoResp, setCardHeights } = useGame()
  const [flip, setFlip] = useState(flashcard.flip)


  useEffect(setCardMaxHeight, [flashcard.question, flashcard.answer, flashcard.options])
  useEffect(() => {
    window.addEventListener('resize', setCardMaxHeight)
    return () => window.removeEventListener('resize', setCardMaxHeight)
  }, [])
  useEffect(updateFlip, [flashcard.flip])

  function updateFlip() {
    setFlip(flashcard.flip)
  }

  function setCardMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height
    const backHeight = backEl.current.getBoundingClientRect().height
    setCardHeights(currentHeights => [...currentHeights, Math.max(frontHeight, backHeight, 100)])
  }

  function updateInfoResp(acierto) {
    setInfoResp([
      ...infoResp,
      {
        idCard: flashcard.id,
        categoria: catActual,
        acierto: acierto,
      }
    ])
  }

  function handleFlip() {
    setFlip(!flip)
    if (userAnswer == flashcard.answer) {
      updateInfoResp(true)
    } else {
      updateInfoResp(false)
      if (gameMode == 'survival') {
        restaVidas()
      }
    }
    const update = flashcards.map(existingFlashcards => existingFlashcards.id == flashcard.id ? { ...existingFlashcards, flip: true, userAnswer: userAnswer } : existingFlashcards)
    setFlashcards(update)
  }

  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      style={{ height: height }}
    >
      <div className='front' ref={frontEl}>
        <div>{flashcard.question}</div>
        <div className='flashcard-options'>
          {flashcard.options.map(option => {
            return <div key={option}>
              <label className='flashcard-option d-flex align-items-center' htmlFor={option}>
                {option}
                <input
                  className='radiobutton'
                  type="radio"
                  value={option}
                  name={`options-${flashcard.id}`}
                  id={uuidv4()}
                  onChange={() => { setBtnActive(true) }}
                  onClick={() => { setUserAnswer(option); setOpActive(true) }}
                />
              </label>
            </div>
          })}
        </div>
        <div className='d-flex justify-content-end'>
          <button onClick={handleFlip} ref={flipBtn} disabled={btnActive ? '' : true} className='btn'>Flip!</button>
        </div>
      </div>
      <div className={`back d-flex flex-column ${userAnswer == flashcard.answer ? 'correct' : userAnswer == '' ? '' : 'error'}`} ref={backEl}>
        <div>{flashcard.question}</div>
        <div className='answer'>{flashcard.answer}</div>
      </div>
    </div>
  )
}
