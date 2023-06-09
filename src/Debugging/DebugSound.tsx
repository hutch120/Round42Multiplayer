/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import { Howl } from 'howler'
import { CSSProperties, useState } from 'react'
import * as Sounds from '../Sound/Sounds'
import * as SoundSprites from '../Sound/SoundSprites'
import SoundButton from './SoundButton'

const style: CSSProperties = {
  color: 'white'
}

export default function DebugSound(): JSX.Element {
  const [howl, setHowl] = useState<Howl>()

  function playOnce(src: string, begin: number, end: number): void {
    howl?.stop()
    const h = new Howl({
      src,
      sprite: {
        play: [begin, end]
      },
      loop: false
    })
    setHowl(h)
    h.play('play')
  }

  function playLoop(src: string, begin: number, end: number): void {
    howl?.stop()
    const h = new Howl({
      src,
      sprite: {
        play: [begin, end]
      },
      loop: true
    })
    setHowl(h)
    h.play('play')
  }

  return (
    <div style={style}>
      <h1>Sound tester app</h1>
      <div style={{ display: 'flex', flexDirection: 'column', width: '250px' }}>
        <p>Player bullet</p>
        <SoundButton src={Sounds.Player.Shoot} text="Shoot" onPlay={playOnce} />
        <p>WarpLevel loop. Played only during warp levels</p>
        <SoundButton src={Sounds.Player.WarpGate} text="Warp level" onPlay={playLoop} />
        <p>Wizzing used by Balloons</p>
        {Sounds.Wizzing.map((src, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
            <SoundButton
              key={index}
              src={src}
              text={'Wizzing ' + index.toString()}
              onPlay={playLoop}
              sprite={SoundSprites.Wizzing[index]}
            />
            <button onClick={() => howl?.stop()}>Stop</button>
          </div>
        ))}
        <p>Whoping used by orbs</p>
        {Sounds.Whoping.map((src, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
            <SoundButton
              key={index}
              src={src}
              text={'Whoping ' + index.toString()}
              onPlay={playLoop}
              sprite={SoundSprites.Whoping[index]}
            />
            <button onClick={() => howl?.stop()}>Stop</button>
          </div>
        ))}
        <p>Tjirping, used by birds</p>
        {Sounds.Tjirping.map((src, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
            <SoundButton
              key={index}
              src={src}
              text={'Tjirping ' + index.toString()}
              onPlay={playLoop}
              sprite={SoundSprites.Tjirping[index]}
            />
            <button onClick={() => howl?.stop()}>Stop</button>
          </div>
        ))}
      </div>
    </div>
  )
}
