import React, { useEffect,useState } from 'react'
import Questions from './Questions'
import { useSelector, useDispatch } from 'react-redux';
import { MoveNextQuestion, MovePrevQuestion } from '../custom-hooks/FetchQuestion';
import { PushAnswer } from '../custom-hooks/setResult';
import { useNavigate, Navigate} from 'react-router-dom'
import '../styles/quiz.css'
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper';
import axios from "axios";
import { setSubmittedAction, setSubmittedActionFalse} from '../redux/result_reducer';





const Quiz = () => {


    const [check, setChecked] = useState(undefined)
    const dispatch = useDispatch()
    const {questions : {queue, trace, answers}, result : {result, submitted}} = useSelector(state => state) 

    function onNext(){
        if(trace < queue.length){
            dispatch(MoveNextQuestion());

            if (result.length <= trace){
                dispatch(PushAnswer(check))
            }

        }
        // trace === queue.length - 1 ?dispatch(setSubmittedAction()) :dispatch(setSubmittedActionFalse())
        setChecked(undefined)
    }

    function onPrev(){
        if(trace > 0){
            dispatch(setRestartFalse())
            dispatch(MovePrevQuestion());
        }
    }


    function onChecked(check){
        setChecked(check)
    }

    if(result.length && result.length >= queue.length){
        return <Navigate to={'/result'} replace={true}></Navigate>
    }




  return (
    <div className='container quiz-app'>

        <Questions onChecked = {onChecked}/>
        <div className='grid'>
            {trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div> }
    
            {trace === queue.length - 1 ? (
                    <button className='btn submit submit-btn' onClick={onNext}>
                        Submit
                    </button>
                ) : (
                    <button className='btn next' onClick={onNext}>
                        Next
                    </button>
                )}
        </div>
    </div>
  )
}

export default Quiz
