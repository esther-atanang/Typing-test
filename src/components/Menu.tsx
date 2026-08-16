import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { raiseDifficulty, raiseLevel, setDuration, type Difficulty, type Duration } from "../features/userSettings/settingSlice";
import { formatTime, getTimer } from "../lib/utils";
import { setTime } from "../features/timer/timingSlice";

interface Props { 
    onSetMode: (value?:Duration) => void,
}

interface SelectElements extends HTMLSelectElement {
    value: Difficulty
} 

interface SelectDurationElements extends HTMLSelectElement {
    value: Duration
} 

const Menu = ({onSetMode}: Props) => {
    const results = useAppSelector(state=>state.result);
    const session = useAppSelector(state=>state.timer)
    const settings = useAppSelector(state=>state.settings)
    const progress = useAppSelector(state=>state.progress)
    const dispatch = useAppDispatch();

    const handleDifficultyChange = (difficulty: Difficulty, event?: React.MouseEvent<HTMLButtonElement>) => {
        if (progress.begin) {
            event?.preventDefault();
            event?.stopPropagation();
            return;
        }
        dispatch(raiseDifficulty(difficulty));
    };

    const handleModeChange = (mode: Duration, event?: React.MouseEvent<HTMLButtonElement>) => {
        if (progress.begin) {
            event?.preventDefault();
            event?.stopPropagation();
            return;
        }
        onSetMode(mode);
    };

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
            <section className="xl:hidden grid grid-cols-3 divide-x divide-neutral-800 items-center text-xs">
                <div className="flex flex-col items-center gap-1 px-3">
                    <p className="uppercase text-neutral-500 text-lg md:text-xs">wpm:</p>
                    <p className="min-w-[3ch] text-center font-semibold tabular-nums text-foreground text-3xl md:text-base">{results.wpm}</p>
                </div>
                <div className="flex flex-col items-center gap-1 px-3">
                    <p className="capitalize text-neutral-500 text-lg md:text-xs">Accuracy:</p>
                    <p className="min-w-[4ch] text-center font-semibold tabular-nums text-foreground text-3xl md:text-base">{results.accuracy}%</p>
                </div>
                <div className="flex flex-col items-center gap-1 px-3">
                    <p className="capitalize text-neutral-500 text-lg md:text-xs">Time:</p>
                    <p className="w-[5ch] text-center font-semibold tabular-nums text-yellow-400 text-3xl md:text-base">{formatTime(session.time)}</p>
                </div>
            </section>

            {/* Mobile Selects */}
            <section className={`xl:hidden px-10 pt-5 flex md:flex-col gap-3 w-full transition-opacity duration-300 ${progress.begin ? "opacity-40 pointer-events-none" : "opacity-100"
                }`}>
                <select
                    defaultValue={settings.difficulty}
                    disabled={!!progress.begin}
                    value={settings.difficulty}
                    onChange={(e: React.ChangeEvent<SelectElements>)=>dispatch(raiseDifficulty(e.currentTarget.value))}
                    className="w-full px-3 py-4 rounded-lg bg-neutral-800 text-foreground border border-neutral-700 cursor-pointer hover:border-neutral-600 transition-colors text-sm"
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <select
                    defaultValue={settings.timerMode}
                    disabled={!!progress.begin}
                    onChange={(e: React.ChangeEvent<SelectDurationElements>)=>dispatch(setDuration(e.currentTarget.value))}
                    className="w-full px-3 py-4 rounded-lg bg-neutral-800 text-foreground border border-neutral-700 cursor-pointer hover:border-neutral-600 transition-colors text-sm"
                >
                    <option value="15s">Timed (15s)</option>
                    <option value="30s">Timed (30s)</option>
                    <option value="60s">Timed (60s)</option>
                    <option value="120s">Timed (120s)</option>
                    <option value="passage">Passage</option>
                </select>
            </section>

            {/* Desktop Layout */}
<section className={`hidden xl:flex xl:items-baseline xl:whitespace-nowrap`}>
    <div className="flex items-baseline gap-2 border-r border-neutral-800 pr-4">
        <p className="uppercase text-lg text-neutral-400">wpm:</p>
        <p className="min-w-[3ch] text-2xl font-semibold tabular-nums text-foreground">{results.wpm}</p>
    </div>
    <div className="flex items-baseline gap-2 border-r border-neutral-800 px-4">
        <p className="capitalize text-lg text-neutral-400">Accuracy:</p>
        <p className="min-w-[4ch] text-2xl font-semibold tabular-nums text-foreground">{results.accuracy}%</p>
    </div>

    <div className="flex items-baseline gap-2 pl-4">
        <p className="capitalize text-lg text-neutral-400">Time:</p>
        <p className="min-w-[4ch] text-left text-2xl font-semibold tabular-nums text-yellow-400">{formatTime(session.time)}</p>
    </div>

    <div className="flex flex-nowrap items-baseline gap-3 pl-7">
        <div className="flex items-baseline gap-2">
            <p className="capitalize text-neutral-400">Difficulty:</p>
            <div className={`flex flex-nowrap gap-1.5 rounded-md border border-neutral-700/90 bg-neutral-800 px-1.5 py-2.5 transition-opacity duration-300 ${progress.begin ? "opacity-40 pointer-events-none" : "opacity-100"
                }`}>
                <button
                    type="button"
                    disabled={progress.begin}
                    onPointerDown={(event) => {
                        if (progress.begin) {
                            event.preventDefault();
                        }
                    }}
                    onClick={(event) => handleDifficultyChange("easy", event)}
                    className={`px-2 py-0.5 text-xs rounded-sm transition-colors ${settings.difficulty === "easy"
                        ? "border-yellow-400 bg-yellow-400/10 text-foreground rounded-sm border"
                        : "text-neutral-400 hover:text-foreground"
                        }`}
                >
                    Easy
                </button>
                <button
                    type="button"
                    disabled={progress.begin}
                    onPointerDown={(event) => {
                        if (progress.begin) {
                            event.preventDefault();
                        }
                    }}
                    onClick={(event) => handleDifficultyChange("medium", event)}
                    className={`px-2 py-0.5 text-xs transition-colors ${settings.difficulty === "medium"
                        ? "border-yellow-400 bg-yellow-400/10 text-foreground rounded-sm border"
                        : "border-neutral-700 text-neutral-400 hover:text-foreground"
                        }`}
                >
                    Medium
                </button>
                <button
                    type="button"
                    disabled={progress.begin}
                    onPointerDown={(event) => {
                        if (progress.begin) {
                            event.preventDefault();
                        }
                    }}
                    onClick={(event) => handleDifficultyChange("hard", event)}
                    className={`px-2 py-0.5 text-xs rounded-sm transition-colors ${settings.difficulty === "hard"
                        ? "border-yellow-400 bg-yellow-400/10 text-foreground rounded-sm border"
                        : "text-neutral-400 hover:text-foreground"
                        }`}
                >
                    Hard
                </button>
            </div>
        </div>

        <div className="flex items-baseline gap-2">
            <p className="capitalize text-neutral-400">Mode:</p>
            <div className={`flex flex-nowrap gap-1.5 rounded-md border border-neutral-700/90 bg-neutral-800 px-1.5 py-2.5 transition-opacity duration-300 ${progress.begin ? "opacity-40 pointer-events-none" : "opacity-100"
                }`}>
                <button
                    type="button"
                    disabled={progress.begin}
                    onPointerDown={(event) => {
                        if (progress.begin) {
                            event.preventDefault();
                        }
                    }}
                    onClick={(event) => handleModeChange("15s", event)}
                    className={`px-2 py-0.5 text-xs rounded-sm transition-colors ${settings.timerMode === "15s"
                        ? "border-yellow-400 bg-yellow-400/10 text-foreground rounded-sm border"
                        : "text-neutral-400 hover:text-foreground"
                        }`}
                >
                    15s
                </button>
                <button
                    type="button"
                    disabled={progress.begin}
                    onPointerDown={(event) => {
                        if (progress.begin) {
                            event.preventDefault();
                        }
                    }}
                    onClick={(event) => handleModeChange("30s", event)}
                    className={`px-2 py-0.5 text-xs rounded-sm transition-colors ${settings.timerMode === "30s"
                        ? "border-yellow-400 bg-yellow-400/10 text-foreground rounded-sm border "
                        : "text-neutral-400 hover:text-foreground"
                        }`}
                >
                    30s
                </button>
                <button
                    type="button"
                    disabled={progress.begin}
                    onPointerDown={(event) => {
                        if (progress.begin) {
                            event.preventDefault();
                        }
                    }}
                    onClick={(event) => handleModeChange("60s", event)}
                    className={`px-2 py-0.5 text-xs rounded-sm transition-colors ${settings.timerMode === "60s"
                        ? "border-yellow-400 bg-yellow-400/10 text-foreground rounded-sm border"
                        : "text-neutral-400 hover:text-foreground"
                        }`}
                >
                    60s
                </button>
                <button
                    type="button"
                    disabled={progress.begin}
                    onPointerDown={(event) => {
                        if (progress.begin) {
                            event.preventDefault();
                        }
                    }}
                    onClick={(event) => handleModeChange("120s", event)}
                    className={`px-2 py-0.5 text-xs transition-colors ${settings.timerMode === "120s"
                        ? "border-yellow-400 bg-yellow-400/10 text-foreground rounded-sm border"
                        : "text-neutral-400 hover:text-foreground"
                        }`}
                >
                    120s
                </button>
                <button
                    type="button"
                    disabled={progress.begin}
                    onPointerDown={(event) => {
                        if (progress.begin) {
                            event.preventDefault();
                        }
                    }}
                    onClick={(event) => handleModeChange("passage", event)}
                    className={`px-2 py-0.5 text-xs transition-colors ${settings.timerMode === "passage"
                        ? "border-yellow-400 bg-yellow-400/10 text-foreground rounded-sm border "
                        : "border-neutral-700 text-neutral-400 hover:text-foreground"
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
