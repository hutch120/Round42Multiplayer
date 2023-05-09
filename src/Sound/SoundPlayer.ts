/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Howl } from 'howler'
import Enemies from '../Enemies'
import { appState } from '../State/Store'
import { getRandomArrayElement } from '../Utility/Array'
import * as Howls from './Howls'

/**
 * Module:          SoundPlayer
 * Responsibility:  Plays all Sounds.
 */

/**
 * Picks a background sound from the passed array.
 * @param {Howl[]} sounds. Array of Howls.
 * @param {number} enemyCount. Number of enemies currently on screen.
 */
function setEnemyLevelBackground(sounds: Howl[], enemyCount: number): void {
  if (currentBackground) {
    currentBackground.stop()
  }

  const {
    enemyLevelState: { totalNumberOfEnemies }
  } = appState()

  const killedEnemies = totalNumberOfEnemies - enemyCount
  const soundIndex = sounds.length - killedEnemies - 1

  if (soundIndex < 0) {
    return
  }

  const sound = sounds[soundIndex]

  if (sound === undefined) {
    throw new Error('No sound')
  }

  currentBackground = sound
}

/**
 * Current running background sound.
 */
let currentBackground: Howl | undefined

/**
 * Play the player bullet sound.
 */
export function playerShoot(): void {
  if (muted()) {
    return
  }

  Howls.playerBullet.play()
}

/**
 * Plays a random enemy explosion.
 */
export function enemyExplosion(): void {
  if (muted()) {
    return
  }

  getRandomArrayElement(Howls.enemyExplosions).play()
}

/**
 * Plays a random phaser.
 */
export function phaser(): void {
  if (muted()) {
    return
  }

  getRandomArrayElement(Howls.phasers).play()
}

/**
 * Plays the player explosion.
 */
export function playerExplosion(): void {
  if (muted()) {
    return
  }

  getRandomArrayElement(Howls.playerExplosions).play()
}

/**
 * Plays the fast formation sound.
 */
export function playerFormationFast(): void {
  if (muted()) {
    return
  }

  Howls.playerFormationFast.play()
}

/**
 * Plays the slow formation sound.
 */
export function playPlayerFormationSlow(): void {
  if (muted()) {
    return
  }

  Howls.playerFormationSlow.play()
}

/**
 * Plays the warp gate travel sound in a loop.
 */
export function playTravelingWarpGate(): void {
  if (muted()) {
    return
  }

  setEnemyLevelBackground([Howls.warpGateTraveling], 0)
}

/**
 * Stops the current playing background sound (if available).
 */
export function stopBackground(): void {
  if (muted()) {
    return
  }

  if (currentBackground) {
    currentBackground.stop()
    currentBackground = undefined
  }

  Howls.music.stop()
}

/**
 * Stops the 'falling' sound from playing.
 */
export function stopFalling(): void {
  if (muted()) {
    return
  }

  Howls.falling.stop()
}

/**
 * Pauses warp level traveling sound. Used when the player dies.
 */
export function pauseWarpLevelTravellingSound(): void {
  if (muted()) {
    return
  }

  Howls.warpGateTraveling.pause()
}

/**
 * Plays the background sound for a specific enemy. Lots of enemies reuse background sound.
 * @param {Enemies} enemy. Enemy to play sound for.
 * @param {number} index. Index. Determines which sound to play. Usually linked to the number of enemies on screen.
 */
export function playEnemyBackgroundSound(enemy: Enemies, enemyCount: number): void {
  if (muted()) {
    return
  }

  switch (enemy) {
    case 'bird-fire':
    case 'bird':
    case 'spinner':
    case 'diabolo':
    case 'diabolo-hard':
    case 'bat':
      setEnemyLevelBackground(Howls.tjirping, enemyCount)
      break
    case 'orb':
    case 'orb-up-down':
    case 'cloaking-orb':
    case 'robot':
    case 'robots-random':
    case 'crab':
    case 'piston':
    case 'boat':
      setEnemyLevelBackground(Howls.whoping, enemyCount)
      break
    case 'balloon':
      setEnemyLevelBackground(Howls.wizzing, enemyCount)
      break
    case 'asteroid-down':
    case 'asteroid-diagonal':
    case 'spacemonster-down':
    case 'spacemonster-diagonal':
      if (!Howls.falling.playing()) {
        Howls.falling.play()
      }
      break
    case 'devil':
    case 'fish':
      // The devil and fish levels are odd ducks when it comes to background sound. They do not change
      // if the number of enemies diminishes.
      if (!Howls.music.playing()) {
        Howls.music.play()
      }

      break
    default:
      throw new Error('No sound available for enemy ' + enemy)
  }
}

/**
 * Ensures the background sound is playing for a level with enemies.
 * @param {boolean} pause. When true, pauses the current background sound.
 */
export function ensureBackground(pause: boolean): void {
  if (muted()) {
    return
  }

  if (pause) {
    currentBackground?.pause()
    return
  }

  if (!currentBackground?.playing()) {
    currentBackground?.play('play')
  }
}

/**
 * Ensures the warp level traveling sound is playing.
 * @param {boolean} pause. When true, pauses the warp level travelling sound howl.
 */
export function ensureWarpLevelBackground(pause: boolean): void {
  if (muted()) {
    return
  }

  if (pause) {
    Howls.warpGateTraveling.pause()
    return
  }

  if (!Howls.warpGateTraveling.playing()) {
    Howls.warpGateTraveling.play()
  }
}

/**
 * Plays the victoty sound when the player reaches the end of the warp gate.
 */
export function warpLeveEnd(): void {
  if (muted()) {
    return
  }

  Howls.warpLevelEnd.play()
}

/**
 * True if no sounds should be played.
 */
function muted(): boolean {
  return !appState().settingsState.playSound
}
