import { Link } from "react-router-dom"
import { useRef } from "react"
import '../styles/main.css'
import { useDispatch } from "react-redux"
import { setUserId } from "../redux/result_reducer"



const Main = () => {
    const inputRef = useRef(null)
    const dispatch = useDispatch()

    function startQuiz() {
        if(inputRef.current?.value) {
            dispatch(setUserId(inputRef.current?.value))
        }
    }

  return (
    <div className='container heading '>
        <h1 className="title">COMPUTER QUIZ</h1>

        <ol className="order-list">
            <li>Read questions carefully</li>
            <li>Adhere to time limits</li>
            <li>Choose only one answer per question</li>
            <li>Each answer has a weight of 10 points</li>
            <li>Need to score atleast 50% to Pass</li>
        </ol>

        <div className="start">
            <Link className="btn start-btn" to={'quiz'} onClick={startQuiz}>Start Quiz</Link>
        </div>
        
    </div>
        
  )
}

export default Main
