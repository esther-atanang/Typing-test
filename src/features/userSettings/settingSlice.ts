import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export type Difficulty = "easy" | "medium" | "hard";
export type Duration = "15s" | "30s" | "60s" | "120s" | "passage";

export interface SettingState{
    difficulty: Difficulty,
    level : number,
    timerMode: Duration
}

const initialState: SettingState = {
    difficulty: 'easy',
    level: 1,
    timerMode: '60s',
}

export const settingSlice = createSlice({
    name: 'settings',
    initialState,
    reducers:{
        raiseDifficulty: (state,action:PayloadAction<Difficulty>) =>{
            state.difficulty = action.payload
        },
        raiseLevel: state =>{
            state.level = state.level + 1
        },
        setDuration: (state, action:PayloadAction<Duration>) =>{
            state.timerMode = action.payload
        }
    }
})


//This are the actions that i will dispatch.
export const { raiseDifficulty, raiseLevel, setDuration } = settingSlice.actions

export default settingSlice.reducer