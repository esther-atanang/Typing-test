import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ScoreType } from "../../components/results"
import { format } from "date-fns"

export interface History {
    wpm: number
    baseline: ScoreType
    date: string,
    mode: string,
    acc: number
}

export interface Result {
    accuracy: number
    totalTypedWords: number
    correctCharacters: number
    wpm: number
    history: History[]
}

export const initialState: Result = {
    wpm: 0,
    accuracy: 0,
    totalTypedWords: 0,
    correctCharacters: 0,
    history: []
}

export const resultSlice = createSlice({
    name: "result",
    initialState,
    reducers: {
        updatedAccuracy: (state, action: PayloadAction<number>) => {
            state.accuracy = action.payload
        },

        updatedTotalTypedWords: (state, action: PayloadAction<number>) => {
            state.totalTypedWords = action.payload
        },

        updatedNumberOfCorrectChar: (
            state,
            action: PayloadAction<number>
        ) => {
            state.correctCharacters = action.payload
        },

        setWPM: (state, action: PayloadAction<number>) => {
            state.wpm = action.payload
        },

        updateResult: (
            state,
            action: PayloadAction<Omit<Result, "history" | "wpm"> | undefined>
        ) => {
            if (action.payload) {
                state.accuracy = action.payload.accuracy
                state.correctCharacters = action.payload.correctCharacters
                state.totalTypedWords = action.payload.totalTypedWords
            }
        },

        clearResult: (state)=>{
            return { ...initialState, history: state.history};
        },

        setHistory:{
            reducer (state, action:PayloadAction<{mode:string, date:string}>){
            const currentHistory: History = {
                wpm: state.wpm,
                baseline: "baseline",
                acc: state.accuracy,
                mode: action.payload.mode,
                date: action.payload.date
            }
            

            if (state.history.length > 0) {
                const isAbove = state.history.every(
                    (entry) => state.wpm > entry.wpm
                )

                const isBelow = state.history.every(
                    (entry) => state.wpm < entry.wpm
                )

                if (isAbove) {
                    currentHistory.baseline = "above"
                } else if (isBelow) {
                    currentHistory.baseline = "below"
                }
            }
            state.history.push(currentHistory)
            console.log(state.history, "The history")
            state.wpm = 0
            },
         prepare (mode:string){
            const timestamp = new Date()
            return{
                payload:{
                    mode,
                    date: format(timestamp,'MMM yyyy')
                }
            }
         }
        }
    }, 
})

export const {
    updatedAccuracy,
    updatedTotalTypedWords,
    updatedNumberOfCorrectChar,
    updateResult,
    setWPM,
    setHistory,
    clearResult
} = resultSlice.actions

export default resultSlice.reducer