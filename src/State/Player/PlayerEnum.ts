/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          Constants
 * Responsibility:  Constants used to determine the action type for the PlayerState.
 */

/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          PlayerEnum
 * Responsibility:  An Enum that provides a unique number for each player action.
 */

enum PlayerEnum {
  tick,
  setPlayerIsAlive = 3000,
  setPlayerMovementLimit,
  setPlayerLocationData,
  setPlayerBulletState
}

export default PlayerEnum
