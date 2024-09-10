import React from 'react'
import ReactDOM from 'react-dom';
import {nanoid} from 'nanoid'
import Answers from './Answers'
import he from 'he'
export default function App(){
    const[final, setFinal]=React.useState(false)
    const [startquiz,setStartQuiz] =React.useState(false)
    const [firstrun,setFirstrun] = React.useState(false)
    const [btndis,setBtndis] =React.useState(false)
    const [count,setCount] = React.useState(0) 
    const[data,setdata] = React.useState([])
    const [created,setCreated] = React.useState(true)
    
React.useEffect(() => (
        fetch('https://opentdb.com/api.php?amount=5')
        .then(res=>res.json())
        .then(data=>{
        setdata(data.results)})
    ), []);
    const [answers,setAnswers] = React.useState([])
    
function dataCreated(){
            const array = data.map((each)=>{
                const answerarray =[]
                answerarray.push({value:each.correct_answer,
                                isCorrect:true,
                                isSelected:false,                   
                })
                for(let i=0;i<each.incorrect_answers.length;i++){
                    answerarray.push({value:each.incorrect_answers[i],
                                isCorrect:false,
                                isSelected:false,
                                })
                }
                
                const obj = {
                    question:each.question,
                    option:answerarray,
                    correctAnswer:each.correct_answer 
                }
                return obj
            })
            setAnswers(array) 
            
    }
function clicked(value, question) {
    setFirstrun(true)
    setAnswers((prevAnswers) => {
      return prevAnswers.map((each) => {
        if (each.question === question) {
          const updatedOptions = each.option.map((option) => {
            return option.value === value ? {option, isSelected: !option.isSelected } : {option, isSelected: false };
          });
          return {each, option: updatedOptions };
        } else {
          return each; 
        }
      });
    });
  }
  
    
React.useEffect(()=>{
        dataCreated()
  
    },[data])
    
function checkanswers(){
        setBtndis(true)
        setFinal(true)
        const checkanswers = answers.map((each)=>{
            const arr = each.option.map((every)=>{
             if(every.isCorrect && every.isSelected ){
                setCount(prev=>prev+1)    
             }
            })
            
        })
        
    }
    
const render =answers.map((each)=>{
        return (
            <div>
            <p className="ques">{he.decode(each.question)}</p>
            <div className="options-div">
            <Answers option={each.option}  question={each.question} click={clicked} first={firstrun} final={final}/>
           </div>
           </div>
        )
        
    }) 
function start(){
        setStartQuiz(true)
    }
function reset(){     
        // setStartQuiz(false)
        // setFinal(prev=>!prev)
        // setBtndis(prev=>!prev)
        window.location.reload(); 
    }
    
    
    
    return (<div>
        {!startquiz && <h1>Quizzical</h1>}
        {startquiz && <h1>Questions</h1>}
        {startquiz && render}
        {startquiz && <button disabled ={btndis} style={{display: btndis?"none":""}} className ="checkbutton" onClick ={checkanswers}>Check Answers</button>}
        {!startquiz && <button className ="checkbutton" onClick ={start}>Start Quiz</button>}
        <div className="result">
        {final && <p className="score">You scored {count}/5 correct answers</p>}
        {final && <button onClick ={reset} className ="checkbutton">Reset</button>}
        </div>
        </div>)
    
    
}