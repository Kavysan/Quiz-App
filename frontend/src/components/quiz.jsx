import React, { useEffect,useState } from 'react'
import Questions from './Questions'
import { useSelector, useDispatch } from 'react-redux';
import { MoveNextQuestion, MovePrevQuestion } from '../custom-hooks/FetchQuestion';
import { PushAnswer } from '../custom-hooks/setResult';
import {Navigate} from 'react-router-dom'
import '../styles/quiz.css'





const Quiz = () => {

    const [check, setChecked] = useState(undefined)
    const result = useSelector(state => state.result.result)
    const state = useSelector(state => state)
    const { queue, trace } = useSelector(state => state.questions)
    const dispatch = useDispatch()

    function onNext(){
        console.log("on Next btn");
        if(trace < queue.length){
            dispatch(MoveNextQuestion());

            if (result.length <= trace){
                dispatch(PushAnswer(check))
            }
        }

        setChecked(undefined)
    }

    /** Prev button event handler */
    function onPrev(){
        console.log("on prev btn");
        if(trace > 0){
            dispatch(MovePrevQuestion());
        }
    }

    function onChecked(check){
        console.log(check)
        setChecked(check)
    }

    if(result.length && result.length >= queue.length){
        return <Navigate to={'/result'} replace={true}></Navigate>
    }



  return (
    <div className='container quiz-app'>
        {/* <h1 className='titles'>IT'S TRIVIA TIME</h1> */}

        <Questions onChecked = {onChecked}/>
        <div className='grid'>
            {trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div> }
            
            <button className='btn next' onClick={onNext}>Next</button>
        </div>
    </div>
  )
}

export default Quiz
