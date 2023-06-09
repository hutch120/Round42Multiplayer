/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import TickHandler from '../Handlers/TickHandler'
import ILocationProvider from '../Interfaces/ILocationProvider'
import Explosion from '../Models/Explosion'
import GameLocation from '../Models/GameLocation'
import GameRectangle from '../Models/GameRectangle'
import dimensionProvider from '../Providers/DimensionProvider'
import ExplosionProviderFunction from '../ShipsToFireProviders/ExplosionProviderFunction'
import { EnemyState } from '../State/EnemyLevel/EnemyState'
import Frame from '../Types/Frame'
import OffsetFramesProviderFunction from '../Types/OffsetFramesProviderFunction'
import { getFrameCenter, getFrameDimensions, getFrameHitbox } from '../Utility/Frame'
import { getOffsetLocation } from '../Utility/Location'
import BaseFrameProvider from './BaseFrameProvider'

/**
 * Module:          BaseEnemy
 * Responsibility:  Base class for all enemies.
 *                  This class provides contacts and default methods that will work
 *                  for most enemies in the game leaving specifics to derived classes.
 */

const { pixelSize } = dimensionProvider()

const negativepixelSize = pixelSize * -1

export default abstract class BaseEnemy {
  /**
   * Static to ensure every enemy gets a new id.
   */
  private static idCounter = 0

  /**
   * Id of the enemy. Used to check if a bullet belongs to an enemy.
   */
  private enemyId = 0

  /**
   * The frame provider. Must be set in an inheriting class.
   */
  protected frameProvider: BaseFrameProvider

  /**
   * Frame tick handler. Handles changes in the frames.
   */
  private frameTickHandler: TickHandler

  /**
   * Offets for each frame.
   */
  private offSets: GameLocation[]

  /**
   * Explosion for the enemy.
   */
  protected explosion: Explosion

  /**
   * Left position offset for animation.
   */
  private offsetLeft: number

  /**
   * Top position offset for animation.
   */
  protected offsetTop: number

  /**
   * Current frame of the object
   */
  protected currentFrame?: Frame

  /**
   * Provides location. Can be used to alter the movement behaviour of enemies.
   */
  protected locationProvider: ILocationProvider

  /**
   * Creates an instance of BaseEnemy.
   * @param {number} frameChangeTime Time between frames.
   * @param {OffsetFramesProviderFunction} getOffsetFrames Returns an OffsetFrames object.
   * @param {ExplosionProviderFunction} getExplosion Returns an explosion object.
   * @param {ILocationProvider} locationProvider Provides the location of the enemy.
   * @param {BaseFrameProvider} frameProvider Provides the frame of the enemy.
   * @memberof BaseEnemy
   */
  constructor(
    frameChangeTime: number,
    getOffsetFrames: OffsetFramesProviderFunction,
    getExplosion: ExplosionProviderFunction,
    locationProvider: ILocationProvider,
    frameProvider: BaseFrameProvider
  ) {
    this.locationProvider = locationProvider

    this.explosion = getExplosion()
    this.frameTickHandler = new TickHandler(frameChangeTime, () => this.onFrameChange())

    const offSetFrames = getOffsetFrames()
    this.offSets = offSetFrames.offSets.map((o) => {
      return {
        left: o.left * pixelSize,
        top: o.top * pixelSize
      }
    })

    this.frameProvider = frameProvider
    this.frameProvider.setFrames(offSetFrames.frames)

    this.currentFrame = this.frameProvider.getCurrentFrame()

    const { left, top } = this.getOffsetLocation()
    this.offsetLeft = left
    this.offsetTop = top

    this.enemyId = BaseEnemy.idCounter
    BaseEnemy.idCounter += 1
  }

  /**
   * getId
   * @returns {number}
   * @memberof BaseEnemy
   */
  public getId(): number {
    return this.enemyId
  }

  /**
   * Returns the point worth.
   * @returns {number}. Point worth of the enemy.
   */
  public abstract getPoints(): number

  /**
   * Called by a TickHandler when the next frame is up.
   */
  protected abstract onFrameChange(): void

  /**
   * Base implementation of a state update.
   * @param {number} tick
   */
  public updateState(tick: number) {
    this.frameTickHandler.tick(tick)

    const offsetLocation = this.getOffsetLocation()
    this.offsetLeft = offsetLocation.left
    this.offsetTop = offsetLocation.top

    this.locationProvider.updateState(tick)

    // Implemented in a child class to alter the
    // enemy state before its is send to redux.
    this.alterState(tick)
  }

  /**
   * Do some last moment changes here for additional custom behaviour.
   * @param {number} tick. Current game tick.
   */
  public abstract alterState(tick: number): void

  /**
   * Returns the current state of the enemy.
   * @returns {EnemyState}. An EnemyState object.
   */
  public getCurrentEnemyState(): EnemyState {
    return {
      enemyId: this.getId(),
      coloredExplosion: this.explosion,
      offsetLeft: this.offsetLeft,
      offsetTop: this.offsetTop,
      currentFrame: this.currentFrame,
      hitpoints: this.getHitpoints(),
      hitbox: this.getHitbox(),
      centerLocation: this.getCenterLocation(),
      points: this.getPoints(),
      currentFrameIndex: this.frameProvider.getCurrentIndex(),
      nozzleLocation: this.getNozzleLocation()
    }
  }

  /**
   * Calculates the offsetLocation
   * @returns {GameLocation}. Location offset to let the frames render over one another.
   */
  protected getOffsetLocation(): GameLocation {
    const frameOffsets = this.offSets[this.frameProvider.getCurrentIndex()]
    const location = this.locationProvider.getCurrentLocation()

    if (frameOffsets) {
      return getOffsetLocation(location.left, location.top, frameOffsets.left, frameOffsets.top)
    } else {
      return location
    }
  }

  /**
   * Increases the speed of an enemy.
   * @param {number} value. Values below 1 decrease speed, values above 1 increase speed.
   */
  public increaseSpeed(value: number): void {
    this.locationProvider.increaseSpeed(value)
    this.frameTickHandler.increaseSpeed(value)
  }

  /**
   * Returns the hitpoint of the enemy.
   * @returns {number}
   * @memberof BaseEnemy
   */
  public getHitpoints(): number {
    return 1
  }

  /**
   * Reduce the enemies hitpoints.
   */
  public recudeHitpoints(): void {
    // Override. Only the astroid enemy has hitpoints.
  }

  /**
   * Returns the center location of the object.
   * @returns {GameLocation}. Location located at the center of the object.
   */
  private getCenterLocation(): GameLocation | undefined {
    if (this.currentFrame !== undefined) {
      return getFrameCenter(this.offsetLeft, this.offsetTop, this.currentFrame)
    } else {
      return undefined
    }
  }

  /**
   * Returns the enemies hitbox.
   * @returns {GameRectangle}
   * @memberof BaseEnemy
   */
  private getHitbox(): GameRectangle {
    if (this.currentFrame) {
      return getFrameHitbox(this.offsetLeft, this.offsetTop, this.currentFrame, negativepixelSize)
    } else {
      return {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      }
    }
  }

  /**
   * Returns the nozzle location of the enemey. This is where the bullets appear if the enemy fires.
   * @returns {GameLocation | undefined}. The nozzle location if one could be determined.
   */
  protected getNozzleLocation(): GameLocation | undefined {
    if (this.currentFrame !== undefined) {
      const { width, height } = getFrameDimensions(this.currentFrame)

      const middle = this.offsetLeft + width / 2 - pixelSize / 2
      const bottom = this.offsetTop + height + pixelSize

      return {
        left: middle,
        top: bottom
      }
    } else {
      return undefined
    }
  }
}
