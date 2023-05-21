import { create } from 'zustand'

export interface IZuStore {
  hostConnected: boolean
  setHostConnected: (hostConnected: boolean) => void
  connectionCount: number
  setConnectionCount: (connectionCount: number) => void
  challengerConnected: boolean
  setChallengerConnected: (challengerConnected: boolean) => void
}

export const useStore = create<IZuStore>((set) => ({
  hostConnected: false,
  setHostConnected: (hostConnected: boolean) => set(() => ({ hostConnected })),
  connectionCount: 0,
  setConnectionCount: (connectionCount: number) => set(() => ({ connectionCount })),
  challengerConnected: false,
  setChallengerConnected: (challengerConnected: boolean) => set(() => ({ challengerConnected }))
}))
