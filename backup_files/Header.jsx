import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import CountdownTimer from './CountDownTimer';

export default function Header(props) {
    const [hayStats, setHayStats] = useState(false)
    const navigate = useNavigate()
    const THREE_DAYS_IN_MS = props.tiempo * 1000;
    const NOW_IN_MS = new Date().getTime();
    const dateTime = NOW_IN_MS + THREE_DAYS_IN_MS;
    const location = useLocation().pathname;

    useEffect(juegoComenzado, [props.infoResp])

    function restartGame() {
        props.setFlashcards([])
        props.setInfoResp([])
        props.setCardHeights([])
        props.setVidas()
        props.setTiempo()
        navigate(`/${props.gameMode}`)
    }

    function toGameMode() {
        props.setFlashcards([])
        props.setInfoResp([])
        props.setCardHeights([])
        props.setGameMode('')
        props.setVidas()
        props.setTiempo()
    }

    function juegoComenzado() {
        if (props.infoResp.length > 0) {
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
                        <Link to={`/${props.gameMode}`} className='enlace-logo'>
                            <h1 className='logo'>Flashcard Game</h1>
                        </Link>
                        <Link to={'/'}>
                            <button className='btn' onClick={toGameMode}>
                                Modo de juego
                            </button>
                        </Link>
                    </div>
                    {
                        props.gameMode == 'classic' ?
                            <>
                                <div className='score'>
                                    <div>Puntuación: {props.infoResp.filter(info => info.acierto == true).length} / {props.infoResp.length}</div>
                                </div>
                                <div className='botones d-flex'>
                                    {location != '/stats' ?
                                        <Link to={'/stats'} style={{ pointerEvents: hayStats ? '' : 'none' }}>
                                            <button className='btn btn-celeste' disabled={!hayStats ? true : false}>Estadísticas</button>
                                        </Link>
                                        : <Link to={`/${props.gameMode}`} className='enlace-logo'>
                                            <button className='btn btn-celeste' >Juego</button>
                                        </Link>
                                    }
                                    <button onClick={restartGame} className='btn btn-rojo' disabled={props.flashcards.length == 0 ? true : false}>Reiniciar juego</button>
                                </div>
                            </>
                            : props.gameMode == 'survival' ?
                                <>
                                    <div className='score'>
                                        <div className='d-flex'>Puntuación: {props.infoResp.filter(info => info.acierto == true).length} {props.vidas > 0 ? <span className='vidas d-flex'>| Vidas: {Array.apply(null, { length: props.vidas }).map((e, i) => (<span className="vida" key={i}><FaHeart /></span>))}</span> : ''}</div>
                                    </div>
                                    <div className='botones d-flex'>
                                        {location != '/stats' ?
                                            <Link to={'/stats'} style={{ pointerEvents: hayStats ? '' : 'none' }}>
                                                <button className='btn btn-celeste' disabled={!hayStats ? true : false}>Estadísticas</button>
                                            </Link>
                                            : <Link to={`/${props.gameMode}`} className='enlace-logo'>
                                                <button className='btn btn-celeste' >Juego</button>
                                            </Link>
                                        }
                                    </div>
                                </>
                                : props.gameMode == 'contrareloj' ?
                                    <>
                                        <div className='score d-flex align-items-center'>
                                            <div className=''>Puntuación: {props.infoResp.filter(info => info.acierto == true).length}</div>
                                            {props.tiempo > 0 ?
                                                <div>
                                                    <span className='tiempo d-flex align-items-center'>| Tiempo restante: <CountdownTimer targetDate={dateTime} /></span>
                                                </div>
                                                : null}
                                        </div>
                                        <div className='botones d-flex'>
                                            {location != '/stats' ?
                                                <Link to={'/stats'} style={{ pointerEvents: hayStats ? '' : 'none' }}>
                                                    <button className='btn btn-celeste' disabled={!hayStats ? true : false}>Estadísticas</button>
                                                </Link>
                                                : <Link to={`/${props.gameMode}`} className='enlace-logo'>
                                                    <button className='btn btn-celeste' >Juego</button>
                                                </Link>
                                            }
                                        </div>
                                    </>
                                    :
                                    null
                    }
                </div>
            </div>
        </>
    )
}
