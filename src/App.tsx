import Header from "./components/header";
import Menu from "./components/Menu";
import ResultPage from "./components/results";
import TypingArea from "./components/ui/typing";
import { useEffect, useRef, useState} from "react";
import data from './assets/data.json' with {type: 'json'}
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { raiseDifficulty, raiseLevel, type Duration } from "./features/userSettings/settingSlice";
import { setTime, updatedTime } from "./features/timer/timingSlice";

export type Difficulty = "easy" | "medium" | "hard";
export type Mode = "15s" | "30s" | "60s" | "120s" | "passage";
export interface Results {
  accuracy: number,
  totalTypedWords: number,
  correctCharacters: number
}
export interface Timer {
  mode: Mode,
  time: number
}


  const getTimer = (time: Mode) => {
    switch (time) {
      case "15s":
        return { mode: time, time: 15 };
      case "30s":
        return { mode: time, time: 30 };
      case "60s":
        return { mode: time, time: 60 };
      case "120s":
        return { mode: time, time: 120 };
      case "passage":
        return { mode: time, time: 0 };
    }

  }
const App = () => {
  //What exactly is global, and what belongs within this file.
  //Plus i need to figure out what states can be grouped together, cause i can't have different multiple slices.
  // I need to type the keyboard event properly.
  // Relearn a useEffect
  const dispatch = useAppDispatch()
  const settings = useAppSelector((state)=>state.settings)
  const time = useAppSelector((state)=>state.timer)
  const defaultTime = getTimer(settings.timerMode)



   // gameSlice
  const [begin, setOnBegin] = useState(false); //starts the game.
  const [gameEnded, setGameEnded] = useState(false) //ends the game //strip this away.
  const [typedChars, setTypedChars] = useState(""); //current user's text
  const [wordCount, setWordCount] = useState(0); //If the user types, they will always type the letter in the first word.
  const [prevWordCountLength, setPrevWordCountLength] = useState(0); //The initial wordCount Length is set to zero because there wasn't an word before the first word



  // ResultSlice
  const [results, setResults] = useState<Results>({ accuracy: 100, totalTypedWords: 0, correctCharacters: 0 });
  const [wpm, setWPM] = useState(0); //why do i have the wpm seperate from the results
  const timerRef = useRef<number>(0);


  const handleDifficulty = (mode: Difficulty) => {
    dispatch(raiseDifficulty(mode))
  }


  const handleLevel = () =>{
     dispatch(raiseLevel())
  }
  //Plain variable without state
  const passageText: string = data[settings.difficulty][settings.level].text;



  //Util functions..

  const calculateWPM = (NoOfCharactersTyped: number, elaspedTime: number) => {
    return Math.round((NoOfCharactersTyped / (Math.max(elaspedTime, 1) / 60)) / 5);
  };




  //Function the progresses levels...

  //Handlers used..
  const handleReset = () => {
    //Restarts the game by clearing current settings...
    setOnBegin(false);
    setTypedChars("");
    setWordCount(0);
    setPrevWordCountLength(0);
    dispatch(setTime(defaultTime.time))
    setResults({
      accuracy: 0,
      totalTypedWords: 0,
      correctCharacters: 0,
    });
    setWPM(0);
  }

  const handleBegin = () => {
    setOnBegin(true);
  }

  const handleTimer = (mode?:Duration) => {
        if(mode){
            dispatch(setTime(getTimer(mode).time));
        }else{
           dispatch(setTime(defaultTime.time));
        }   
  }




  //UseEffects
  useEffect(() => {
    if (passageText.length === results.totalTypedWords) {
      // setGameEnded(true);
      // setOnBegin(false)
    }
  }, [passageText, results.totalTypedWords])


     //Then calculate the word per minute in here every second. This is calculated regardless on whether the user is typing
        //Assuming that we get the most accurate result
        // I need to think of a way to reduce the amount of time the wpm is calaculated
        // const elaspedTime = (Math.max(((mode !== 'passage' ? getTimer(mode).time : time) - time), 1))
        // const updateWpm = calculateWPM(results.totalTypedWords, elaspedTime);
        // setWPM(updateWpm);
  //This sets the timer for each game
  useEffect(() => {
    // Move this into a Timer slice.
    //passageLength, and result.totalTypedWords affects the timer, so how 
    const timingFunction = (mode: Duration) => {
      return setInterval(() => {
 
        dispatch(updatedTime(mode))
        if (time == 0) {
          setGameEnded(true);
        }
      }, 1000)

    }

    if(begin) timerRef.current = timingFunction(settings.timerMode)

    // if (settings.timerMode !== "passage" && time > 0 && begin) {
    //   timerRef.current = timingFunction(settings.timerMode);
    // } else if (settings.timerMode == "passage" && begin) {
    //   timerRef.current = timingFunction(settings.timerMode);
    // }

    return () => clearInterval(timerRef.current)
  }, [begin, dispatch,settings.timerMode,time])


  //This handles a user typing
  useEffect(() => {

    //User is typing
    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
        return;
      }
      if (begin && e.key.length === 1 &&
        !e.ctrlKey &&
        !e.altKey &&
        !e.metaKey) {
        if (passageText[results.totalTypedWords + 1] == " ") {
          //I have to also check if the next letter in the passage is actually equal to the space character.
          setPrevWordCountLength(results.totalTypedWords + 1);
          setWordCount((value) => value + 1);
        }
        if ((wordCount % 2) !== 0) {
          setWordCount((value) => value + 1);
          setPrevWordCountLength((value) => value + 1);
        }
        const chara = e.key;
        const correct = passageText[results.totalTypedWords] === chara ? 1 : 0;
        const totalTypedChars = results.totalTypedWords + 1;
        const correctCharacters = results.correctCharacters + correct;
        //This only adds to the characters that would be used to calculate the wpm
        const updatedAccur = Math.round((correctCharacters / totalTypedChars) * 100);
        const newResults = {
          totalTypedWords: totalTypedChars,
          correctCharacters,
          accuracy: updatedAccur,
        };
        setResults(newResults)
        setTypedChars(c => c + chara)
      }
    }
    document.addEventListener("keydown", handleGlobalKeyDown)

    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown)
    }
  }, [begin, results, passageText, wordCount])



  return (
    <main className="bg-neutral-900 relative flex flex-col h-screen gap-0 *:font-custom max-w-full text-white ">
      <Header />
      {(!gameEnded) ? (
        <>
          <Menu
            wpm={wpm}
            hasStarted={begin}
            time={time}
            mode={settings.timerMode}
            results={results}
            difficulty={settings.difficulty}
            onSetMode={handleTimer}
            onSetDifficulty={handleDifficulty}
          />
          <TypingArea
            typedChars={typedChars}
            prevWordCountLen={prevWordCountLength}
            wordCount={wordCount}
            results={results}
            onReset={handleReset}
            passage={passageText}
            start={begin}
            onStart={handleBegin}
          />
        </>
      )
        :
        // change the handle to On e.h handleLevel  to onChangeLevel onReeset, onGameEnd
        <ResultPage
          type="baseline"
          wpm={wpm}
          accuracy={results.accuracy}
          totalChar={passageText.length}
          totalTypedChar={results.totalTypedWords}
          handleReset={handleReset}
          handleLevel={handleLevel}
          handleGameEnd={() => setGameEnded(false)}
        />
      }
    </main>
  )
};

export default App;