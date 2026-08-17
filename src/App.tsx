import Header from "./components/header";
import Menu from "./components/Menu";
import ResultPage from "./components/results";
import TypingArea from "./components/ui/typing";
import React, { useEffect, useRef } from "react";
import data from './assets/data.json' with {type: 'json'}
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setDuration, type Duration } from "./features/userSettings/settingSlice";
import { setTime, startTime, updatedTime } from "./features/timer/timingSlice";
import { gameStarted, updatedNumberOfTypedChars, resetProgress, setPrevWordLength, updatedWordCount } from "./features/userProgress/gameSlice";
import { updateResult, setWPM, setHistory, clearResult } from "./features/result/resultSlice";
import { calculateWPM, getElaspedTime, getTimer } from "./lib/utils";
import { Error, KeyPressed, Start, Success } from "./assets";

 function sound(type: AudioTypes, isPlay: boolean, audioRef:React.RefObject<HTMLAudioElement|null>) {
    if (audioRef.current !== null) {
      audioRef.current.pause()

    }
    audioRef.current = new Audio();
    if (isPlay) {
      switch (type) {
        case 'success':
          audioRef.current.src = Success;
          return audioRef.current.play()
        case 'error':
          audioRef.current.src = Error;
          return audioRef.current.play();
        case 'pressed':
          audioRef.current.src = KeyPressed;
          return audioRef.current.play();
        case 'start':
          audioRef.current.src = Start;
          return audioRef.current.play();
      }
    }
  }


export type AudioTypes = 'success' | 'error' | 'start' | 'pressed'
const App = () => {

  //TODO: fix the states
  /**
   * 1. Fix the levels -- it is wonky - 1st
   * 2. Set up docker - 3rd
   * 3. Fix the UI
   * 4. set up the settings to work - 2nd
   * 5. maybe clean up code
   * 6. - this for some reason doesn't work
   */
  const dispatch = useAppDispatch()
  const settings = useAppSelector((state) => state.settings)
  const session = useAppSelector((state) => state.timer)
  const progress = useAppSelector((state) => state.progress)
  const results = useAppSelector((state) => state.result)
  const defaultTime = getTimer(settings.timerMode)
  const passageText: string = data[settings.difficulty][settings.level - 1].text
  const timerRef = useRef<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null)


  //Timer
  useEffect(() => {
    const timingFunction = (mode: Duration) => {
      return setInterval(() => {
        dispatch(updatedTime(mode))
        if (session.isExpired) {
          sound('success', settings.audio,audioRef) //TODO: test how this works with the timerr
          dispatch(gameStarted(false))
          dispatch(setHistory(mode))
        }
      }, 1000)
    }

    if (progress.begin) timerRef.current = timingFunction(settings.timerMode)

    return () => clearInterval(timerRef.current)
  }, [progress.begin, dispatch, settings.timerMode, session.isExpired, settings.audio])



  //Calculates the wpm
  useEffect(() => {
    const elaspedTime = (Math.max(getElaspedTime(settings.timerMode, session.time), 1))
    const updateWpm = calculateWPM(results.totalTypedWords, elaspedTime);
    dispatch(setWPM(updateWpm))

  }, [session.time, dispatch, results.totalTypedWords, settings.timerMode])



  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!progress.begin) {
      e.target.value = "";
      return;
    }

    const typedCharacter = e.target.value;

    // We only want one character at a time
    if (typedCharacter.length !== 1) {
      e.target.value = "";
      return;
    }

    if (passageText[results.totalTypedWords + 1] === " ") {
      dispatch(setPrevWordLength(results.totalTypedWords + 1));
      dispatch(updatedWordCount());
    }

    if ((progress.wordCount % 2) !== 0) {
      dispatch(updatedWordCount());
      dispatch(setPrevWordLength(progress.prevWordLength + 1));
    }

    const isCorrectlyTyped =
      passageText[results.totalTypedWords] === typedCharacter ? 1 : 0;

    const NumOftotalTypedCharacters = results.totalTypedWords + 1;

    if(NumOftotalTypedCharacters === 1){
        dispatch(startTime(true))
    }

    const correctCharacters =
      results.correctCharacters + isCorrectlyTyped;

    sound(
      isCorrectlyTyped ? "pressed" : "error",
      settings.audio,
      audioRef
    );

    const updatedAccur = Math.round(
      (correctCharacters / NumOftotalTypedCharacters) * 100
    );

    const result = {
      accuracy: updatedAccur,
      totalTypedWords: NumOftotalTypedCharacters,
      correctCharacters: correctCharacters
    };

    dispatch(updateResult(result));
    dispatch(updatedNumberOfTypedChars(typedCharacter));

    // Clear the input so it can receive the next character
    e.target.value = "";

    if (NumOftotalTypedCharacters === passageText.length) {
      sound("success", settings.audio, audioRef);
      dispatch(gameStarted(false));
      dispatch(setHistory(settings.timerMode));
    }
  };

  const handleReset = () => {
    //Restarts the game by clearing current settings...
    dispatch(resetProgress())
    dispatch(setTime(defaultTime.time))
    dispatch(clearResult())
  }


  const handleTimer = (mode?: Duration) => {
    if (mode) {
      dispatch(setTime(getTimer(mode).time));
      dispatch(setDuration(mode))
    } else {
      dispatch(setTime(defaultTime.time));
    }
  }


  return (
    <main className={` flex ${settings.theme} h-dvh max-w-full flex-col gap-0 bg-neutral-900  text-white *:font-custom`}>
      <Header />
      {((results.totalTypedWords !== passageText.length) && !session.isExpired) ? //TODO: this logic does not seeem to be enough 
        <>

          <Menu
            onSetMode={handleTimer}
          />
          <TypingArea
            onInputClick={handleInput}
            onSound={()=>sound('start',true,audioRef)}
            onReset={handleReset}
            passage={passageText}
          />

        </>
        :
        (
          <ResultPage
            totalPassageLength={passageText.length}
            onReset={handleReset} />
        )

      }
    </main>
  )
};

export default App;
