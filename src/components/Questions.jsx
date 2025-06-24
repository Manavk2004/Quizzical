import { use, useEffect, useState } from "react"

export default function Questions(){
    const [questions, setQuestions] = useState([])
    const [selectedOption, setselectedOption] = useState([])
    const [usedOption, setUsedOption] = useState([])
    const [keyValue, setKeyValue] = useState([])
    const [correctAnswers, setCorrectAnswers] = useState([])
    const [displayMessage, setDisplayMessage] = useState(false)
    const [incorrectAnswers, setIncorrectAnswers] = useState([])

    //import information from API
    useEffect(() =>{
        fetch("https://opentdb.com/api.php?amount=5&category=15&difficulty=hard&type=multiple")
        .then(res => res.json())
        .then(data => {
            if (data && data.results && data.results.length > 0){
                console.log(data.results)
                setQuestions(data.results)
                const CA = data.results.map((data)=>{
                    return data.correct_answer
                })
                const ICA = data.results.map((data)=>{
                    return data.incorrect_answers
                })
                setCorrectAnswers(CA)
                setIncorrectAnswers(ICA)
            }
        })
    },[])

    console.log("Here are the selected options", selectedOption)


    //Function to toggle buttons
    function toggle(choice){
        return selectedOption.includes(choice) ? 
            selectedOption.filter(option => option !== choice) :
            [...selectedOption, choice]
    }

    function selectedOptionsIncorrect(choice){
        for(const selected of selectedOption){
            if (selected.includes(choice) && incorrectAnswers.some(ica => ica.includes(selected))){
                return true
            }
        }
    }

    function theClassName(choice){
        if (!displayMessage){
            return Object.values(keyValue).some(array => array.includes(choice)) ? "clicked" : "normal"
        }else if(selectedOptionsIncorrect(choice)){
            return "incorrect-answer-choice"
        }else if(correctAnswers.includes(choice)){
            return "correct-answer-choice"
        }else{
            return "normal"
        }
    }

    //function to fix sentences, create buttons, make the onClick function to toggle
    function theQuestions(){
        return questions.map((q, i)=>{
            // Create unique options array for each question to fix key issues
            let options = [...q.incorrect_answers, q.correct_answer]
            return(
                <div key={i} className="arching-container">
                    <h1 className="actual-question" dangerouslySetInnerHTML={{__html: q.question}}></h1>
                    <div className="options">
                        {options.map((choice, j)=>{
                            return <button 
                                key={`q${i}-${choice}`} 
                                onClick={()=> {setselectedOption(toggle(choice))}} 
                                className={theClassName(choice)}
                                dangerouslySetInnerHTML={{__html: choice}}
                            ></button>
                        })}
                    </div>
                </div>
            )
        })
    }

    //Sets the usedOptions state so that we can compare it to the selected options
    useEffect(()=>{
        const object = {}
        questions.forEach((question, index)=>{
            const options = [question.correct_answer, ...question.incorrect_answers]
            object[index] = options
        });
        setUsedOption(object)
    }, [questions])


    //updates keyValue State
    useEffect(()=>{
        console.log("useEffect triggered", usedOption, selectedOption)
        Object.entries(usedOption).forEach(([index, options])=>{
            console.log(options)
            for(const choice of selectedOption){
                for(const option of options){
                    if (choice === option){
                        console.log("started")
                        setKeyValue((prev)=>({
                            ...prev,
                            [index]: option, 
                        }))
                        console.log("Done")
                        break
                    }
                }
            }
        })
    }, [selectedOption])

    console.log("Here are the key value pairs", keyValue)
    useEffect(()=>{
        console.log("Selected options updated:", selectedOption);
    },[selectedOption])
    console.log(`Here is the used option:`, usedOption)
    console.log("Correct answers", correctAnswers)



    //Compares the submitted response to the actual correct answers

    function correctAnswerCheck(){
        const array = Object.values(keyValue)
        console.log("Here is the array", array)
        console.log(correctAnswers)
        let correctIndexes = []
        let wrongIndexes = []
        correctAnswers.forEach((val, i)=>{
            val === array[i] ? correctIndexes.push(i) : wrongIndexes.push(i)
        })
        if (correctIndexes.length === 5){
            return(
                <div className="bottom-info">
                    <h1 className="result">YOU WON!!!</h1>
                    <button className="play-again">Play Again</button>
                </div>
            )
        }else{
            return(
                <div className="bottom-info">
                    <h1 className="result">You scored {correctIndexes.length}/5 correct answers </h1>
                    <button className="play-again">Play Again</button>
                </div>
            )
        }

    }

    return(
        <>
            <section className="question">
                {theQuestions()}
                {!displayMessage && <button onClick={()=> {correctAnswerCheck && setDisplayMessage(true)}} className="check-answers-button">Check Answers</button>}
                {displayMessage && correctAnswerCheck()}
            </section>
        </>
    )
}