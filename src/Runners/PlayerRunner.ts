/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { angles } from '../Constants/Angles'
import { CGAColors } from '../Constants/CGAColors'
import * as GameLoop from '../GameLoop'
import { playerMovementHandler } from '../Handlers/PlayerMovementHandler'
import dimensionProvider from '../Providers/DimensionProvider'
import renderFrame from '../Render/RenderFrame'
import getTwoPixelBullet from '../SharedFrames/GetTwoPixelBullet'
import * as SoundPlayer from '../Sound/SoundPlayer'
import { bulletFired } from '../State/Game/GameActions'
import { ParticleState } from '../State/ParticleState'
import { setPlayerBulletState } from '../State/Player/PlayerActions'
import * as StateProviders from '../State/StateProviders'
import { appState, dispatch } from '../State/Store'
import { getFrameHitbox } from '../Utility/Frame'
import { fallsWithinGameField, getLocation } from '../Utility/Location'

/**
 * Module:          PlayerRunner
 * Responsibility:  Module dedicated to managing player state.
 */

export default function playerRunner(): void {
  updateState()
  GameLoop.registerDraw(draw)
}

const { pixelSize } = dimensionProvider()

const playerBulletFrame = getTwoPixelBullet(CGAColors.yellow)

/**
 * Updates the player state.
 */
function updateState(): void {
  const {
    playerState,
    speedState: {
      movement: {
        Player: {
          aliveSpeed: { speedX, speedY }
        }
      }
    }
  } = appState()

  // Important! The player runner is responsible for handling player action while the
  // player is alive. When the player dies the PlayerSpawnManager takes over.
  if (!playerState.alive) {
    return
  }

  playerMovementHandler(speedX, speedY)

  handlePlayerBulletMovement()
  handlePlayerBulletFiring()
}

/**
 * Checks if the player can fire and if they pressed the fire key. If so, a bullet is dispatched to the state.
 */
function handlePlayerBulletFiring(): void {
  const { playerState, keyboardState } = appState()
  if (
    playerState.nozzleLocation !== undefined &&
    keyboardState.fire &&
    playerState.bulletState === undefined &&
    playerState.moveLimit !== 'immobile'
  ) {
    const nozzleLocation = playerState.nozzleLocation
    const bullet = getPlayerBullet(nozzleLocation.left, nozzleLocation.top)
    dispatch(setPlayerBulletState(bullet))
    SoundPlayer.playerShoot()

    // Keep track how many bullets the player fired.
    dispatch(bulletFired())
  }
}

/**
 * Moves the bullet up until it reached the top of the game game field.
 * If the bullet hits something, that handled in the EnemyLevelRunner.
 */
function handlePlayerBulletMovement(): void {
  const { playerState } = appState()
  if (playerState.bulletState !== undefined) {
    const bullet = playerState.bulletState
    if (!bullet) return
    const nextLocation = getLocation(bullet.left, bullet.top, bullet.angle, bullet.speed)
    const newHitbox = getFrameHitbox(nextLocation.left, nextLocation.top, bullet.coloredFrame)

    if (fallsWithinGameField(newHitbox.left, newHitbox.right, nextLocation.top, newHitbox.bottom)) {
      const newState = getPlayerBullet(nextLocation.left, nextLocation.top)
      dispatch(setPlayerBulletState(newState))
    } else {
      dispatch(setPlayerBulletState(undefined))
    }
  }
}

/**
 * Gets a player bullet particle state.
 * @param {number} left
 * @param {number} top
 * @returns {ParticleState}
 */
function getPlayerBullet(left: number, top: number): ParticleState {
  const {
    speedState: { bullets }
  } = appState()
  return StateProviders.getParticleState(
    left,
    top,
    bullets.player,
    angles.up,
    playerBulletFrame,
    1,
    -0.5 * pixelSize,
    -0.5 * pixelSize
  )
}

/**
 * Draw the player and player bullet.
 */
function draw(): void {
  const { playerState } = appState()
  if (playerState.alive) {
    renderFrame(playerState.left, playerState.top, playerState.coloredFrame)
  }

  if (playerState.bulletState) {
    const bullet = playerState.bulletState
    renderFrame(bullet.left, bullet.top, bullet.coloredFrame)
  }
}
