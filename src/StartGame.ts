/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          StartGame
 * Responsibility:  Begin the game.
 */

import * as GameLoop from './GameLoop'
import GameResultModel from './Models/GameResultModel'
import * as Canvas from './Render/Canvas'
import * as SettingsManager from './UI/SettingsManager'

/**
 * startGame. Initializes the canvas dimensions, then starts the game.
 * @param {(result: GameResultModel) => void} gameOverCallback. Callback used by the GameLoop module to trigger a game over event in the UI,
 */
export function startGame(gameOverCallback: (result: GameResultModel) => void): void {
  Canvas.setCanvasDimensions()

  SettingsManager.setSettings()

  // Ok, screen's setup let start the game!
  GameLoop.init(gameOverCallback)
}
