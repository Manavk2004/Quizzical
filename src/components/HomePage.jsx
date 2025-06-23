
export default function HomePage(props){
    return(
        <>
            <div className='main-container'>
                <h1 className="intro-header">Quizzical</h1>
                <h2 className='desc'>The Most Difficult Trivia Game in 2025</h2>
                <button onClick={() => props.setGameState("No")} className="start-quiz">Start Quiz</button>
            </div>
      </>
    )
}