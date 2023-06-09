/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import Frame from '../Types/Frame'
import * as Mutators from '../Utility/FrameMutators'

/**
 * Module:          Numbers
 * Responsibility:  Numbers 0 to 9. All colors are variant and can be set with single function call.
 */

export default function getNumbers(color: string): Frame[] {
  const numbers: Frame[] = [
    [
      ['0', 'V', 'V', '0'],
      ['V', '0', '0', 'V'],
      ['V', '0', '0', 'V'],
      ['V', '0', '0', 'V'],
      ['0', 'V', 'V', '0']
    ],
    [
      ['0', '0', 'V', '0'],
      ['0', 'V', 'V', '0'],
      ['0', '0', 'V', '0'],
      ['0', '0', 'V', '0'],
      ['V', 'V', 'V', 'V']
    ],
    [
      ['0', 'V', 'V', '0'],
      ['V', '0', '0', 'V'],
      ['0', '0', 'V', '0'],
      ['0', 'V', '0', '0'],
      ['V', 'V', 'V', 'V']
    ],
    [
      ['0', 'V', 'V', '0'],
      ['V', '0', '0', 'V'],
      ['0', '0', 'V', '0'],
      ['V', '0', '0', 'V'],
      ['0', 'V', 'V', '0']
    ],
    [
      ['V', '0', '0', '0'],
      ['V', '0', 'V', '0'],
      ['V', 'V', 'V', 'V'],
      ['0', '0', 'V', '0'],
      ['0', '0', 'V', '0']
    ],
    [
      ['V', 'V', 'V', 'V'],
      ['V', '0', '0', '0'],
      ['V', 'V', 'V', '0'],
      ['0', '0', '0', 'V'],
      ['V', 'V', 'V', '0']
    ],
    [
      ['0', 'V', 'V', 'V'],
      ['V', '0', '0', '0'],
      ['V', 'V', 'V', '0'],
      ['V', '0', '0', 'V'],
      ['0', 'V', 'V', '0']
    ],
    [
      ['V', 'V', 'V', 'V'],
      ['0', '0', '0', 'V'],
      ['0', '0', 'V', '0'],
      ['0', 'V', '0', '0'],
      ['V', '0', '0', '0']
    ],
    [
      ['0', 'V', 'V', '0'],
      ['V', '0', '0', 'V'],
      ['0', 'V', 'V', '0'],
      ['V', '0', '0', 'V'],
      ['0', 'V', 'V', '0']
    ],
    [
      ['0', 'V', 'V', '0'],
      ['V', '0', '0', 'V'],
      ['0', 'V', 'V', 'V'],
      ['0', '0', '0', 'V'],
      ['V', 'V', 'V', '0']
    ]
  ]

  Mutators.FramesSetColor(numbers, color)
  return numbers
}
