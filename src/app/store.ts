import {  combineReducers, configureStore } from "@reduxjs/toolkit"
import settingsReducer from "../features/userSettings/settingSlice"
import timeReducer from "../features/timer/timingSlice"
import progressReducer from "../features/userProgress/gameSlice"
import resultReducer, { type Result } from "../features/result/resultSlice"
import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import storage from "redux-persist/lib/storage"
import createTransform from "redux-persist/es/createTransform";
//I need to transform this by changing the wpm to 0

const resultTransform = createTransform<Result, Result>(
  (state: Result) => ({
    ...state,
    wpm: 0,
    accuracy: 0,
    totalTypedWords: 0,
    correctCharacters: 0
  }),
  (state) => state,
  {
    whitelist: ["result"],
  }
)


const rootPersistConfig = {
    key: 'root',
    storage: storage.default,
    whitelist: ['result', 'settings'],
    transforms: [resultTransform]
}

const rootReducer = combineReducers({
        settings: settingsReducer,
        timer: timeReducer,
        progress: progressReducer,
        result:  resultReducer,
})

type RootReducer = ReturnType<typeof rootReducer>

const persistedReducer = persistReducer<RootReducer>(rootPersistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:{
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"]
            }
        })
})

// Infer the type of `store`
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]
export const persistor = persistStore(store)