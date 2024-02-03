import React, { createContext, useContext, useState } from "react";

const GameContext = createContext(undefined);

export const GameProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const [gameMode, setGameMode] = useState('')
  const [infoResp, setInfoResp] = useState([])
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])
  const [catActual, setCatActual] = useState('')
  const [cardHeights, setCardHeights] = useState([])
  const [vidas, setVidas] = useState()

  return (
    <GameContext.Provider
      value={{
        gameMode,
        setGameMode,
        infoResp,
        setInfoResp,
        flashcards,
        setFlashcards,
        categories,
        setCategories,
        catActual,
        setCatActual,
        cardHeights,
        setCardHeights,
        vidas,
        setVidas,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
