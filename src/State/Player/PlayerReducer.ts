/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { produce } from 'immer'
import { Locations } from '../../Constants/Constants'
import getPlayerExplosion from '../../Player/PlayerExplosion'
import { getPlayerFrame as getColoredPlayerFrame } from '../../Player/PlayerFrames'
import * as Mutators from '../../Utility/FrameMutators'
import PlayerEnum from './PlayerEnum'
import PlayerState from './PlayerState'
import { PlayerStateTypes } from './PlayerTypes'

/**
 * Module:          playerReducer
 * Responsibility:  Handles the player's state.
 */

/**
 * playerReducer
 * @param {PlayerState} state. The current state.
 * @param {ActionPayload<any>} action. The desired action with optional paylood.
 * @returns {PlayerState}. New state.
 */
export default function playerReducer(
  state: PlayerState = initState(),
  action: PlayerStateTypes
): PlayerState {
  return produce(state, (draft) => {
    switch (action.type) {
      case PlayerEnum.tick:
        return action.payload.playerState // Replace entire state. https://immerjs.github.io/immer/return/
      case PlayerEnum.setPlayerIsAlive:
        draft.alive = action.playerIsAlive
        break
      case PlayerEnum.setPlayerMovementLimit:
        draft.moveLimit = action.payload
        break
      case PlayerEnum.setPlayerLocationData:
        draft.left = action.payload.left
        draft.top = action.payload.top
        draft.hitboxes = action.payload.hitboxes
        draft.nozzleLocation = action.payload.nozzleLocation
        break
      case PlayerEnum.setPlayerBulletState:
        draft.bulletState = action.particleState
        break
    }
  })
}

/**
 * Initialize the base player state.
 * @returns {PlayerState}
 */
function initState(): PlayerState {
  const playerExplosion = getPlayerExplosion()
  Mutators.FrameConvertHexToCGA(playerExplosion.explosionCenterFrame)

  playerExplosion.particleFrames.forEach((p) => Mutators.FrameConvertHexToCGA(p))

  const spawnLocation = Locations.Player.spawnLocation

  const playerFrame = getColoredPlayerFrame()

  return {
    alive: false,
    moveLimit: 'none',
    left: spawnLocation.left,
    top: spawnLocation.top,
    hitboxes: undefined,
    nozzleLocation: { left: 0, top: 0 },
    coloredExplosion: playerExplosion,
    coloredFrame: playerFrame,
    bulletState: undefined
  }
}
