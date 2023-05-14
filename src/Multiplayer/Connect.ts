import { Action } from 'redux'
import { Peer, DataConnection } from 'peerjs'
import { appState, dispatch } from '../State/Store'
import GameStateEnum from '../State/Game/GameEnum'
import GameState from '../State/Game/GameState'
import { startGame } from '../StartGame'

export const GAME_1 = '6946c118-0ce0-4b74-b04b-fc7d4bbaa7ee'

let isHost = false

let hostPeer: Peer | null = null
let challengerPeer: Peer | null = null

let challengerConnection: DataConnection | null = null
const challengerConnections: DataConnection[] = []

export function HandleActionUpdates(action: Action) {
  if (!isHost) {
    return
  }
  SendActionToGameConnections(action)
}

export function HandleTickUpdates(tick: number) {
  if (!isHost) {
    return
  }
  const appStateAction = { type: 'appstate', data: { appState: appState(), tick } }
  SendAppStateToGameConnections(appStateAction)
}

// Attempt to connect to existing game
// If unable to connect, start connection as host.
export function ConnectToGame(gameId: string) {
  CloseAllConnections() // Cleanup any existing connections.
  challengerPeer = new Peer()
  challengerPeer.on('open', (peerId) => ChallengerJoinGame(peerId, gameId))
  challengerPeer.on('error', () => HostNewGame(gameId))
}

// Attempts to connect to an existing game
// If the connection cannot be made the error event will trigger and HostNewGame will be called.
function ChallengerJoinGame(peerId: string, gameId: string) {
  console.log('Attempt to connect to existing game', gameId)
  if (!challengerPeer) {
    console.log('Failed to find valid challenger peer!!')
    return
  }
  const challengerConn = challengerPeer.connect(gameId)
  console.log('Challenger id and connection label', peerId, challengerConn.label)
  challengerConn.on('open', () => ChallengerJoinedGame(challengerConn))
}

function ChallengerJoinedGame(challengerConn: DataConnection) {
  challengerConnection = challengerConn
  const challengerJoinedAction = {
    type: 'challengerJoined',
    message: `Challenger sends hello ${challengerConn.label}`
  }
  console.log('ChallengerJoinedGame', challengerJoinedAction)
  challengerConn.send(challengerJoinedAction)
  challengerConn.on('data', ChallengerReceivedMessage)
  challengerConn.on('error', (err) => {
    console.log('Challenger connection error', err)
  })
}

function HostNewGame(gameId: string) {
  console.log('Unable to connect to existing game, so host game...')
  if (challengerPeer) {
    challengerPeer.destroy()
  }
  // Create new game
  hostPeer = new Peer(gameId)
  hostPeer.on('open', (id) => HostStartedGame(id))
}

function HostStartedGame(gameId: string) {
  console.log('Game host ID is', gameId)
  // Inbound connection (from challenger)
  if (!hostPeer) {
    console.log('Failed to find valid host peer!!')
    return
  }
  hostPeer.on('connection', (conn) => HostConnectionRequested(gameId, conn))
  isHost = true
}

function HostConnectionRequested(gameId: string, challengerConn: DataConnection) {
  console.log(`Game ${gameId} connection established from challenger ${challengerConn.label}`)
  challengerConn.on('open', () => HostConnectionHandler(gameId, challengerConn))
  challengerConn.on('error', (err) => {
    console.log('Host connection error', err)
  })
}

function HostConnectionHandler(gameId: string, challengerConn: DataConnection) {
  const welcomeAction = { type: 'welcome', message: `Host welcomes you to game ${gameId}` }
  console.log('HostConnectionHandler', welcomeAction)
  challengerConnections.push(challengerConn)
  challengerConn.send(welcomeAction)
  challengerConn.on('close', () => HostRemoveConnection(challengerConn))
  challengerConn.on('data', (data) => {
    console.log(`Host received data`, data)
    SendActionToGameConnections(data as Action)
  })
}

function HostRemoveConnection(challengerConn: DataConnection) {
  console.log('Connection closed, remove connection...')
  for (let i = 0; i < challengerConnections.length; i++) {
    const connectionId = challengerConnections[i].connectionId
    if (challengerConn.connectionId === connectionId) {
      challengerConnections.splice(i, 1)
      break
    }
  }
}

export function SendMessage(data: Action) {
  if (challengerConnection) {
    // console.log(`SendMessage from challenger to game host to distribute ${challengerConnection.label}`, data)
    challengerConnection.send(data)
  } else if (challengerConnections) {
    console.log(`SendMessage from game host to ${challengerConnections.length} challengers`, data)
    SendActionToGameConnections(data)
  } else {
    console.log('No established connection for challenger or game host!')
  }
}

function SendActionToGameConnections(data: Action) {
  for (let i = 0; i < challengerConnections.length; i++) {
    challengerConnections[i].send(data)
  }
}

function SendAppStateToGameConnections(appState: Action) {
  for (let i = 0; i < challengerConnections.length; i++) {
    challengerConnections[i].send(appState)
  }
}

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

function ChallengerReceivedMessage(data: unknown) {
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

function CloseAllConnections() {
  if (hostPeer) {
    hostPeer.destroy()
  }
  if (challengerPeer) {
    challengerPeer.destroy()
  }
}
