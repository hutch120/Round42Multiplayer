import { Howl } from 'howler'
import * as Sounds from './Sounds'
import * as SoundSprites from './SoundSprites'

/**
 * Volume for all sounds.
 */
const volume = 0.1

/**
 * Howl objects for explosion.
 */
export const enemyExplosions = Sounds.EnemyExplosions.map((src) => new Howl({ src, volume }))

/**
 * Howl for the player bullet
 */
export const playerBullet = new Howl({ src: Sounds.Player.Shoot, volume })

/**
 * Howl objects for phasers.
 */
export const phasers = Sounds.Phasers.map((src) => new Howl({ src, volume }))

/**
 * Sound for the player's explosion.
 */
export const playerExplosions = Sounds.PlayerExplosions.map((src) => new Howl({ src, volume }))

/**
 * Sound for a fast formation.
 */
export const playerFormationFast = new Howl({ src: Sounds.Player.FormationFast, volume })

/**
 * Sound for a slow formation.
 */
export const playerFormationSlow = new Howl({ src: Sounds.Player.FormationSlow, volume })

/**
 * Sounds while travelin through a warp gate.
 */
export const warpGateTraveling = new Howl({ src: Sounds.Player.WarpGate, loop: true, volume })

/**
 * Sound played the player reached the end of a warp level.
 */
export const warpLevelEnd = new Howl({ src: [Sounds.Player.WarpLevelEnd], volume })

/**
 * Sound while playing an astreroid or space monster level.
 */
export const falling = new Howl({ src: Sounds.Falling.Falling, loop: true, volume })

/**
 * Sounds for birds, spinners, diabolo's, etc.
 */
export const tjirping = Sounds.Tjirping.map((src, index) =>
  createSpriteHowl(src, index, SoundSprites.Tjirping)
)

/**
 * Sounds for orbs, robots, etc.
 */
export const whoping = Sounds.Whoping.map((src, index) =>
  createSpriteHowl(src, index, SoundSprites.Whoping)
)

/**
 * Sounds for balloons, bats, etc.
 */
export const wizzing = Sounds.Wizzing.map((src, index) =>
  createSpriteHowl(src, index, SoundSprites.Wizzing)
)

/**
 * Music. Player on round 13 and round 42.
 */
export const music = new Howl({ src: Sounds.Music.Music, volume })

/**
 * Create Sprite Howl.
 * @param {string} src. Base 64 incoded ogg.
 * @param {number} index. Index of the howl.
 * @param {SoundSprite[][]} sprites. An array with SoundSprite arrays.
 */
function createSpriteHowl(src: string, index: number, sprites: number[][]): Howl {
  const sprite = sprites[index]
  return new Howl({
    src,
    sprite: {
      play: [sprite[0], sprite[1]]
    },
    loop: true,
    volume
  })
}
