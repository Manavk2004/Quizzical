import { useState } from 'react'
import './App.css'
import HomePage from "./components/HomePage.jsx"
import Questions from "./components/Questions.jsx"

export default function App(){
  const[gameState, setGameState] = useState("Home Page")

  return(
    <>
      {gameState === "Home Page" && (
        <main>
          {<HomePage setGameState={setGameState}/>}
        </main>
      )}
      {gameState !== "Home Page" && (
          <Questions/>
      )}
    </>
  )
}
