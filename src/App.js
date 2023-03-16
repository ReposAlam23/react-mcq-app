import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [ques, setques] = useState([])
  const [i, setI] = useState(0)
  const [play, setPlay] = useState(false)
  const [landing, setLanding] = useState(true)
  const [right, setRight] = useState(0)
  const [showScore, setShowScore] = useState(false)

  //===============fetching question api================
  const fetchQuestions = async()=>{
    const data = await fetch("https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple")
                .then((val)=>val.json())
                .then((value,i)=>setques(value.results))          
        }
  
  useEffect(()=>{
    fetchQuestions()
  },[])

  //============ handeling main page ===================

  const handleEnter=()=>{
    ques.map((elem, i)=>{
      let rand = Math.floor(Math.random()*4)
      elem.incorrect_answers.splice(rand,0, elem.correct_answer)
    })
    setTimeout(() => {
      setPlay(true)
      setLanding(false)    
    },1000);
  }

  //================ handelling score card =================
  const handleScore=(e, correct)=>{

    console.log(e.target.value, correct);
    if(e.target.value === correct) setRight(right+1)

    setTimeout(() => {
      if(i<ques.length-1){
        setI(i+1)
      } else{
        setPlay(false)
        setShowScore(true)
      }
    }, 500);
  }

  //=================================================================
  return (
    <div className='container'>

      {/* LANDING PAGE */}

      {landing ?<div className='landing'>
        Lets Play the quiz
        <button onClick={handleEnter}>Enter</button>
      </div>: ""}

      {/* MAIN QUESTIONS PAGE */}

      {play ? <div className='question-container'>
                <div className='questions'>
                    <h2>{`Questions ${i+1}/${ques.length} `}</h2>
                    <p>{ques[i].question}</p>
                </div>
                <div className='options'>
                    {ques[i].incorrect_answers.map((val, j)=>{
                      return <option 
                                key={j} 
                                value={val} 
                                className="single-option"
                                onClick={(e)=>handleScore(e, ques[i].correct_answer)}
                            >{`${j+1} : ${val}`}</option>
                    })}
                </div>
              </div> : ""
      }

      {/* SOCRE CARD PAGE */}

      { showScore ? <>
                <div className='landing'>{`Score : ${right} out of ${ques.length} `}</div>
              </> : ""}
    </div>
  );
}

export default App;
