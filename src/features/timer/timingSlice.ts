import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Duration } from "../userSettings/settingSlice";
import { getTimer } from "../../lib/utils";

type TimerState = {
  time: number;
  isExpired: boolean;
};

const initialState: TimerState = {
  time: 60,
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
            isExpired: true
        }
      }

      return {
          ...state,
          time: state.time - 1
      }
    },
    resetTimer:() => initialState
  },
});

export const { setTime, updatedTime, resetTimer } = timeSlice.actions;

export default timeSlice.reducer;