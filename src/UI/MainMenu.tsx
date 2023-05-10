/**
 * Module:          MainMenu
 * Responsibility:  Shows the main menu of the game.
 */

import './MainMenu.css'

import { CSSProperties } from 'react'
import GameResultModel from '../Models/GameResultModel'
import { startGame } from '../StartGame'
import { setGameInProgress, setScreenState } from '../State/Game/GameActions'
import { dispatch } from '../State/Store'

const ViewableScreen: CSSProperties = {
  textAlign: 'center',
  width: '100vw',
  height: '100vh',
  margin: '0px'
}

const ImageFullBackground: CSSProperties = {
  width: '100%',
  height: '100%'
}

const PlayButton: CSSProperties = {
  position: 'fixed',
  left: '50%',
  bottom: '10px',
  transform: 'translate(-50%, -10%)',
  margin: '0 auto',
  fontFamily: 'monospace',
  fontSize: 'xxx-large'
}

export default function MainMenu(props: {
  setGameResult(result: GameResultModel): void
}): JSX.Element {
  const { setGameResult } = props
  function onStartGame(): void {
    // Remove the menu UI from screen.
    dispatch(setScreenState('playing'))

    // Lazy load the game. When the game starts it sets dimension constants all though the game
    // before this is done we want to make sure the game is either running in full screen
    // or windows mode.
    // Once loaded this module stays loaded. Thats why the game, when it ends, doesn't show the
    // main menu as switching to full screen would have no effect at that point.
    startGame((result) => {
      dispatch(setScreenState('gameover'))
      setGameResult(result)
      dispatch(setGameInProgress(false))
    })
  }

  return (
    <div style={ViewableScreen}>
      <img src="images/landing.jpg" style={ImageFullBackground} />
      <button onClick={() => onStartGame()} className="push--skeuo" style={PlayButton}>
        Play
      </button>
    </div>
  )
}
