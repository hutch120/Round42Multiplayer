/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { useState } from 'react'
import { useSelector } from 'react-redux'
import GameResultModel from '../Models/GameResultModel'
import ApplicationState from '../State/ApplicationState'
import { GameOptions } from './GameOptions'
import GameOver from './GameOver'
import Landing from './Landing'

/**
 * Module:          Main
 * Responsibility:  Top level component for the UI.
 */

export default function Main(): JSX.Element {
  const screenState = useSelector<ApplicationState>((state) => state.gameState.screenState)
  const [gameResult, setGameResult] = useState<GameResultModel>()

  return (
    <div>
      {(screenState === 'mainmenu' && <Landing setGameResult={setGameResult} />) ||
        (screenState === 'gameover' && <GameOver gameResult={gameResult} />) ||
        (screenState === 'options' && <GameOptions />)}
    </div>
  )
}
