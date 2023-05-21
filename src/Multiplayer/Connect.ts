import { Action } from 'redux'
import { Peer, DataConnection } from 'peerjs'
import { appState } from '../State/Store'
import { ChallengerReceivedMessage } from './Challenger'
import { IZuStore } from '../State/ZuStore'

export const GAME_1 = '6946c118-0ce0-4b74-b04b-fc7d4bbaa7ee'

let isHost = false

let hostPeer: Peer | null = null
let challengerPeer: Peer | null = null

// let challengerConnection: DataConnection | null = null
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
export function ConnectToGame(gameId: string, zuStore: IZuStore) {
  CloseAllConnections() // Cleanup any existing connections.
  challengerPeer = new Peer()
  challengerPeer.on('open', (peerId) => ChallengerJoinGame(peerId, gameId, zuStore))
  challengerPeer.on('error', () => HostNewGame(gameId, zuStore))
}

// Attempts to connect to an existing game
// If the connection cannot be made the error event will trigger and HostNewGame will be called.
function ChallengerJoinGame(peerId: string, gameId: string, zuStore: IZuStore) {
  console.log('Attempt to connect to existing game', gameId)
  if (!challengerPeer) {
    console.log('Failed to find valid challenger peer!!')
    return
  }
  const challengerConn = challengerPeer.connect(gameId)
  console.log('Challenger id and connection label', peerId, challengerConn.label)
  challengerConn.on('open', () => ChallengerJoinedGame(challengerConn, zuStore))
}

function ChallengerJoinedGame(challengerConn: DataConnection, zuStore: IZuStore) {
  zuStore.setChallengerConnected(true)
  // challengerConnection = challengerConn
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

function HostNewGame(gameId: string, zuStore: IZuStore) {
  console.log('Unable to connect to existing game, so host game...')
  if (challengerPeer) {
    challengerPeer.destroy()
  }
  // Create new game
  hostPeer = new Peer(gameId)
  hostPeer.on('open', (id) => HostStartedGame(id, zuStore))
}

function HostStartedGame(gameId: string, zuStore: IZuStore) {
  console.log('Game host ID is', gameId)
  // Inbound connection (from challenger)
  if (!hostPeer) {
    console.log('Failed to find valid host peer!!')
    return
  }
  hostPeer.on('connection', (conn) => HostConnectionRequested(gameId, conn, zuStore))
  isHost = true
  zuStore.setHostConnected(true)
}

function HostConnectionRequested(
  gameId: string,
  challengerConn: DataConnection,
  zuStore: IZuStore
) {
  console.log(`Game ${gameId} connection established from challenger ${challengerConn.label}`)
  challengerConn.on('open', () => HostConnectionHandler(gameId, challengerConn, zuStore))
  challengerConn.on('error', (err) => {
    console.log('Host connection error', err)
  })
}

function HostConnectionHandler(gameId: string, challengerConn: DataConnection, zuStore: IZuStore) {
  const welcomeAction = { type: 'welcome', message: `Host welcomes you to game ${gameId}` }
  console.log('HostConnectionHandler', welcomeAction)
  challengerConnections.push(challengerConn)
  zuStore.setConnectionCount(challengerConnections.length)
  challengerConn.send(welcomeAction)
  challengerConn.on('close', () => HostRemoveConnection(challengerConn, zuStore))
  challengerConn.on('data', (data) => {
    console.log(`Host received data`, data)
    SendActionToGameConnections(data as Action)
  })
}

function HostRemoveConnection(challengerConn: DataConnection, zuStore: IZuStore) {
  console.log('Connection closed, remove connection...')
  for (let i = 0; i < challengerConnections.length; i++) {
    const connectionId = challengerConnections[i].connectionId
    if (challengerConn.connectionId === connectionId) {
      challengerConnections.splice(i, 1)
      break
    }
  }
  zuStore.setConnectionCount(challengerConnections.length)
}

/*
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
*/

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

function CloseAllConnections() {
  if (hostPeer) {
    hostPeer.destroy()
  }
  if (challengerPeer) {
    challengerPeer.destroy()
  }
}
