import { Peer, DataConnection } from 'peerjs'

export const GAME_1 = '6946c118-0ce0-4b74-b04b-fc7d4bbaa7ee'

let hostPeer: Peer | null = null
let challengerPeer: Peer | null = null

let challengerConnection: DataConnection | null = null
const challengerConnections: DataConnection[] = []

// Attempt to connect to existing game
// If unable to connect, start connection as host.
export function ConnectToGame(gameId: string) {
  DestroyPeers() // Cleanup any existing connections.
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
  const challengerConnectionEstablishedMessage = `Challenger sends hello ${challengerConn.label}`
  console.log(challengerConnectionEstablishedMessage)
  challengerConn.send(challengerConnectionEstablishedMessage)
  challengerConn.on('data', ChallengerReceivedMessage)
  challengerConn.on('error', (err) => {
    console.log('Challenger connection error', err)
  })
  TestSpeedAsChallengerSendMessage()
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
}

function HostConnectionRequested(gameId: string, challengerConn: DataConnection) {
  console.log(`Game ${gameId} connection established from challenger ${challengerConn.label}`)
  challengerConn.on('data', (data) => {
    console.log(`Host received data`, data)
    SendMessageToGameConnections(data as string)
  })
  challengerConn.on('open', () => {
    console.log('Game connection sends hello')
    challengerConnections.push(challengerConn)
    challengerConn.send(`Host welcomes you to game ${gameId}`)
    challengerConn.on('close', () => HostRemoveConnection(challengerConn))
  })
  challengerConn.on('error', (err) => {
    console.log('Host connection error', err)
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

export function SendMessage(data: string) {
  if (challengerConnection) {
    // console.log(`SendMessage from challenger to game host to distribute ${challengerConnection.label}`, data)
    challengerConnection.send(data)
  } else if (challengerConnections) {
    console.log(`SendMessage from game host to ${challengerConnections.length} challengers`, data)
    SendMessageToGameConnections(data)
  } else {
    console.log('No established connection for challenger or game host!')
  }
}

function SendMessageToGameConnections(data: string) {
  for (let i = 0; i < challengerConnections.length; i++) {
    challengerConnections[i].send(data as string)
  }
}

let testIteration = 0

function TestSpeedAsChallengerSendMessage() {
  const timeoutId = setInterval(() => {
    testIteration++
    // console.log('Send Test iteration', testIteration)
    SendMessage('Test message ' + testIteration)
    if (testIteration >= 5) {
      clearTimeout(timeoutId)
      // console.log('test stopped at iteration', testIteration )
    }
  }, 100)
}

function ChallengerReceivedMessage(data: unknown) {
  const dataAssumedToBeString = data as string

  if (testIteration === 0) return
  if (!dataAssumedToBeString.endsWith('' + testIteration)) {
    console.log('Too fast. Received iteration', data, testIteration)
  } else {
    console.log('OK. Received iteration', testIteration)
  }
  if (testIteration === 5) testIteration = 0
}

function DestroyPeers() {
  if (hostPeer) {
    hostPeer.destroy()
  }
  if (challengerPeer) {
    challengerPeer.destroy()
  }
}
