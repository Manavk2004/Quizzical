import { useState } from 'react'
import './homepage.css'
import HomePage from "./components/HomePage.jsx"
import Questions from "./components/Questions.jsx"

export default function App(){
  const[gameState, setGameState] = useState("Home Page")

  return(
    <>
      {gameState === "Home Page" && (
          <HomePage setGameState={setGameState}/>
      )}
      {gameState !== "Home Page" && (
          <Questions/>
      )}
    </>
  )
}
