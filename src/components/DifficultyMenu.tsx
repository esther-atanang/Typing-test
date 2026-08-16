import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { raiseDifficulty } from '../features/userSettings/settingSlice';
const Difficulty = () => {
 const settings = useAppSelector((state)=>state.settings);
  const progress = useAppSelector((state)=>state.progress);
  const dispatch = useAppDispatch()
  return (
       <div className={`flex gap-1.5 rounded-md border border-neutral-700/90 bg-neutral-800 px-1.5 py-2.5 transition-opacity duration-300 ${progress.begin ? "opacity-40 pointer-events-none" : "opacity-100"
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
                    disabled={progress.begin}
                    onClick={() => dispatch(raiseDifficulty("hard"))}
                    className={`px-2 py-0.5 text-xs rounded-sm transition-colors ${settings.difficulty === "hard"
                        ? "border-yellow-400 bg-yellow-400/10 text-white rounded-sm border"
                        : "text-neutral-400 hover:text-white"
                        }`}
                >
                    Hard
                </button>
            </div>
  )
}

export default Difficulty
