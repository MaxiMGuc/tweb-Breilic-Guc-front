import { LS_NOTIFICATIONS } from '../constants/storageKeys.ts'
import { readStorageJson, writeStorageJson } from './storage.ts'

export type NotificationPrefs = {
  priceAlerts: boolean
  tripReminders: boolean
  promotions: boolean
}

const DEFAULT: NotificationPrefs = {
  priceAlerts: true,
  tripReminders: true,
  promotions: false,
}

export function loadNotificationPrefs(): NotificationPrefs {
  const p = readStorageJson<Partial<NotificationPrefs>>(LS_NOTIFICATIONS, { fallback: {} })
  return {
    priceAlerts: typeof p.priceAlerts === 'boolean' ? p.priceAlerts : DEFAULT.priceAlerts,
    tripReminders: typeof p.tripReminders === 'boolean' ? p.tripReminders : DEFAULT.tripReminders,
    promotions: typeof p.promotions === 'boolean' ? p.promotions : DEFAULT.promotions,
  }
}

export function saveNotificationPrefs(data: NotificationPrefs) {
  writeStorageJson(LS_NOTIFICATIONS, data)
}
