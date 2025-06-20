import { useState } from 'react'
import './App.css'
import HomePage from "./components/HomePage.jsx"

export default function App(){
  const[gameState, setGameState] = useState("Home Page")

  return(
    gameState === "Home Page" ? <HomePage setGameState={setGameState}/> : <Clear/>
  )
}
