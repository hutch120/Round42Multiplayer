/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import DebuggingEnum from './DebuggingEnum'
import DebuggingState from './DebuggingState'
import { DebuggingTypes } from './DebuggingTypes'

/**
 * Module:          DebuggingReducer
 * Responsibility:  Handles the debugging state.
 */

/**
 * debuggingReducer
 * @param {DebuggingState} state. The current state.
 * @param {ActionPayload<any>} action. The desired action with optional paylood.
 * @returns {DebuggingState}. New state.
 */
export default function debuggingReducer(
  state: DebuggingState = {},
  action: DebuggingTypes
): DebuggingState {
  switch (action.type) {
    case DebuggingEnum.setDebuggingState:
      state = { ...action.state }
      break
  }

  return state
}
