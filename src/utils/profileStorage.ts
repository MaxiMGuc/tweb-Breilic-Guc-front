import { LS_PROFILE } from '../constants/storageKeys.ts'
import { readStorageJson, writeStorageJson } from './storage.ts'

export type ProfileData = {
  displayName: string
  phone: string
  currency: string
  language: string
}

export function loadProfile(): ProfileData {
  const p = readStorageJson<Partial<ProfileData>>(LS_PROFILE, { fallback: {} })
  return {
    displayName: typeof p.displayName === 'string' ? p.displayName : '',
    phone: typeof p.phone === 'string' ? p.phone : '',
    currency: typeof p.currency === 'string' ? p.currency : 'USD',
    language: typeof p.language === 'string' ? p.language : 'en',
  }
}

export function saveProfile(data: ProfileData) {
  writeStorageJson(LS_PROFILE, data)
}
