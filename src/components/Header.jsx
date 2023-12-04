import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";

export default function Header({ gameMode, setGameMode, infoResp, setInfoResp, flashcards, setFlashcards, setCardHeights, vidas }) {
    const [hayStats, setHayStats] = useState(false)
    const navigate = useNavigate()
    useEffect(juegoComenzado, [infoResp])

    function restartGame() {
        setFlashcards([])
        setInfoResp([])
        setCardHeights([])
        navigate(`/${gameMode}`)
    }

    function toGameMode() {
        setFlashcards([])
        setInfoResp([])
        setCardHeights([])
        setGameMode('')
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
                    <div className='d-flex'>
                        <Link to={`/${gameMode}`} className='enlace-logo'>
                            <h1 className='logo'>Flashcard Game</h1>
                        </Link>
                        <Link to={'/'}>
                            <button className='btn' onClick={toGameMode}>
                                Modo de juego
                            </button>
                        </Link>
                    </div>
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
                            : gameMode == 'survival' ?
                                <>
                                    <div className='score'>
                                        <div className='d-flex'>Puntuación: {infoResp.filter(info => info.acierto == true).length} { vidas - infoResp.filter(info => info.acierto == false).length > 0 ? <span className='vidas d-flex'>| Vidas: {Array.apply(null, { length: vidas - infoResp.filter(info => info.acierto == false).length }).map((e, i) => (<span className="vida" key={i}><FaHeart /></span>))}</span> : ''}</div>
                                    </div>
                                    <div className='botones d-flex'>
                                        <Link to={'/stats'} style={{ pointerEvents: hayStats ? '' : 'none' }}>
                                            <button className='btn btn-celeste' disabled={!hayStats ? true : false}>Estadísticas</button>
                                        </Link>
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
