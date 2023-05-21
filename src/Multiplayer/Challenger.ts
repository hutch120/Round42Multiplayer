import { dispatch } from '../State/Store'
import GameStateEnum from '../State/Game/GameEnum'
import GameState from '../State/Game/GameState'
import { startGame } from '../StartGame'

interface IGameStateAction {
  type: string
  data: {
    tick: number
    appState: {
      gameState: GameState
    }
  }
}

let gameStarted = false
let currentTick = 0

export function ChallengerReceivedMessage(data: unknown) {
  const action = data as IGameStateAction
  // console.log('Received Action from Host', action)
  if (action.type === 'appstate') {
    if (!gameStarted) {
      gameStarted = true
      console.log('Start game')
      startGame(() => {
        console.log('TODO: End game')
      })
    }
    // Do not update out of order ticks. (Never go back in time!)
    if (currentTick > action.data.tick) return

    currentTick = action.data.tick
    const appStateAction = {
      type: GameStateEnum.tick,
      payload: action.data.appState
    }
    dispatch(appStateAction)
  } else {
    dispatch(action)
  }
}
