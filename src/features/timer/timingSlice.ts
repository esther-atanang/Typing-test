import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Duration } from "../userSettings/settingSlice";

type TimerState = {
  time: number;
  startTime: boolean;
  isExpired: boolean;
};

const initialState: TimerState = {
  time: 60,
  startTime: false,
  isExpired: false,
};

export const timeSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTime: (state, action: PayloadAction<number>) => {
      state.time = action.payload;
    },

    updatedTime: (state, action: PayloadAction<Duration>) => {
      if(!state.startTime) return
      const duration = action.payload;

      if (duration === "passage") { 
        return{
          ...state,
          time: state.time + 1
        };
      }


      if (state.time <= 0 ) {
        return{
            ...state,
            startTime: false,
            isExpired: true
        }
      }

      return {
          ...state,
          time: state.time - 1
      }
    },
    startTime:(state,action:PayloadAction<boolean>) => {
        state.startTime = action.payload;
    },
    resetTimer:() => initialState
  },
});

export const { setTime, updatedTime, startTime, resetTimer } = timeSlice.actions;

export default timeSlice.reducer;