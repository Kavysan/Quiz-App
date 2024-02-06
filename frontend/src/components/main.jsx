import { Link, useNavigate } from "react-router-dom"

import '../styles/main.css'
import { useDispatch } from "react-redux"



const Main = () => {

    const navigate = useNavigate()

    function startQuiz() {

        if (localStorage.getItem('email') === null) {
            alert("Login to proceed")
            navigate('/login')
        } else {

            navigate('/quiz')
        }
    }

  return (
    <div className='container heading main-bg'>
        <h1 className="title">COMPUTER QUIZ</h1>

        <ol className="order-list">
            <li>Read questions carefully</li>
            <li>Adhere to time limits</li>
            <li>Choose only one answer per question</li>
            <li>Each answer has a weight of 10 points</li>
            <li>Need to score atleast 50% to Pass</li>
        </ol>

        <div className="start">
            <button className="btn start-btn" onClick={startQuiz}>Start Quiz</button>
        </div>
        
    </div>
        
  )
}

export default Main
