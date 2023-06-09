/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          2pxBullet
 * Responsibility:  Define a bullet 2 pixels wide. Variant color allows it to be any color. Used as a bullet resource for anything that shoots.
 */

import Frame from '../Types/Frame'
import * as Mutators from '../Utility/FrameMutators'

export default function getTwoPixelBullet(color?: string): Frame {
  const twoPixelBullet: Frame = [['V', 'V']]

  if (color !== undefined) {
    Mutators.FrameSetColor(twoPixelBullet, color)
  }

  return twoPixelBullet
}
