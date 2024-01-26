import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import data, {answers} from "../database/data";

// redux actions
import * as Action from '../redux/questions_reducer'


export const useFetchQuestion = () => {
    const dispatch = useDispatch();   
    const [getData, setGetData] = useState({ isLoading : false, apiData : [], serverError: null});

    useEffect(() => {
        setGetData(prev => ({...prev, isLoading : true}));

        // fetch data from backend
        (async () => {
            try{
                let question = await data;
                if (question.length > 0){
                    setGetData(prev => ({...prev, isLoading : false}));
                    setGetData(prev => ({...prev, apiData : question}));

                    dispatch(Action.startExamAction( {question, answers} ))
                }else {
                    throw new Error("No Question Avalibale");
                }
            }catch (error) {
                setGetData(prev => ({...prev, isLoading : false}));
                setGetData(prev => ({...prev, serverError : error}));
            }
        })();
    },[dispatch])
return [getData, setGetData];
}

export const MoveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction()); /** increase trace by 1 */
    } catch (error) {
        console.log(error)
    }
}

export const MovePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction()); /** increase trace by 1 */
    } catch (error) {
        console.log(error)
    }
}