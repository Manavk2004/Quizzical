import { use, useEffect, useState } from "react"

export default function Questions(){
    const [questions, setQuestions] = useState([])
    const [selectedOption, setselectedOption] = useState([])
    const [usedOption, setUsedOption] = useState([])
    const [keyValue, setKeyValue] = useState([])


    //import information from API
    useEffect(() =>{
        fetch("https://opentdb.com/api.php?amount=5&category=15&difficulty=hard&type=multiple")
        .then(res => res.json())
        .then(data => {
            if (data && data.results && data.results.length > 0){
                console.log(data.results)
                setQuestions(data.results)
            }
        })
    },[])


    //Function to toggle buttons
    function toggle(choice){
        return selectedOption.includes(choice) ? 
            selectedOption.filter(option => option !== choice) :
            [...selectedOption, choice]
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
                                className={Object.values(keyValue).some(array => array.includes(choice)) ? "clicked" : "normal"}
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

    return(
        <>
            <section className="question">
                {theQuestions()}
                <button className="check-answers-button">Check Answers</button>
            </section>
        </>
    )
}