import { Peer, DataConnection } from 'peerjs'

export const GAME_1 = '6946c118-0ce0-4b74-b04b-fc7d4bbaa7ee'

let challengerConnection: DataConnection | null = null
const challengerConnections: DataConnection[] = []

export function ConnectToGame(gameId: string) {
  console.log('Attempt to connect to existing game', gameId)

  // Attempt to connect to existing game
  const challengerPeer = new Peer()
  challengerPeer.on('open', function (id) {
    const challengerConn = challengerPeer.connect(gameId)
    console.log('Challenger id and connection label', id, challengerConn.label)
    challengerConn.on('data', (data) => {
      // console.log(`Challenger received data`, data)
      TestSpeedAsChallengerReceiveMessage(data as string)
    })
    challengerConn.on('open', () => {
      challengerConnection = challengerConn
      const challengerConnectionEstablishedMessage = `Challenger sends hello ${challengerConn.label}`
      console.log(challengerConnectionEstablishedMessage)
      challengerConn.send(challengerConnectionEstablishedMessage)
      TestSpeedAsChallengerSendMessage()
    })
    challengerConn.on('error', (err) => {
      console.log('Challenger connection error', err)
    })
  })
  challengerPeer.on('error', () => {
    console.log('Unable to connect to existing game, so host game...')
    challengerPeer.destroy()
    // Create new game
    const hostPeer = new Peer(gameId)
    hostPeer.on('open', function (id) {
      console.log('Game host ID is', id)
      // Inbound connection (from challenger)
      hostPeer.on('connection', (hostConn) => {
        console.log(`Game ${id} connection established from challenger ${hostConn.label}`)
        hostConn.on('data', (data) => {
          console.log(`Host received data`, data)
          SendMessageToGameConnections(data as string)
        })
        hostConn.on('open', () => {
          console.log('Game connection sends hello')
          challengerConnections.push(hostConn)
          hostConn.send(`Host ${hostConn.label} welcomes you to game ${gameId}`)
        })
        hostConn.on('error', (err) => {
          console.log('Host connection error', err)
        })
      })
    })
  })
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
    // console.log('Test iteration', testIteration)
    SendMessage('Test message ' + testIteration)
    if (testIteration >= 5) {
      clearTimeout(timeoutId)
      // console.log('test stopped at iteration', testIteration)
    }
  }, 100)
}

function TestSpeedAsChallengerReceiveMessage(data: string) {
  if (testIteration === 0) return
  if (!data.endsWith('' + testIteration)) {
    console.log('Too fast. Received iteration', data, testIteration)
  } else {
    console.log('OK. Received iteration', testIteration)
  }
}
