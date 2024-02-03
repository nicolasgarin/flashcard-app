import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { GameProvider } from './context/GameContext.jsx';
import { UserOptionsProvider } from './context/UserOptionsContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserOptionsProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </UserOptionsProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
