/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemy from '../Base/BaseEnemy'
import BaseFrameProvider from '../Base/BaseFrameProvider'
import ILocationProvider from '../Interfaces/ILocationProvider'
import EnemyColorOptions from '../Models/EnemyColorOptions'
import ExplosionProviderFunction from '../ShipsToFireProviders/ExplosionProviderFunction'
import OffsetFramesProviderFunction from '../Types/OffsetFramesProviderFunction'
import * as Mutators from '../Utility/FrameMutators'

/**
 * Module:          DefaultEnemy
 * Responsibility:  Generic enemy class for enemies that have static colors and completely rely on a frame provider
 *                  for animation.
 */

export default class DefaultEnemy extends BaseEnemy {
  /**
   * Enemy point worth.
   */
  private points: number

  /**
   * The enemy's color. Only used if the frame has 'V' colors and the colors do not change.
   * e.g. the robot enemy.
   */
  private color?: string

  constructor(
    points: number,
    frameChangeTime: number,
    getFrames: OffsetFramesProviderFunction,
    getExplosion: ExplosionProviderFunction,
    locationProvider: ILocationProvider,
    frameProvider: BaseFrameProvider,
    colorOptions?: EnemyColorOptions
  ) {
    super(frameChangeTime, getFrames, getExplosion, locationProvider, frameProvider)

    this.points = points

    // Explosions CAN be different in coloring. If a color is passed, we update the color, if not we'll convert from hex to CGA
    if (colorOptions !== undefined && colorOptions.explosionColor !== undefined) {
      Mutators.FrameSetColor(this.explosion.explosionCenterFrame, colorOptions.explosionColor)
    } else {
      Mutators.FrameConvertHexToCGA(this.explosion.explosionCenterFrame)
    }

    // Same for particles.
    if (colorOptions !== undefined && colorOptions.explosionParticleColor !== undefined) {
      const color = colorOptions.explosionParticleColor
      this.explosion.particleFrames.forEach((pf) => Mutators.FrameSetColor(pf, color))
    } else {
      this.explosion.particleFrames.forEach((pf) => Mutators.FrameConvertHexToCGA(pf))
    }

    if (colorOptions !== undefined && colorOptions.varyingEnemyColor) {
      this.color = colorOptions.varyingEnemyColor
    }
  }

  /**
   * Called when a frame change is required. The Piston frames are all colored at initialisation so we can keep this simple.
   */
  protected onFrameChange(): void {
    const newFrame = this.frameProvider.getNextFrame()

    // Allow the default enemy to handle enemies that come in varying colors.
    if (this.color === undefined) {
      Mutators.FrameConvertHexToCGA(newFrame)
    } else {
      Mutators.FrameSetColor(newFrame, this.color)
    }

    this.currentFrame = newFrame
  }

  /**
   * Returns the points of the Piston enemy.
   * @returns {number}.
   */
  public getPoints(): number {
    return this.points
  }

  /**
   * Not implemented.
   */
  public alterState(/*tick: number*/): void {
    // Does nothing here.
  }
}
