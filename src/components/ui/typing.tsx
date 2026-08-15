import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { gameStarted } from '../../features/userProgress/gameSlice';
import { Button } from './button';
import { RotateCcw } from 'lucide-react';
import { seperateText } from '../../lib/utils';
import { getLetterIndex } from '../../lib/utils';
import type { AudioTypes } from '../../App';

interface Props {
    passage: string,
    onReset: () => void
    onSound: (type:AudioTypes, isPlay:boolean) => void
}

const TypingArea = ({ passage, onReset, onSound }: Props) => {
    //Currently typed characters by the player
    const progress = useAppSelector(state=>state.progress);
const settings = useAppSelector(state=>state.settings);
    const results = useAppSelector(state=>state.result);
    const  dispatch = useAppDispatch();
    const arrayOfWords = seperateText(passage, progress.typedChars);

 
    const handleStart = () =>{
        onSound('start', settings.audio);
        dispatch(gameStarted(true))
    }
    
    return (
        <div className='mx-4 sm:mx-8 md:mx-32 text-xl sm:text-2xl md:text-4xl mt-6 leading-8 sm:leading-9 md:leading-12 relative'>
            <div className='border-b-[0.8px] border-neutral-800 pb-6 sm:pb-8 md:pb-10'>
                <div className={`h-32 sm:h-1/2 md:h-[50vh] overflow-y-auto scrollbar-hide ${!progress.begin ? "blur-sm" : "blur-none"}`}>
                    <p
                        className={` transition-all m-4 relative text-neutral-500/60 flex flex-wrap word-break duration-300 `}
                    >

                        {passage.match(/\S+|\s+/g)!.map((token, j) => {

                            if (token === " ") {
                                const lightUp = (arrayOfWords.length > j && arrayOfWords[j] !== " ") ? "text-red-500 underline" : ""
                                return (
                                    <span key={j} className={`whitespace-pre ${((progress.wordCount % 2 !== 0) && progress.wordCount === j) && "underline text-neutral-500"} ${lightUp}`}>
                                        &nbsp;
                                    </span>
                                );
                            }

                            return (
                                <span key={j} className="inline-flex">
                                    {[...token].map((char, i) => {
                                        //This gives us the current word that the player has typed.
                                        const currentWord = j < arrayOfWords.length ? arrayOfWords[j] : "";

                                        //This lights up, turning the character a shade of gray if they have typed the character in there current wor, which is where i will do the comparison
                                        const lightUp = currentWord && (i < currentWord.length)//When i move to the nextword, the other word doesn't seem to exist
                                        const color = lightUp ? (currentWord[i] === char ? 'text-green-500' : 'text-red-500') : ''
                                        const letterIndex = getLetterIndex(results.totalTypedWords, progress.prevWordLength);
                                        return <span
                                            key={i}
                                            className={
                                                (j <= progress.wordCount ? ((j == progress.wordCount) && (i === (letterIndex + 1) && progress.begin) ? `text-neutral-500 underline` : (lightUp ? color : '')) : "")

                                            }
                                        >
                                            {char}
                                        </span>
                                    })}
                                </span>
                            );
                        })}
                    </p>
                </div>
            </div>

            {/* Restart button - always mounted, fades in/out */}
            <div
                className={`flex items-center justify-center p-3 sm:p-4 md:p-5 transition-opacity duration-300 ${progress.begin ? "opacity-100" : "opacity-0 pointer-events-none absolute inset-0"
                    }`}
            >
                <Button onClick={onReset} className={"text-sm sm:text-base md:text-lg px-4 py-3 sm:px-5 sm:py-4 md:p-6"}>
                    <RotateCcw className='w-4 h-4 sm:w-5 sm:h-5' />
                    Restart Test
                </Button>
            </div>

            {/* Start overlay - always mounted, fades in/out */}
            <div
                className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 transition-opacity duration-300 ${!progress.begin ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
            >
                <Button
                    disabled={progress.begin}
                    onClick={handleStart}
                    className='bg-blue-600 hover:bg-blue-500 text-white p-12 sm:px-8 sm:py-7 text-base sm:text-lg md:text-xl font-semibold rounded-lg shadow-lg shadow-blue-600/50 hover:shadow-xl hover:shadow-blue-500/60  transition-all duration-300 animate-pulse-glow'
                >
                    Start Typing Test
                </Button>
                <p className='text-xs sm:text-sm mt-3 text-neutral-400'>
                    or click the text to start typing
                </p>
            </div>
        </div>
    )
}

export default TypingArea;