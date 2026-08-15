import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Duration } from "../features/userSettings/settingSlice";
import type { ScoreType } from "../components/results";
import { Error, KeyPressed, Start, Success } from "../assets";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getTimer = (time: Duration) => {
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

export const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }


export const seperateText = (actualContent: string, typedContent: string) => {
        let currentTypedContent = typedContent;
        const arrayOfWords = [];
        const actualContentArray = actualContent.match(/\S+|\s+/g) || [];
        for (let i = 0; i <= actualContentArray.length; i++) {
            if (currentTypedContent === "") break;
            const slicedString = currentTypedContent.slice(0, actualContentArray[i].length);
            currentTypedContent = currentTypedContent.slice(actualContentArray[i].length);
            arrayOfWords.push(slicedString);
        }
        return arrayOfWords;
    }

export const calculateWPM = (NoOfCharactersTyped: number, elaspedTime: number) => {
      return Math.round((NoOfCharactersTyped / (Math.max(elaspedTime, 1) / 60)) / 5);
    };
  

export const getResultContent = (type:ScoreType) => {
    switch (type) {
      case 'baseline':
        return {
          title: 'Baseline Established!',
          description: "You've set the bar. Now the real challenge begins—time to beat it.",
          buttonText: 'Beat This Score',
          icon: 'checkmark'
        }
      case 'above':
        return {
          title: 'High Score Smashed!',
          description: "You're getting faster. That was incredible typing.",
          buttonText: 'Beat This Score',
          icon: 'IconNewPb'
        }
      case 'below':
        return {
          title: 'Test Completed!',
          description: "Solid run. Keep pushing to beat your high score.",
          buttonText: 'Go Again',
          icon: 'checkmark'
        }
      default:
        return {
          title: 'Test Completed!',
          description: 'Solid run. Keep pushing to beat your high score.',
          buttonText: 'Go Again',
          icon: 'checkmark'
        }
    }
  }



    //This gets the current character position the player is at
export const getLetterIndex = (totalTypedLetters: number, prevWordLength: number) => {
        return totalTypedLetters - (prevWordLength + 1); //I am adding one to it because i am not subtracting one from the  total typed cgaracters
    }



export  const getElaspedTime = (mode:Duration, time:number) => {
    if(mode === 'passage'){
      return time;
    }else{
      return getTimer(mode).time - time
    }
   }

export const sound = (audio: HTMLAudioElement ,type:'success'|'error'|'start'|'pressed', isPlay:boolean) => {
      if(audio !== null){
        audio.pause()
      }

      if(isPlay){
         switch(type){
          case 'success':
            audio.src = Success;
            return audio.play()
          case 'error':
            audio.src = Error;
            return audio.play();
          case 'pressed':
            audio.src = KeyPressed;
            return audio.play();
          case 'start':
            audio.src = Start;
            audio.play();
         }

         return;
      }
   }