import {  configureStore } from "@reduxjs/toolkit"
import settingsReducer from "../features/userSettings/settingSlice"
import timeReducer from "../features/timer/timingSlice"
// import { counterSlice } from "../features/counter/counterSlice"
// import { quotesApiSlice } from "../features/quotes/quotesApiSlice"


export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        timer: timeReducer
    }
})

// Infer the type of `store`
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]
