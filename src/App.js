import "./css/App.css"
import {useState, useEffect} from "react"
import React from "react"
import {Switch, Route, useHistory} from "react-router-dom"

function App() {

  const history = useHistory();

  var questionsList = {
   0: {
      ques: "Who was the first Predisent of India?",
      option1: "Mahatma Gandhi",
      option2: "Chandrashekhar Azad",
      option3: "Rajendra Prasad",
      option4: "Jawarhar Lal Nehru" 
    },
   1: {ques: "Which country's national game is cricket?",
   option1: "Australia",
   option2: "England",
   option3: "South-Africa",
   option4: "India" 
  },
   2: {ques:"What is the full form of URL?",
   option1: "Uniform Resource Locator",
   option2: "Universal Resource Link",
   option3: "Universal Read Link",
   option4: "Universal Read Locator" 
},
3: {ques: "Who is the CEO of Google?",
option1: "Satya Nadella",
option2: "Sundar Pichai",
option3: "Jeff Bezos",
option4: "Jack Ma"

}
  }

  const [ques, setQues] = useState(questionsList[0])
  const [quesNo, setQuesNo] =useState(1);
  const [index, setIndex] = useState(0)
  const [noOfQuestions, setNoOfQuestions] = useState(4)
 

  var ar = []
  var j = 1
  for(var i=0; i<noOfQuestions; i++){
    
    ar[i] = j;
    j++;
  }
  
  function handleClick(i){
    setQuesNo(i+1)
    setIndex(i)
  setQues(questionsList[i].ques)
  console.log(index)
  console.log(i)
   history.push({
                pathname: '/questiontemplate',
                state: {
                  quesNum: i+1,
                  question: questionsList[i].ques,
                  option1: questionsList[i].option1,
                  option2: questionsList[i].option2,
                  option3: questionsList[i].option3,
                  option4: questionsList[i].option4

                }
                })
  }
  
  const questionNavigator = ar.map((q, i)=>
   <div className="questionNoButton" onClick={()=>handleClick(i)}> {q} </div>
  )
  
  return (
    <div className="App-screen container-fluid">
    <div className="row header-section">
      <div className="col-md-3 header-left-col">
        logo 1
        </div>
        <div className="col-md-6 header-middle-col">
          Quiz App
        </div>
        <div className="col-md-3 header-right-col">
         logo 2
        </div>
         </div>
         <div className="row sub-header">
        <div className="col-md-12 questions-palette">
            {questionNavigator}
        </div>
         </div>
         <div className="row middle-section">
           <Switch>   
           <Route exact path="/">
             <GreetUser />
           </Route> 
          <Route path="/questiontemplate">
            <QuestionTemplate />
          </Route>
          <Route path="/greetuser">
            <GreetUser />
          </Route>
           </Switch>
         </div>
         <div className="row navigation-buttons footer">
           <div className="col-md-2"></div>
   <div className="col-md-2"><button onClick={()=>handleClick(index-1<0?index: index-1)}> Prev</button></div>
   <div className="col-md-2"><button onClick={()=>handleClick(index==noOfQuestions-1? index: index+1)}>Next</button></div>
   <div className="col-md-2"></div>
   <div className="col-md-2"><button onClick={()=>history.push({pathname: '/greetuser'})} >Abort</button></div>
   <div className="col-md-2"><button>Submit</button></div>
         </div>
    </div>
  );
}
function QuestionTemplate(){
  const history = useHistory(); 
var quesNo = history.location.state.quesNum

const [seconds, setSeconds] = useState(59);
const [minutes, setMinutes] = useState(10);

const id =React.useRef(null);
const clear=()=>{
window.clearInterval(id.current)
}
useEffect(()=>{

    id.current=window.setInterval(()=>{
      setSeconds((time)=>time-1)
    },1000)
    return ()=>clear();
},[])

 useEffect(()=>{

  if(seconds===-1){
    setMinutes(minutes-1)
    setSeconds(59)
   }
   if(minutes===0 && seconds===0){
    clear()
   }
},[seconds])

  return(
    <div className="question-template">
      <div className="row ">
        <div className="col-md-2"><span className="ques-num">{history.location.state.quesNum}/4</span></div>
      <div className="col-md-8 question-statement">  {history.location.state.question}</div>
      <div className="col-md-2"><span className="countDown">{minutes}:{seconds%10==seconds?<span>0{seconds}</span>:<span>{seconds}</span>}</span></div>
        </div>
      <div className="row">
        <div className="col-md-3"> </div>
      <div className="col-md-9 option-section"> 
       <ul className="options">
        <li><input type="radio" name={history.location.state.question} />{history.location.state.option1}</li>
        <li><input type="radio" name={history.location.state.question} />{history.location.state.option2}</li>
        <li><input type="radio" name={history.location.state.question} />{history.location.state.option3}</li>
        <li><input type="radio" name={history.location.state.question} />{history.location.state.option4}</li>
      </ul>
      <span className="question-template-bottom"> <input type="checkbox" /> Mark for review </span>
      <button className="clear-response"> Clear</button>
      </div>
    </div>
    </div>
  )
}

function GreetUser(){
  const history = useHistory();

  function handleClick(){
    history.push({
      pathname: '/questiontemplate',
      state: {
        quesNum: 1,
        question: "Who was the first Predisent of India?",
        option1: "Mahatma Gandhi",
        option2: "Chandrashekhar Azad",
        option3: "Rajendra Prasad",
        option4: "Jawarhar Lal Nehru" 
  
      }
      })
  }
  return(
    <div className="greet-screen">
     <div className="row greet-user">Hello, User</div>
     <div className="row start-quiz"><button onClick={()=>handleClick(0)}>Start</button></div>
      </div>
  )
}

export default App;
