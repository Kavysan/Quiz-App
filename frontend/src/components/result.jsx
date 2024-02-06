import React,{useEffect, useState} from 'react'
import '../styles/result.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {resetAllAction} from '../redux/questions_reducer';
import {resetResultAction, setUpdate} from '../redux/result_reducer';
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper';
import axios from 'axios';



export default function Result() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const [email, setEmail] = useState('');
    // const [totalPoints, setTotalPoints] = useState(0);
    // const [questions, setQuestions] = useState(0);
    // const [attend, setAttend] = useState(0);
    // const [score, setScore] = useState(0);
    // const [quizResult, setQuizResult] = useState('');

    const existing_email = localStorage.getItem('email');
    const {questions : {queue, answers}, result : {result, submitted, update}} = useSelector(state => state) 
    const tot = queue.length * 10; 
    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result, answers, 10)
    const flag = flagResult(tot, earnPoints)

    console.log("ques = ",queue.length)
    console.log("totalPoints = ",tot)
    console.log("attempts = ",attempts)
    console.log("earnPoints = ",earnPoints)
    console.log("flag = ",flag)


    function onRestart() {
        dispatch(resetAllAction());
        dispatch(resetResultAction());
    }

    async function onUpdate() {
        const existing_email = localStorage.getItem('email')
        try {
            // const response =await axios.post("http://127.0.0.1:5000/results", {
                const response =await axios.post("https://quiz-backend-aao5.onrender.com/results", {
                user_email: existing_email,
                total: tot,
                questions: queue.length,
                attend: attempts,
                score: earnPoints,
                quiz_result: flag

            });
        
            if (response.status === 201) {
                console.log("ques = ",queue.length)
                console.log("totalPoints = ",tot)
                console.log("attempts = ",attempts)
                console.log("earnPoints = ",earnPoints)
                console.log("flag = ",flag)
                dispatch(setUpdate())
                alert("Scores updated!")
                // navigate('/result');
            } else {
                console.error("Unexpected response status:", response.status);
            }
        } catch (error) {
            console.error("Error posting results:", error);
        }
    }


    // useEffect(() => {

    //     async function onUpdate() {
    //         const existing_email = localStorage.getItem('email')
    //         try {
    //             const response =await axios.post("http://127.0.0.1:5000/results", {
    //                 user_email: existing_email,
    //                 total: tot,
    //                 questions: queue.length,
    //                 attend: attempts,
    //                 score: earnPoints,
    //                 quiz_result: flag
    
    //             });
            
    //             if (response.status === 201) {
    //                 console.log("ques = ",queue.length)
    //                 console.log("totalPoints = ",tot)
    //                 console.log("attempts = ",attempts)
    //                 console.log("earnPoints = ",earnPoints)
    //                 console.log("flag = ",flag)
    //                 dispatch(setUpdate())
    //                 alert("Scores updated!")
    //                 navigate('/result');
    //             } else {
    //                 console.error("Unexpected response status:", response.status);
    //             }
    //         } catch (error) {
    //             console.error("Error posting results:", error);
    //         }
    //     }

        // const fetchData = async () => {
        //     try {
        //         const existing_email = localStorage.getItem('email');
        //         const response = await axios({
        //             method: "GET",
        //             url: `http://127.0.0.1:5000/results/${existing_email}`,
        //             headers: {
        //                 Authorization: 'Bearer ' + localStorage.getItem('token')
        //             }
        //         });
    
        //         if (response.status === 201) { 
        //             const userData = response.data.results;
        //             setEmail(userData.email || '');
        //             setTotalPoints(userData.total || 0);
        //             setQuestions(userData.questions || 0);
        //             setAttend(userData.attend || 0);
        //             setScore(userData.score || 0);
        //             setQuizResult(userData.quiz_result || '');
        //         } else {
        //             console.error("Unexpected response status:", response.status);
        //         }
        //     } catch (error) {
        //         console.error("Error fetching user results:", error);
        //     }
        // };
    
        // onUpdate()
        // fetchData();
    // }, []);

    useEffect( () => {
        onUpdate()
    }, [])
   

  return (

    <div className='container'>
        <h1 className='title' style={{color:'#2357be'}}>Results!!</h1>
                <div className='result flex-center'>
                    <div className='flex'>
                        <span>Username</span>
                        <span className='bold'>{existing_email}</span>
                    </div>
                    <div className='flex'>
                        <span>Total Quiz Points :</span>
                        <span className='bold'>{tot}</span>
                    </div>
                    <div className='flex'>
                        <span>Total Questions :</span>
                        <span className='bold'>{queue.length}</span>
                    </div>
                    <div className='flex'>
                        <span>Questions Attended :</span>
                        <span className='bold'>{attempts}</span>
                    </div>
                    <div className='flex'>
                        <span>Total Earn Points :</span>
                        <span className='bold'>{earnPoints} </span>
                    </div>
                    <div className='flex'>
                        <span>Quiz Result</span>
                        <span style={{ color: `${flag ? 'green' : 'orangered'}` }} className='bold'>
                            {flag ? 'Passed' : 'Failed'}
                        </span>
                    </div>
                </div>
                <div className="start  ">
                    <Link className='btn restart-btn' to={'/'} onClick={onRestart}>Do you want to try again? </Link>
                </div>  
                    {/* <div className="start ">
                    <Link className='btn restart-btn'  onClick={onUpdate}>Click here to see Results!!!</Link>
                </div>  */}
                
                
            
    </div>
  )
}