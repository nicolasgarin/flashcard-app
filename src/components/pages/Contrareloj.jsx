import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import FlashCardList from '../FlashCardList';

export default function Contrareloj({ gameMode, tiempo, setTiempo, flashcards, setFlashcards, categories, setCategories, infoResp, setInfoResp, catActual, setCatActual, cardHeights, setCardHeights }) {
  const [unflipedCards, setUnflipedCards] = useState(false)

  const categoryEl = useRef()
  const amountEl = useRef()

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
          amount: 20,
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
    setTiempo(amountEl.current.value)
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
              <label className='d-flex align-items-center' htmlFor='amount'>Tiempo</label>
              <select className='input tres' id='dificultad' ref={amountEl}>
                <option value={90} key={'facil'}>3:00</option>
                <option value={60} key={'intermedio'}>1:00</option>
                <option value={30} key={'dificil'}>0:30</option>
              </select>
            </div>
            <div className='form-group'>
              <button className='btn' disabled={false}>Empezar</button>
            </div>
          </form>
        </div>
      </div>
      <div className='body'>
        <div className='container'>
          {
            flashcards.length > 0 && tiempo != 0?
              <FlashCardList gameMode={gameMode} catActual={catActual} flashcards={flashcards} setFlashcards={setFlashcards} infoResp={infoResp} setInfoResp={setInfoResp} cardHeights={cardHeights} setCardHeights={setCardHeights} />
              :
              tiempo == 0 ?
                <div>
                  <h2>Juego terminado</h2>
                  <p>Lograste contestar correctamente {infoResp.filter(info => info.acierto == true).length} preguntas</p>
                  <p>Inténtalo nuevamente!</p>
                </div>
                :
                <div>
                  <h2>Modo Contrareloj</h2>
                  <p>Para jugar elije una categoría, elije el nivel de dificultad que deseas y pulsa el botón iniciar.</p>
                  <p>Nivel fácil: 10 vidas<br />
                    Nivel intermedio: 5 vidas<br />
                    Nivel fidícil: 3 vidas<br />
                    Nivel experto: 1 vida</p>
                  <p>Iniciarás con 30 preguntas. Deberás responder todas las preguntas que puedas hasta quedar sin vidas, o hasta terminar las preguntas.</p>
                  <p>Al terminar el juego podrás volver a generar preguntas con una categoría o dificultad diferente.</p>
                  <p>Suerte!</p>
                </div>
          }
        </div>
      </div>

    </>
  )
}
