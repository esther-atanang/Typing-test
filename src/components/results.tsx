
import { RotateCw } from 'lucide-react';
import { Completed, IconNewPb, PatternStar1, PatternStar2, PatternConfetti } from '../assets';
// import { useEffect } from 'react';
type ScoreType = 'baseline' | 'below' | 'above'

interface IResult {
  type: ScoreType,
  wpm: number,
  totalTypedChar: number,
  totalChar: number,
  accuracy: number,
  handleReset: ()=>void,
  handleLevel: (l:number)=>void,
  handleGameEnd: ()=>void

}

const ResultPage = (result: IResult) => {
  // Determine title, description, and button text based on score type
  const getResultContent = () => {
    switch (result.type) {
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

  const content = getResultContent();
    //This checks if the game has ended.
  const handleNewLevel = () => {

      result.handleReset();
      result.handleLevel(1);
      result.handleGameEnd();
    
  }
  return (
    <div className="w-full h-dvh md:h-full bg-neutral-900 flex items-center justify-center relative overflow-hidden">
      {/* Decorative stars/elements */}

      <div className="absolute top-8 left-8">
        <img src={PatternStar2} alt='star' />
      </div>
      <div className="absolute bottom-12 right-12 text-yellow-400 text-3xl">
        <img src={PatternStar1} alt="star" />
      </div>
      <div className="absolute bottom-32 left-8 text-blue-400 text-2xl">✦</div>

      <img className={result.type == "above" ? 'w-full absolute bottom-0 md:-bottom-40 right-0 left-0 opacity-80 pointer-events-none': "hidden"} src={PatternConfetti} alt="confetti" />

      {/* Main content container */}
      <div className="w-full max-w-lg flex flex-col items-center justify-end text-center gap-4 md:gap-6">

        {/* Icon */}
        <div className="flex justify-center">
          {content.icon === 'checkmark' ? (
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-green-500/10 flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-500/30 p-2 flex items-center justify-center">
                <img src={Completed} alt="Personal best" className="w-14 h-14 md:w-16 md:h-16" />
              </div>
            </div>
          ) : (
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
              <img src={IconNewPb} alt="Personal best" className="w-12 h-12 md:w-16 md:h-16 text-yellow-400" />
            </div>
          )}
        </div>

        {/* Title */}
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-base mb-2 md:mb-3">
            {content.title}
          </h1>
          <p className="text-sm md:text-base text-neutral-400">
            {content.description}
          </p>
        </div>

        {/* Stats Container */}
        <div className="w-full flex flex-col md:flex-row gap-3 md:gap-4">
          {/* WPM Stat */}
          <div className="flex-1 bg-neutral-800 rounded-lg p-3 md:p-4 border border-neutral-700">
            <p className="text-neutral-400 text-xs md:text-sm mb-2">WPM</p>
            <p className="text-2xl md:text-3xl font-bold text-neutral-base">
              {result.wpm}
            </p>
          </div>

          {/* Accuracy Stat */}
          <div className="flex-1 bg-neutral-800 rounded-lg p-3 md:p-4 border border-neutral-700">
            <p className="text-neutral-400 text-xs md:text-sm mb-2">Accuracy</p>
            <p className="text-2xl md:text-3xl font-bold text-red-500">
              {result.accuracy}%
            </p>
          </div>

          {/* Characters Stat */}
          <div className="flex-1 bg-neutral-800 rounded-lg p-3 md:p-4 border border-neutral-700">
            <p className="text-neutral-400 text-xs md:text-sm mb-2">Characters</p>
            <p className="text-2xl md:text-3xl font-bold text-green-500">
              {result.totalTypedChar}/{result.totalChar}
            </p>
          </div>
        </div>

        {/* Button */}
        <button onClick={handleNewLevel} className="bg-neutral-base text-neutral-900 font-semibold py-3 px-8 rounded-lg hover:bg-neutral-400 transition-colors flex items-center gap-2 md:text-base text-sm">
          {content.buttonText}
          <RotateCw className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default ResultPage
