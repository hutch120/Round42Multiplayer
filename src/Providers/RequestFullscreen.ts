/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          RequestFullScreneProvider
 * Responsibility:  Provides a the right function to request a go-to fullscreen for an elemeny
 */

export async function FullScreen(element: HTMLElement): Promise<void> {
  if (typeof element.requestFullscreen === 'function') {
    return element.requestFullscreen()
    // @ts-expect-error: does not exist on type 'HTMLElement'
  } else if (typeof element.webkitRequestFullScreen === 'function') {
    // @ts-expect-error: does not exist on type 'HTMLElement'
    return element.webkitRequestFullScreen()
  } else {
    throw new Error('Could not find a function for request full screen')
  }
}
