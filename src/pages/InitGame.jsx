import React from 'react'
import { Link } from 'react-router-dom'
import { BsPhoneFlip } from 'react-icons/bs';
import { IoMdHeartHalf } from "react-icons/io";
import { useGame } from '../context/GameContext';
import { useUserOptions } from '../context/UserOptionsContext';

export default function InitMessage() {
  const { theme } =useUserOptions()
  const { setGameMode } = useGame()

  function gameMode(mode) {
    setGameMode(mode)
  }

  return (
    <div className={`body ${theme}`}>
      <div className='container'>
        <div className='initMessage'>
          <h2>Juego de preguntas y respuestas</h2>
          <p>Elige entre más de 15 categorías de preguntas para aprender y demostrar tu conocimiento. Analiza tus estadísticas para conocer tus fuertes y debilidades, o simplemente diviértete aprendiendo.</p>
          <p>Para contestar una pregunta, lee con atención la misma y sus posibles respuestas, piensa en tu respuesta final, seleccionala y luego cliquea en el boton Flip! para ver la respuesta correcta. Ojo! una vez flipeada la tarjeta, no podrás volver a contestarla.</p>          <div>Selecciona un modo de juego:</div>
          <div className='game-modes d-flex justify-content-center'>
            <div className='mode-card'>
              <Link to={'/classic'}>
                <button className='btn mode' onClick={() => gameMode('classic')}>
                  <div className='front'>
                    <div className='mode-icon'> <BsPhoneFlip /></div>
                    <div className='mode-name'>Classic</div>
                  </div>
                  <div className='back'>
                    <div className='mode-decript'>Selecciona categorías y cantidad de preguntas de manera libre</div>
                  </div>
                </button>
              </Link>
            </div>
            <div className='mode-card'>
              <Link to={'/survival'}>
                <button className='btn mode' onClick={() => gameMode('survival')}>
                  <div className='front'>
                    <div className='mode-icon'> <IoMdHeartHalf /></div>
                    <div className='mode-name'>Survival</div>
                  </div>
                  <div className='back'>
                    <div className='mode-decript'>Contesta preguntas hasta que quedes sin vidas</div>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
