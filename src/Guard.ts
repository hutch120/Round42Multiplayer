/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

// import BaseEnemy from './Base/BaseEnemy'
import PlayerState, { AlivePlayer } from './State/Player/PlayerState'
import * as KeybindingsMapping from './State/Settings/KeybindingsMapping'
import { KeybindingsState } from './State/Settings/KeybindingsState'

/**
 * Module:          Guard
 * Responsibility:  TypeGuards
 */

export function isValidGameKey(value: string): value is keyof KeybindingsState {
  return KeybindingsMapping.getAllGameKeys().indexOf(value) !== -1
}

/**
 * TypeGuard for enemies

export function isEnemy(value: any): value is BaseEnemy {
  return value && value.getObjectType() === 'enemy'
}
*/

/**
 * Checks if the player is alive (and if the hitboxes and nozzleLocation are defined)
 * @param {PlayerState} value.
 * @returns {AlivePlayer}. An interface that extends PlayerState but changes 'type' | undefined o just the type.
 */
export function isPlayerAlive(value: PlayerState): value is AlivePlayer {
  return value.alive && value.hitboxes !== undefined && value.nozzleLocation !== undefined
}
