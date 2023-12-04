import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import FlashCardList from '../FlashCardList';

export default function Survival({ vidas, setVidas, flashcards, setFlashcards, categories, setCategories, infoResp, setInfoResp, catActual, setCatActual, cardHeights, setCardHeights }) {
  
  const categoryEl = useRef()
  const amountEl = useRef()

  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then(res => {
        setCategories(res.data.trivia_categories)
      })
  }, [])
  
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
    setVidas(amountEl.current.value)
  }

  return (
    <>
      <div className='header-sub'>
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
              <select className='input tres' id='dificultad' ref={amountEl}>
                <option value={5} key={'facil'}>Fácil</option>
                <option value={3} key={'intermedio'}>Intermedio</option>
                <option value={1} key={'dificil'}>Difícil</option>
              </select>
            </div>
            <div className='form-group'>
              <button className='btn'>Empezar</button>
            </div>
          </form>{console.log(vidas - infoResp.filter(info => info.acierto == false).length)}
        </div>
      </div>
      <div className='body'>
        <div className='container'>
          {
            flashcards.length > 0 && vidas - infoResp.filter(info => info.acierto == false).length != 0 ? 
            <FlashCardList catActual={catActual} flashcards={flashcards} setFlashcards={setFlashcards} infoResp={infoResp} setInfoResp={setInfoResp} cardHeights={cardHeights} setCardHeights={setCardHeights} /> 
            : 
            vidas - infoResp.filter(info => info.acierto == false).length == 0 ? 
            <div>
              <h2>Juego terminado</h2>
              <p>Lograste contestar correctamente {infoResp.filter(info => info.acierto == true).length} preguntas</p>
            </div>
            :
            <div>
              <h2>Modo Survival</h2>
              <p>Para jugar, elije una categoría, elije la cantidad de tarjetas que quieras responder y pulsa el botón generar.</p>
              <p>Para volver a generar nuevas preguntas con la misma categoría o una diferente, contesta todas las preguntas activas.</p>
            </div>
          }
        </div>
      </div>
    </>
  )
}
