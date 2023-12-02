import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ gameMode, infoResp, setInfoResp, flashcards, setFlashcards, setCardHeights }) {
    const [hayStats, setHayStats] = useState(false)
    const navigate = useNavigate()
    useEffect(juegoComenzado, [infoResp])

    function restartGame() {
        setFlashcards([])
        setInfoResp([])
        setCardHeights([])
        navigate('/classic')
    }

    function juegoComenzado() {
        if (infoResp.length > 0) {
            setHayStats(true)
        } else {
            setHayStats(false)
        }
    }

    return (
        <>
            <div className='header d-flex align-items-center pt-2 pb-2'>
                <div className='container d-flex align-items-center justify-content-between'>
                    <Link to={`/${gameMode}`} className='enlace-logo'>
                        <h1 className='logo'>Flashcard Game</h1>
                    </Link>
                    {
                        gameMode == 'classic' ? 
                    <>
                    <div className='score'>
                        <div>Puntuación: {infoResp.filter(info => info.acierto == true).length} / {infoResp.length}</div>
                    </div>
                    <div className='botones d-flex'>
                        <Link to={'/stats'} style={{ pointerEvents: hayStats ? '' : 'none' }}>
                            <button className='btn btn-celeste' disabled={!hayStats ? true : false}>Estadísticas</button>
                        </Link>
                        <button onClick={restartGame} className='btn btn-rojo' disabled={flashcards.length == 0 ? true : false}>Reiniciar juego</button>
                    </div>
                    </>
                    :
                    ''
                    }
                </div>
            </div>
        </>
    )
}
