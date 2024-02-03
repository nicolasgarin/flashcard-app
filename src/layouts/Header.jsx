import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { IoMoon, IoSunny } from "react-icons/io5";
import { useGame } from '../context/GameContext';
import { useUserOptions } from '../context/UserOptionsContext';

export default function Header() {
    const { theme, toggleTheme } = useUserOptions()
    const [hayStats, setHayStats] = useState(false)
    const navigate = useNavigate()
    const location = useLocation().pathname;
    const { setFlashcards, setInfoResp, setCardHeights, setVidas, gameMode, infoResp, setGameMode, vidas, flashcards } = useGame();

    useEffect(juegoComenzado, [infoResp])

    function restartGame() {
        setFlashcards([])
        setInfoResp([])
        setCardHeights([])
        setVidas()
        navigate(`/${gameMode}`)
    }

    function toGameMode() {
        setFlashcards([])
        setInfoResp([])
        setCardHeights([])
        setGameMode('')
        setVidas()
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
            <div className={`header ${theme} d-flex align-items-center pt-2 pb-2 `}>
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
                    <div className='info-left d-flex align-items-center'>
                        {
                            gameMode == 'classic' ?
                                <>
                                    <div className='score'>
                                        <div>Puntuación: {infoResp.filter(info => info.acierto == true).length} / {infoResp.length}</div>
                                    </div>
                                    <div className='botones d-flex'>
                                        {location != '/stats' ?
                                            <Link to={'/stats'} style={{ pointerEvents: hayStats ? '' : 'none' }}>
                                                <button className='btn btn-celeste' disabled={!hayStats ? true : false}>Estadísticas</button>
                                            </Link>
                                            : <Link to={`/${gameMode}`} className='enlace-logo'>
                                                <button className='btn btn-celeste' >Juego</button>
                                            </Link>
                                        }
                                        <button onClick={restartGame} className='btn btn-rojo' disabled={flashcards.length == 0 ? true : false}>Reiniciar juego</button>
                                    </div>
                                </>
                                : gameMode == 'survival' ?
                                    <>
                                        <div className='score'>
                                            <div className='d-flex'>Puntuación: {infoResp.filter(info => info.acierto == true).length} {vidas > 0 ? <span className='vidas d-flex'>| Vidas: {Array.apply(null, { length: vidas }).map((e, i) => (<span className="vida" key={i}><FaHeart /></span>))}</span> : ''}</div>
                                        </div>
                                        <div className='botones d-flex'>
                                            {location != '/stats' ?
                                                <Link to={'/stats'} style={{ pointerEvents: hayStats ? '' : 'none' }}>
                                                    <button className='btn btn-celeste' disabled={!hayStats ? true : false}>Estadísticas</button>
                                                </Link>
                                                : <Link to={`/${gameMode}`} className='enlace-logo'>
                                                    <button className='btn btn-celeste' >Juego</button>
                                                </Link>
                                            }
                                        </div>
                                    </>
                                    : null
                        }
                        <div className='switch-container'>
                            <IoMoon />
                            <label className="switch">
                                <input type='checkbox' checked={theme === "light"} onChange={toggleTheme} />
                                <span className="slider round" />
                            </label>
                            <IoSunny />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
