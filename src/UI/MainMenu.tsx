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

const ViewableScreen: CSSProperties = {}

const ImageText: CSSProperties = {
  position: 'absolute',
  width: '50%',
  top: '20%',
  left: '50%',
  transform: 'translateX(-50%) translateY(-50%)'
}

const ImageFullBackground: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  margin: '0px'
}

const PlayButton: CSSProperties = {
  position: 'fixed',
  right: '20px',
  bottom: '20px',
  fontFamily: 'monospace',
  fontSize: 'xxx-large'
}

const SettingsButton: CSSProperties = {
  position: 'fixed',
  right: '20px',
  top: '10px',
  margin: '0 auto',
  fontFamily: 'monospace',
  fontSize: 'large'
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
      <img src="images/landing/02.jpg" style={ImageFullBackground} />
      <img src="images/landing/text.png" style={ImageText} />
      <button onClick={() => onStartGame()} className="push--skeuo" style={PlayButton}>
        Play
      </button>
      <button onClick={() => dispatch(setScreenState('options'))} style={SettingsButton}>
        Settings
      </button>
    </div>
  )
}
