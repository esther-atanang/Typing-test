import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export type Difficulty = "easy" | "medium" | "hard";
export type Duration = "15s" | "30s" | "60s" | "120s" | "passage";
export type Theme = "light" | "dark"

export interface Setting{
    difficulty: Difficulty,
    level : number,
    timerMode: Duration,
    audio: boolean
    theme: Theme
}

const stages = {
    easy: [1,2,3,4,5,6,7,8,9,10],
    medium: [1,2,3,4,5,6,7,8,9,10],
    hard: [1,2,3,4,5,6,7,8,9,10],
}

const initialState: Setting = {
    difficulty: 'easy',
    level: 1,
    timerMode: '60s',
    audio: true,
    theme: "dark",
}

export const settingSlice = createSlice({
    name: 'settings',
    initialState,
    reducers:{
        raiseDifficulty: (state,action:PayloadAction<Difficulty>) =>{
            state.difficulty = action.payload
        },
   raiseLevel: (state) => {
    if (state.level === stages[state.difficulty].length) {
        if (state.difficulty === "easy") {
            state.difficulty = "medium";
        } else if (state.difficulty === "medium") {
            state.difficulty = "hard";
        } else {
            state.difficulty = "easy";
        }

        state.level = 1;
    } else {
        state.level += 1;
    }
},
        setDuration: (state, action:PayloadAction<Duration>) =>{
            state.timerMode = action.payload
        },
        setAudio: (state, action:PayloadAction<boolean>) =>{
            state.audio = action.payload
        },
        setTheme: (state, action:PayloadAction<Theme>) =>{
            state.theme = action.payload
        }
    },
}

)


//This are the actions that i will dispatch.
export const { raiseDifficulty, raiseLevel, setDuration, setAudio , setTheme} = settingSlice.actions

export default settingSlice.reducer