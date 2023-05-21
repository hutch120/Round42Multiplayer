/**
 * Module:          GameConnect
 * Responsibility:  Shows the buttons to connect to a peer
 */
import { CSSProperties, useEffect } from 'react'
import * as Peers from '../Multiplayer/Connect'
import { useStore } from '../State/ZuStore'

const CreateUser1Button: CSSProperties = {
  position: 'fixed',
  left: '20px',
  top: '10px',
  margin: '0 auto',
  fontFamily: 'monospace',
  fontSize: 'large'
}

const HostConnected: CSSProperties = {
  color: 'white',
  position: 'fixed',
  left: '20px',
  top: '60px',
  margin: '0 auto',
  fontFamily: 'monospace',
  fontSize: 'large'
}

const HostConnectionCount: CSSProperties = {
  color: 'white',
  position: 'fixed',
  left: '20px',
  top: '100px',
  margin: '0 auto',
  fontFamily: 'monospace',
  fontSize: 'large'
}

const ChallengerConnected: CSSProperties = {
  color: 'white',
  position: 'fixed',
  left: '20px',
  top: '60px',
  margin: '0 auto',
  fontFamily: 'monospace',
  fontSize: 'large'
}

const RedDot: CSSProperties = {
  height: 15,
  width: 15,
  backgroundColor: '#ff0000',
  borderRadius: '50%',
  display: 'inline-block'
}

const GreenDot: CSSProperties = {
  height: 15,
  width: 15,
  backgroundColor: '#00ff00',
  borderRadius: '50%',
  display: 'inline-block'
}

export default function GameConnect(): JSX.Element {
  const zuStore = useStore()

  useEffect(() => {
    if (window.location.search.includes('host')) {
      Peers.ConnectToGame(Peers.GAME_1, zuStore)
    }
  }, [])

  return (
    <div>
      <button onClick={() => Peers.ConnectToGame(Peers.GAME_1, zuStore)} style={CreateUser1Button}>
        Connect
      </button>

      {zuStore.hostConnected && (
        <div style={HostConnected}>
          Host <div style={zuStore.hostConnected ? GreenDot : RedDot}></div>
        </div>
      )}

      {zuStore.connectionCount > 0 && (
        <div style={HostConnectionCount}>Host Connection Count {zuStore.connectionCount}</div>
      )}

      {zuStore.challengerConnected && (
        <div style={ChallengerConnected}>
          Challenger <div style={zuStore.challengerConnected ? GreenDot : RedDot}></div>
        </div>
      )}
    </div>
  )
}
