
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


const Menu = ({onSetMode}: Props) => {
    const results = useAppSelector(state=>state.result);
    const session = useAppSelector(state=>state.timer)
    const settings = useAppSelector(state=>state.settings)
    const progress = useAppSelector(state=>state.progress)
    const dispatch = useAppDispatch();

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
        <section className='md:mx-32 border-b-[0.8px] border-neutral-800 pb-5'>
            {/* Mobile Stats Grid */}
            <section className="lg:hidden grid grid-cols-3 gap-2 *:pr-2 *:border-r *:border-neutral-800 *:last:border-0 items-center text-xs">
                <div className="flex items-center md:items-center flex-col gap-1">
                    <p className="uppercase text-neutral-500 text-lg md:text-xs">wpm:</p>
                    <p className="text-white font-semibold text-3xl md:text-base">{results.wpm}</p>
                </div>
                <div className="flex items-center md:items-center flex-col gap-1">
                    <p className="capitalize text-neutral-500 text-lg md:text-xs">Accuracy:</p>
                    <p className="text-white font-semibold text-3xl md:text-base">{results.accuracy}%</p>
                </div>
                <div className="flex items-center md:items-center flex-col gap-1">
                    <p className="capitalize text-neutral-500 text-lg md:text-xs">Time:</p>
                    <p className="text-yellow-400 font-semibold text-3xl md:text-base">{formatTime(session.time)}</p>
                </div>
            </section>

            {/* Mobile Selects */}
            <section className={`lg:hidden px-10 pt-5 flex md:flex-col gap-3 w-full transition-opacity duration-300 ${progress.begin ? "opacity-40 pointer-events-none" : "opacity-100"
                }`}>
                <select
                    defaultValue={settings.difficulty}
                    disabled={!!progress.begin}
                    value={settings.difficulty}
                    onChange={(e: React.ChangeEvent<SelectElements>)=>dispatch(raiseDifficulty(e.currentTarget.value))}
                    className="w-full px-3 py-4 rounded-lg bg-neutral-800 text-white border border-neutral-700 cursor-pointer hover:border-neutral-600 transition-colors text-sm"
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <select
                    defaultValue={settings.timerMode}
                    disabled={!!progress.begin}
                    onChange={()=>onSetMode()}
                    className="w-full px-3 py-4 rounded-lg bg-neutral-800 text-white border border-neutral-700 cursor-pointer hover:border-neutral-600 transition-colors text-sm"
                >
                    <option value="15s">Timed (15s)</option>
                    <option value="30s">Timed (30s)</option>
                    <option value="60s">Timed (60s)</option>
                    <option value="120s">Timed (120s)</option>
                    <option value="passage">Passage</option>
                </select>
            </section>

            {/* Desktop Layout */}
            <section className="hidden lg:flex items-center gap-2 justify-between *:border-r *:border-neutral-800 *:last:border-0 text-sm">
                <div className="flex w-full items-baseline gap-2">
                    <p className="uppercase text-lg text-neutral-400">wpm:</p>
                    <p className="text-white text-2xl font-semibold">{results.wpm}</p>
                </div>
                <div className="flex w-full items-baseline px-4 gap-2">
                    <p className="capitalize text-lg text-neutral-400">Accuracy:</p>
                    <p className="text-white text-2xl font-semibold">{results.accuracy}%</p>
                </div>

                <div className="flex items-center w-full gap-10">
                    <div className="flex w-full items-baseline gap-2">
                        <p className="capitalize text-lg text-neutral-400">Time:</p>
                        <p className="text-yellow-400 text-2xl font-semibold">{formatTime(session.time)}</p>
                    </div>

                    <div className="flex w-full items-center gap-2">
                        <p className="capitalize text-neutral-400">Difficulty:</p>
                        <div className={`flex gap-1.5 bg-neutral-800 border-neutral-700/90 border p-2 py-2.5 rounded-md transition-opacity duration-300 ${progress.begin ? "opacity-40 pointer-events-none" : "opacity-100"
                            }`}>
                            <button
                                disabled={!!progress.begin}
                                onClick={() => dispatch(raiseDifficulty("easy"))}
                                className={`px-2 py-0.5 text-xs rounded-sm transition-colors ${settings.difficulty === "easy"
                                    ? "border-yellow-400 bg-yellow-400/10 text-white rounded-sm border"
                                    : "text-neutral-400 hover:text-white"
                                    }`}
                            >
                                Easy
                            </button>
                            <button
                                disabled={!!progress.begin}
                                onClick={() => dispatch(raiseDifficulty("medium"))}
                                className={`px-2 py-0.5 text-xs transition-colors ${settings.difficulty === "medium"
                                    ? "border-yellow-400 bg-yellow-400/10 text-white rounded-sm border"
                                    : "border-neutral-700 text-neutral-400 hover:text-white"
                                    }`}
                            >
                                Medium
                            </button>
                            <button
                                disabled={!!progress.begin}
                                onClick={() => dispatch(raiseDifficulty("hard"))}
                                className={`px-2 py-0.5 text-xs rounded-sm transition-colors ${settings.difficulty === "hard"
                                    ? "border-yellow-400 bg-yellow-400/10 text-white rounded-sm border"
                                    : "text-neutral-400 hover:text-white"
                                    }`}
                            >
                                Hard
                            </button>
                        </div>
                    </div>

                    <div className="flex w-full items-center gap-2">
                        <p className="capitalize text-neutral-400">Mode:</p>
                        <div className={`flex gap-1.5 bg-neutral-800 border-neutral-700/90 border p-2 py-2.5 rounded-md transition-opacity duration-300 ${progress.begin ? "opacity-40 pointer-events-none" : "opacity-100"
                            }`}>
                            <button
                                disabled={!!progress.begin}
                                onClick={() => onSetMode("15s")}
                                className={`px-2 py-0.5 text-xs rounded-sm transition-colors ${settings.timerMode === "15s"
                                    ? "border-yellow-400 bg-yellow-400/10 text-white rounded-sm border"
                                    : "text-neutral-400 hover:text-white"
                                    }`}
                            >
                                15s
                            </button>
                            <button
                                disabled={!!progress.begin}
                                onClick={() => onSetMode("30s")}
                                className={`px-2 py-0.5 text-xs rounded-sm transition-colors ${settings.timerMode === "30s"
                                    ? "border-yellow-400 bg-yellow-400/10 text-white rounded-sm border "
                                    : "text-neutral-400 hover:text-white"
                                    }`}
                            >
                                30s
                            </button>
                            <button
                                disabled={!!progress.begin}
                                onClick={() => onSetMode("60s")}
                                className={`px-2 py-0.5 text-xs rounded-sm transition-colors ${settings.timerMode === "60s"
                                    ? "border-yellow-400 bg-yellow-400/10 text-white rounded-sm border"
                                    : "text-neutral-400 hover:text-white"
                                    }`}
                            >
                                60s
                            </button>
                            <button
                                disabled={!!progress.begin}
                                onClick={() => onSetMode("120s")}
                                className={`px-2 py-0.5 text-xs transition-colors ${settings.timerMode === "120s"
                                    ? "border-yellow-400 bg-yellow-400/10 text-white rounded-sm border"
                                    : "text-neutral-400 hover:text-white"
                                    }`}
                            >
                                120s
                            </button>
                            <button
                                disabled={!!progress.begin}
                                onClick={() => onSetMode("passage")}
                                className={`px-2 py-0.5 text-xs transition-colors ${settings.timerMode === "passage"
                                    ? "border-yellow-400 bg-yellow-400/10 text-white rounded-sm border "
                                    : "border-neutral-700 text-neutral-400 hover:text-white"
                                    }`}
                            >
                                Passage
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Menu