import type { Results, Difficulty, Timer } from "../App"
import type { Duration } from "../features/userSettings/settingSlice";


interface Props {
    difficulty: Difficulty,
    time: number,
    mode: Duration,
    onSetMode: (value?:Duration) => void,
    onSetDifficulty: (mode: Difficulty) => void,
    hasStarted: boolean,
    wpm: number,
    results: Results
}
const Menu = ({ wpm, hasStarted, difficulty,time, mode , onSetMode, onSetDifficulty, results }: Props) => {

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    return (
        <section className='md:mx-32 border-b-[0.8px] border-neutral-800 pb-5'>
            {/* Mobile Stats Grid */}
            <section className="lg:hidden grid grid-cols-3 gap-2 *:pr-2 *:border-r *:border-neutral-800 *:last:border-0 items-center text-xs">
                <div className="flex items-center md:items-center flex-col gap-1">
                    <p className="uppercase text-neutral-500 text-lg md:text-xs">wpm:</p>
                    <p className="text-white font-semibold text-3xl md:text-base">{wpm}</p>
                </div>
                <div className="flex items-center md:items-center flex-col gap-1">
                    <p className="capitalize text-neutral-500 text-lg md:text-xs">Accuracy:</p>
                    <p className="text-white font-semibold text-3xl md:text-base">{results.accuracy}%</p>
                </div>
                <div className="flex items-center md:items-center flex-col gap-1">
                    <p className="capitalize text-neutral-500 text-lg md:text-xs">Time:</p>
                    <p className="text-yellow-400 font-semibold text-3xl md:text-base">{formatTime(time)}</p>
                </div>
            </section>

            {/* Mobile Selects */}
            <section className={`lg:hidden px-10 pt-5 flex md:flex-col gap-3 w-full transition-opacity duration-300 ${hasStarted ? "opacity-40 pointer-events-none" : "opacity-100"
                }`}>
                <select
                    disabled={!!hasStarted}
                    value={difficulty}
                    onChange={(e) => onSetDifficulty(e.target.value)}
                    className="w-full px-3 py-4 rounded-lg bg-neutral-800 text-white border border-neutral-700 cursor-pointer hover:border-neutral-600 transition-colors text-sm"
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <select
                    disabled={!!hasStarted}
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
                    <p className="text-white text-2xl font-semibold">{wpm}</p>
                </div>
                <div className="flex w-full items-baseline px-4 gap-2">
                    <p className="capitalize text-lg text-neutral-400">Accuracy:</p>
                    <p className="text-white text-2xl font-semibold">{results.accuracy}%</p>
                </div>

                <div className="flex items-center w-full gap-10">
                    <div className="flex w-full items-baseline gap-2">
                        <p className="capitalize text-lg text-neutral-400">Time:</p>
                        <p className="text-yellow-400 text-2xl font-semibold">{formatTime(time)}</p>
                    </div>

                    <div className="flex w-full items-center gap-2">
                        <p className="capitalize text-neutral-400">Difficulty:</p>
                        <div className={`flex gap-1.5 bg-neutral-800 border-neutral-700/90 border p-2 py-2.5 rounded-md transition-opacity duration-300 ${hasStarted ? "opacity-40 pointer-events-none" : "opacity-100"
                            }`}>
                            <button
                                disabled={!!hasStarted}
                                onClick={() => onSetDifficulty("easy")}
                                className={`px-2 py-0.5 text-xs rounded-sm transition-colors ${difficulty === "easy"
                                    ? "border-yellow-400 bg-yellow-400/10 text-white rounded-sm border"
                                    : "text-neutral-400 hover:text-white"
                                    }`}
                            >
                                Easy
                            </button>
                            <button
                                disabled={!!hasStarted}
                                onClick={() => onSetDifficulty("medium")}
                                className={`px-2 py-0.5 text-xs transition-colors ${difficulty === "medium"
                                    ? "border-yellow-400 bg-yellow-400/10 text-white rounded-sm border"
                                    : "border-neutral-700 text-neutral-400 hover:text-white"
                                    }`}
                            >
                                Medium
                            </button>
                            <button
                                disabled={!!hasStarted}
                                onClick={() => onSetDifficulty("hard")}
                                className={`px-2 py-0.5 text-xs rounded-sm transition-colors ${difficulty === "hard"
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
                        <div className={`flex gap-1.5 bg-neutral-800 border-neutral-700/90 border p-2 py-2.5 rounded-md transition-opacity duration-300 ${hasStarted ? "opacity-40 pointer-events-none" : "opacity-100"
                            }`}>
                            <button
                                disabled={!!hasStarted}
                                onClick={() => onSetMode("15s")}
                                className={`px-2 py-0.5 text-xs rounded-sm transition-colors ${mode === "15s"
                                    ? "border-yellow-400 bg-yellow-400/10 text-white rounded-sm border"
                                    : "text-neutral-400 hover:text-white"
                                    }`}
                            >
                                15s
                            </button>
                            <button
                                disabled={!!hasStarted}
                                onClick={() => onSetMode("30s")}
                                className={`px-2 py-0.5 text-xs rounded-sm transition-colors ${mode === "30s"
                                    ? "border-yellow-400 bg-yellow-400/10 text-white rounded-sm border "
                                    : "text-neutral-400 hover:text-white"
                                    }`}
                            >
                                30s
                            </button>
                            <button
                                disabled={!!hasStarted}
                                onClick={() => onSetMode("60s")}
                                className={`px-2 py-0.5 text-xs rounded-sm transition-colors ${mode === "60s"
                                    ? "border-yellow-400 bg-yellow-400/10 text-white rounded-sm border"
                                    : "text-neutral-400 hover:text-white"
                                    }`}
                            >
                                60s
                            </button>
                            <button
                                disabled={!!hasStarted}
                                onClick={() => onSetMode("120s")}
                                className={`px-2 py-0.5 text-xs transition-colors ${mode === "120s"
                                    ? "border-yellow-400 bg-yellow-400/10 text-white rounded-sm border"
                                    : "text-neutral-400 hover:text-white"
                                    }`}
                            >
                                120s
                            </button>
                            <button
                                disabled={!!hasStarted}
                                onClick={() => onSetMode("passage")}
                                className={`px-2 py-0.5 text-xs transition-colors ${mode === "passage"
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