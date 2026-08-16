import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { raiseDifficulty, raiseLevel, type Difficulty, type Duration } from "../features/userSettings/settingSlice";
import { formatTime, getTimer } from "../lib/utils";
import { setTime } from "../features/timer/timingSlice";

interface Props { 
    onSetMode: (value?:Duration) => void,
}

interface SelectElements extends HTMLSelectElement {
    value: Difficulty
} 


const MenuT = ({onSetMode}: Props) => {
    const results = useAppSelector(state=>state.result);
    const session = useAppSelector(state=>state.timer)
    const settings = useAppSelector(state=>state.settings)
    const progress = useAppSelector(state=>state.progress)
    const dispatch = useAppDispatch();


    console.log(settings)
    useEffect(()=>{
       const sess = localStorage.getItem('persist:root');
       if(sess){
         const payload = JSON.parse(sess);
         const mode = JSON.parse(payload['settings'])['timerMode']
         const level = JSON.parse(payload['settings'])['level']
         const difficulty = JSON.parse(payload['settings'])['difficulty']
         dispatch(setTime(getTimer(mode).time))
         dispatch(raiseDifficulty(difficulty))
         dispatch(raiseLevel(level))    
       }
    },[dispatch])
  return (
 <section className="hidden xl:flex xl:items-baseline xl:whitespace-nowrap">
     <div className="flex items-baseline gap-2 border-r  bg-blue-700 hover:bg-red-800 border-neutral-800 pr-4">
         <p className="uppercase text-lg text-neutral-400 hover:text-blue-600">wpm:</p>
         <p className="min-w-[3ch] text-2xl font-semibold tabular-nums text-white">{results.wpm}</p>
     </div>
     <div className="flex items-baseline gap-2 border-r  bg-blue-700 hover:bg-red-800 border-neutral-800 px-4">
         <p className="capitalize text-lg text-neutral-400">Accuracy:</p>
         <p className="min-w-[4ch] text-2xl font-semibold tabular-nums text-white">{results.accuracy}%</p>
     </div>
 
     <div className="flex items-baseline gap-2 pl-4 bg-blue-700 hover:bg-red-800">
         <p className="capitalize text-lg text-neutral-400">Time:</p>
         <p className="min-w-[4ch] text-left text-2xl font-semibold tabular-nums text-yellow-400">{formatTime(session.time)}</p>
     </div>
 
     <div className=" bg-red-900 hover:bg-blue-700 h-8 w-9"></div>
 </section>
  )
}

export default MenuT
