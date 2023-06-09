/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          GameTypes
 * Responsibility:  Action return types for the GameState
 */

import GameStateEnum from './GameEnum'
import { ScreenState } from './UITypes'
import { WarpLevelComplexity } from './WarpLevelTypes'

export interface Tick {
  type: typeof GameStateEnum.tick
  payload: any
}
export interface IncreaseScore {
  type: typeof GameStateEnum.increaseScore
  payload: number
}

export interface SetLives {
  type: typeof GameStateEnum.setLives
  payload: number
}

export interface RemoveLife {
  type: typeof GameStateEnum.removeLife
}

export interface SetPhasers {
  type: typeof GameStateEnum.setPhasers
  payload: number
}

export interface AddPhaser {
  type: typeof GameStateEnum.addPhaser
}

export interface RemovePhaser {
  type: typeof GameStateEnum.removePhaser
}

export interface SetLevel {
  type: typeof GameStateEnum.setLevel
  payload: number
}

export interface NextLevel {
  type: typeof GameStateEnum.nextLevel
}

export interface AddLifeAndPhaser {
  type: typeof GameStateEnum.addLifeAndPhaser
}

export interface SetPause {
  type: typeof GameStateEnum.setPause
  payload: boolean
}

export interface SetWarpGateComplexity {
  type: typeof GameStateEnum.setWarpLevelComplexity
  complexity: WarpLevelComplexity
}

export interface GameOver {
  type: typeof GameStateEnum.gameOver
}

export interface ResetGameState {
  type: typeof GameStateEnum.resetGameState
}

export interface BulletFired {
  type: typeof GameStateEnum.bulletFired
}

export interface PhaserFired {
  type: typeof GameStateEnum.phasersFired
}

export interface EnemyHit {
  type: typeof GameStateEnum.enemyHit
}

export interface SetTimeLevelTimeLimit {
  type: typeof GameStateEnum.setTimeLevelTimeLimit
  limit: number
}

export interface ResetScore {
  type: typeof GameStateEnum.resetScore
}

export interface SetScreenState {
  type: typeof GameStateEnum.setScreenState
  screenState: ScreenState
}

export interface SetGameInProgress {
  type: typeof GameStateEnum.setGameInProgress
  gameInProgress: boolean
}

export type GameStateTypes =
  | Tick
  | IncreaseScore
  | SetLives
  | RemoveLife
  | SetPhasers
  | AddPhaser
  | RemovePhaser
  | SetLevel
  | NextLevel
  | AddLifeAndPhaser
  | SetPause
  | SetWarpGateComplexity
  | GameOver
  | ResetGameState
  | BulletFired
  | PhaserFired
  | EnemyHit
  | SetTimeLevelTimeLimit
  | ResetScore
  | SetScreenState
  | SetGameInProgress
