/**
 * Module:          GameConnect
 * Responsibility:  Shows the buttons to connect to a peer
 */
import { CSSProperties, useEffect } from 'react'
import * as Peers from '../Multiplayer/Connect'

const CreateUser1Button: CSSProperties = {
  position: 'fixed',
  left: '20px',
  top: '10px',
  margin: '0 auto',
  fontFamily: 'monospace',
  fontSize: 'large'
}

const SendMessageButton: CSSProperties = {
  position: 'fixed',
  left: '20px',
  top: '40px',
  margin: '0 auto',
  fontFamily: 'monospace',
  fontSize: 'large'
}

export default function GameConnect(): JSX.Element {
  useEffect(() => {
    if (window.location.search.includes('host')) {
      Peers.ConnectToGame(Peers.GAME_1)
    }
  }, [])

  return (
    <div>
      <button onClick={() => Peers.ConnectToGame(Peers.GAME_1)} style={CreateUser1Button}>
        ConnectToGame
      </button>
      <button onClick={() => Peers.SendMessage('test')} style={SendMessageButton}>
        Send Message
      </button>
    </div>
  )
}
