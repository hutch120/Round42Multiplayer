/**
 * Module:          MainMenu
 * Responsibility:  Shows the main menu of the game.
 */
import './Landing.css'

import { CSSProperties } from 'react'
import GameResultModel from '../Models/GameResultModel'
import { startGame } from '../StartGame'
import { setGameInProgress, setScreenState } from '../State/Game/GameActions'
import { dispatch } from '../State/Store'
import GameConnect from './GameConnect'

const ViewableScreen: CSSProperties = {}

const GameNameText: CSSProperties = {
  position: 'fixed',
  width: '100vw',
  top: 100,
  fontSize: 80,
  fontFamily: 'Roboto',
  textAlign: 'center',
  display: 'block',
  color: '#ff8100'
}

const GameInstructionsText: CSSProperties = {
  position: 'fixed',
  width: '100vw',
  left: 30,
  bottom: 30,
  fontSize: 20,
  fontFamily: 'Roboto',
  textAlign: 'left',
  display: 'block',
  color: '#9b8065'
}

const GameLabelText: CSSProperties = {
  position: 'fixed',
  width: '100vw',
  top: 180,
  fontSize: 30,
  fontFamily: 'Roboto',
  textAlign: 'center',
  display: 'block',
  color: '#9b8065'
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
  width: '100vw',
  top: 200,
  backgroundColor: 'tranparent',
  border: 'none',
  color: 'tranparent',
  textAlign: 'center'
}

const PlayButtonImg: CSSProperties = {
  height: 260,
  cursor: 'pointer'
}

const SettingsButton: CSSProperties = {
  position: 'fixed',
  right: 20,
  top: 10,
  backgroundColor: 'tranparent',
  border: 'none',
  color: 'tranparent',
  cursor: 'pointer'
}

const SettingsButtonImg: CSSProperties = {
  height: 60
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
      <img src="images/landing/04.jpg" style={ImageFullBackground} />
      <div style={GameNameText}>Round42</div>
      <div style={GameLabelText}>Multiplay Edition</div>
      <div style={GameInstructionsText}>
        F - Fire
        <br />S - Special
        <br />
        Arrow Keys
      </div>
      <div style={PlayButton}>
        <img onClick={() => onStartGame()} src="images/play.png" style={PlayButtonImg} />
      </div>
      <div style={SettingsButton}>
        <img
          onClick={() => dispatch(setScreenState('options'))}
          src="images/settings.png"
          style={SettingsButtonImg}
        />
      </div>
      <GameConnect />
    </div>
  )
}
