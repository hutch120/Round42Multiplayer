/**
 * @preserve Copyright 2010-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import debug from './Debugging/Debug'
import { appStore } from './State/Store'
import { create } from 'zustand'
import Main from './UI/Main'

/**
 * Module:          Index
 * Responsibility:  Entry point for the game
 */

// Ensure the query is one of my own debug statements.
if (
  window.location.search.indexOf('?playground') > -1 ||
  window.location.search.indexOf('?canvas') > -1 ||
  window.location.search.indexOf('?sound') > -1
) {
  // If the url contains ? we'll start in debug mode.
  // This is done using dynamic module loading because the second the game
  // starts it sets all its constants and the screensize is fixed. We do
  // not want this.
  debug()
} else {
  const container = document.getElementById('root')
  if (container) {
    const root = createRoot(container)
    root.render(
      <Provider store={appStore()}>
        <Main />
      </Provider>
    )
  }
}
