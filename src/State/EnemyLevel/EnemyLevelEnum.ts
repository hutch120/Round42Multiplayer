/**
 * @preserve Copyright 2019-2021 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

/**
 * Module:          EnemyLevelEnum
 * Responsibility:  Provides a unique number for every Enemy Level Action.
 */

enum EnemyLevelEnum {
  tick,
  resetLevelState = 1000,
  setShrapnellState,
  addExplosionCenter,
  setPhaserLocations,
  clearPhaserLocations,
  setFireInterval,
  setExplosionCenters,
  addBullet,
  setBulletState,
  setTotalEnemies,
  removeEnemy,
  setEnemyLastFireTick,
  setEnemies
}

export default EnemyLevelEnum
