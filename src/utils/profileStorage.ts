import { LS_PROFILE } from '../constants/storageKeys.ts'

export type ProfileData = {
  displayName: string
  phone: string
  currency: string
  language: string
}

const DEFAULT: ProfileData = {
  displayName: '',
  phone: '',
  currency: 'USD',
  language: 'en',
}

export function loadProfile(): ProfileData {
  try {
    const raw = localStorage.getItem(LS_PROFILE)
    if (!raw) return { ...DEFAULT }
    const p = JSON.parse(raw) as Partial<ProfileData>
    return {
      displayName: typeof p.displayName === 'string' ? p.displayName : '',
      phone: typeof p.phone === 'string' ? p.phone : '',
      currency: typeof p.currency === 'string' ? p.currency : 'USD',
      language: typeof p.language === 'string' ? p.language : 'en',
    }
  } catch {
    return { ...DEFAULT }
  }
}

export function saveProfile(data: ProfileData) {
  try {
    localStorage.setItem(LS_PROFILE, JSON.stringify(data))
  } catch {
    /* ignore */
  }
}
