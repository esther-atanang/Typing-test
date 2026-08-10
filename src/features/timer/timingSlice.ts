import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Duration } from "../userSettings/settingSlice";



type timerState = number

const initialState:timerState =  60

export const timeSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        // I want it to take other setting states into consideration
        setTime: (state, action:PayloadAction<number>) =>{
            return action.payload;
        },
        updatedTime: (state, action:PayloadAction<Duration>)=>{
           
           if(action.payload === 'passage') {
                return (state + 1)
            }else{
                return (state - 1);
            }
        }
    }
});


export const { setTime, updatedTime } = timeSlice.actions
export default timeSlice.reducer;

