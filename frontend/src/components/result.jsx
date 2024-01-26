import React,{useEffect} from 'react'
import '../styles/result.css'
// import ResultTable from './resultTable';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {resetAllAction} from '../redux/questions_reducer';
import {resetResultAction} from '../redux/result_reducer';
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper';



export default function Result() {

    const dispatch = useDispatch()
    const {questions : {queue, answers}, result : {result, userId}} = useSelector(state => state) 

    useEffect(() => {
        console.log(flag)
    })

    const totalPoints = queue.length * 10; 
    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result, answers, 10)
    const flag = flagResult(totalPoints, earnPoints)


    function onRestart(){
        dispatch(resetAllAction())
        dispatch(resetResultAction())
    }


  return (
    <div className='container'>
        <h1 className='title text-light'>Quiz Application</h1>
        <div className='result flex-center'>
            <div className='flex'>
                <span>Username</span>
                <span className='bold'>Daily Tuition</span>
            </div>
            <div className='flex'>
                <span>Total Quiz Points :</span>
                <span className='bold'>{totalPoints || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Questions :</span>
                <span className='bold'>{queue.length || 0}</span>
            </div>
            <div className='flex'>
                <span>Questions Attended :</span>
                <span className='bold'>{attempts || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Earn Points :</span>
                <span className='bold'>{earnPoints || 0} </span>
            </div>
            <div className='flex'>
                <span>Quiz Result</span>
                <span style={{ color : `${flag ? "green" : "orangered" }` }} className='bold'>{flag ? "Passed" : "Failed"}</span>
            </div>
        </div>    
        <div className="start">
            <Link className='btn restart-btn' to={'/'} onClick={onRestart}>Restart</Link>
        </div>

        {/* <div className="container">
            <ResultTable></ResultTable>
        </div> */}
    </div>
  )
}