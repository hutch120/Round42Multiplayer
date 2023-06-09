/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import BaseEnemy from '../Base/BaseEnemy'
import BaseFrameProvider from '../Base/BaseFrameProvider'
import ILocationDirectionProvider from '../Interfaces/ILocationDirectionProvider'
import ExplosionProviderFunction from '../ShipsToFireProviders/ExplosionProviderFunction'
import OffsetFramesProviderFunction from '../Types/OffsetFramesProviderFunction'
import * as Mutators from '../Utility/FrameMutators'

/**
 * Module:          An enemy that picks its frame based on where it is heading. Otherwise a normal enemy.
 * Responsibility:  Handles an enemy that picks a frame based on its direction. Devil and Fish enemies do this..
 */

export default class DirectionFrameEnemy extends BaseEnemy {
  /**
   * A location provider than also provides a method that gives the general direction: left or right.
   */
  protected locationDirectionProvider: ILocationDirectionProvider

  /**
   * Constuct the devil.
   */
  constructor(
    private points: number,
    getFrames: OffsetFramesProviderFunction,
    getExplosion: ExplosionProviderFunction,
    locationProvider: ILocationDirectionProvider,
    frameProvider: BaseFrameProvider
  ) {
    super(0, getFrames, getExplosion, locationProvider, frameProvider)

    Mutators.FrameConvertHexToCGA(this.explosion.explosionCenterFrame)
    this.explosion.particleFrames.forEach((pf) => Mutators.FrameConvertHexToCGA(pf))

    this.locationDirectionProvider = locationProvider
  }

  /**
   * Alter the state
   */
  public alterState(): void {
    if (this.locationDirectionProvider.getDirection() === 'left') {
      // Frame going left is index 0, there's two frames so a get next frames switches to the
      // frame of the devil heading right.
      if (this.frameProvider.getCurrentIndex() !== 0) {
        this.frameProvider.getNextFrame()
      }
    } else if (this.locationDirectionProvider.getDirection() === 'right') {
      // Frame going left is index 0, there's two frames so a get next frames switches to the
      // frame of the devil heading right.
      if (this.frameProvider.getCurrentIndex() !== 1) {
        this.frameProvider.getNextFrame()
      }
    }
  }

  /**
   * Called when a frame change is required. The Devil frames are all colored at initialisation so we can keep this simple.
   */
  protected onFrameChange(): void {
    const nextFrame = this.frameProvider.getCurrentFrame()
    Mutators.FrameConvertHexToCGA(nextFrame)
    this.currentFrame = nextFrame
  }

  /**
   * Returns the points of the Devil enemy.
   * @returns {number}.
   */
  public getPoints(): number {
    return this.points
  }
}
