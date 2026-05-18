import { describe, expect, it } from 'vitest'
import {
  readStorageJson,
  readVersionedStorage,
  removeStorageKey,
  writeStorageJson,
  writeVersionedStorage,
} from './storage.ts'

describe('storage adapter', () => {
  it('writes and reads plain JSON values', () => {
    writeStorageJson('plain-key', { foo: 'bar' })
    const value = readStorageJson<{ foo: string }>('plain-key', { fallback: { foo: 'fallback' } })
    expect(value.foo).toBe('bar')
    removeStorageKey('plain-key')
  })

  it('returns fallback for version mismatch', () => {
    writeVersionedStorage('versioned-key', { flag: true }, { version: 2 })
    const value = readVersionedStorage<{ flag: boolean }>('versioned-key', {
      expectedVersion: 1,
      fallback: { flag: false },
    })
    expect(value.flag).toBe(false)
  })

  it('returns fallback for expired values', () => {
    writeVersionedStorage('ttl-key', { active: true }, { version: 1, ttlMs: -1 })
    const value = readVersionedStorage<{ active: boolean }>('ttl-key', {
      expectedVersion: 1,
      fallback: { active: false },
    })
    expect(value.active).toBe(false)
  })
})
