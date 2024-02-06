import { createSlice } from "@reduxjs/toolkit"


export const resultReducer = createSlice({
    name:'results',
    initialState : {
        result : [],
        submitted: false,
        update: false,
    },
    reducers : {
        pushResultAction : (state,action) =>{
            state.result.push(action.payload)
        },
        updateResultAction : (state, action) => {
            const { trace, checked } =  action.payload;
            state.result.fill(checked, trace, trace+1)
        },
        resetResultAction : () =>{
            return {
                result : []
            }
        },
        
        setSubmittedAction: (state) => {
            state.submitted = true;
            console.log(`submitted: ${state.submitted}`)
        },

        setSubmittedActionFalse: (state) => {
            state.submitted = false;
            console.log(`submitted: ${state.submitted}`)
        },

        setUpdate: (state) => {
            state.update = true;
            console.log(`restart: ${state.update}`)
        },
        setUpdateFalse: (state) => {
            state.restart = false;
            console.log(`restart: ${state.update}`)
        },
    }
})

export const { pushResultAction, resetResultAction, updateResultAction, setSubmittedAction, setSubmittedActionFalse, setUpdate, setUpdateFalse} = resultReducer.actions;
  
export default resultReducer.reducer;
  