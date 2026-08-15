import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"


interface Progress {
  begin: boolean,
  typedChars: string,
  wordCount: number,
  prevWordLength: number
}


const initialState:Progress = {
    begin: false,
    typedChars: '',
    wordCount: 0,
    prevWordLength: 0
}

export const progressSlice = createSlice({
    name: 'progress',
    initialState,
    reducers: {
       gameStarted: (state, action:PayloadAction<boolean>)=>{
            state.begin = action.payload
       },
       updatedNumberOfTypedChars:(state,action:PayloadAction<string>)=>{
          state.typedChars += action.payload
       },
       updatedWordCount: (state) =>{
          state.wordCount = state.wordCount + 1
       },
       setPrevWordLength: (state, action:PayloadAction<number>)=>{
          state.prevWordLength = action.payload
       },
       resetProgress: ()=>{
         return initialState
       }
    },
})

export const { gameStarted, resetProgress, updatedNumberOfTypedChars, updatedWordCount, setPrevWordLength
    
 } = progressSlice.actions

export default progressSlice.reducer;
