
export default function HomePage(props){
    return(
        <main>
            <div className='main-container'>
                <h1 className="intro-header">Quizzical</h1>
                <h2 className='desc'>The Most Difficult Trivia Game in 2025</h2>
                <button onClick={() => props.setGameState("No")} className="start-quiz">Start Quiz</button>
            </div>

            <svg className='blue-blob' width="297" height="235" viewBox="0 0 297 235" fill="none" xmlns="http://www.w3.org/2000/svg"/>
        
            <svg className="yellow-blob" width="158" height="141" viewBox="0 0 158 141" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M63.4095 81.3947C35.1213 50.8508 -2.68211 21.7816 1.17274 -19.6933C5.43941 -65.599 39.854 -105.359 82.4191 -123.133C122.797 -139.994 170.035 -130.256 205.822 -105.149C235.947 -84.0141 236.823 -43.8756 246.141 -8.27104C256.17 30.0508 282.521 70.8106 260.501 103.779C237.538 138.159 188.991 143.432 147.931 138.768C112.318 134.723 87.7505 107.677 63.4095 81.3947Z" fill="#FFFAD1"/>
            </svg>
        </main>
    )
}