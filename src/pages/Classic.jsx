import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import FlashCardList from '../components/FlashCardList'
import { useGame } from '../context/GameContext';
import { useUserOptions } from '../context/UserOptionsContext';

export default function Classic() {
  const { theme } = useUserOptions()
  const [unflipedCards, setUnflipedCards] = useState(false)
  const categoryEl = useRef()
  const amountEl = useRef()
  const { setCategories, infoResp, setCardHeights, setFlashcards, setCatActual, flashcards, categories } = useGame()

  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then(res => {
        setCategories(res.data.trivia_categories)
      })
  }, [])
  useEffect(areAllFliped, [infoResp])


  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  function handleSubmit(e) {
    e.preventDefault()
    setCardHeights([])
    axios
      .get('https://opentdb.com/api.php', {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value
        }
      })
      .then(res => {
        setFlashcards(res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer)
          const options = [
            ...questionItem.incorrect_answers.map(a => decodeString(a)
            ),
            answer
          ]
          return {
            id: uuidv4(),
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - .5),
            flip: false,
            userAnswer: ''
          }
        }))
      })
    setCatActual(categoryEl.current.options[categoryEl.current.selectedIndex].text)
    setUnflipedCards(true)
  }

  function areAllFliped() {
    let noFliped = []
    if (flashcards.length > 0) {
      noFliped = flashcards.filter(flashcard => flashcard.flip == false)
    }
    if (noFliped.length == 0) {
      setUnflipedCards(false)
    } else {
      setUnflipedCards(true)
    }
  }

  return (
    <>
      <div className={`header-sub ${theme}`}>
        <div className='container d-flex justify-content-end'>
          <form className='d-flex' onSubmit={handleSubmit}>
            <div className='form-group'>
              <label className='d-flex align-items-center' htmlFor='category'>Categoría</label>
              <select className='input uno' id='category' ref={categoryEl}>
                {categories.map(category => {
                  return <option value={category.id} key={category.id}>{category.name}</option>
                })}
              </select>
            </div>
            <div className='form-group'>
              <label className='d-flex align-items-center' htmlFor='amount'>Cantidad de preguntas</label>
              <input className='input dos' type='number' id='amount' min='1' step='1' defaultValue={5} ref={amountEl} />
            </div>
            <div className='form-group'>
              <button className='btn' disabled={unflipedCards ? true : false}>Generar</button>
            </div>
          </form>
        </div>
      </div>
      <div className={`body ${theme}`}>
        <div className='container'>
          {
            flashcards.length > 0 ?
              <FlashCardList />
              :
              <div>
                <h2>Modo Classic</h2>
                <p>Para jugar, elije una categoría y la cantidad de preguntas que quieras responder y pulsa el botón generar.</p>
                <p>Para volver a generar nuevas preguntas con diferente categoría o cantidad de tarjetas, contesta todas las preguntas activas.</p>            </div>
          }
        </div>
      </div>
    </>
  )
}
