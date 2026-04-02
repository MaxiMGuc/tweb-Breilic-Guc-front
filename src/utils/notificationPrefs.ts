import { LS_NOTIFICATIONS } from '../constants/storageKeys.ts'

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
  try {
    const raw = localStorage.getItem(LS_NOTIFICATIONS)
    if (!raw) return { ...DEFAULT }
    const p = JSON.parse(raw) as Partial<NotificationPrefs>
    return {
      priceAlerts: typeof p.priceAlerts === 'boolean' ? p.priceAlerts : DEFAULT.priceAlerts,
      tripReminders: typeof p.tripReminders === 'boolean' ? p.tripReminders : DEFAULT.tripReminders,
      promotions: typeof p.promotions === 'boolean' ? p.promotions : DEFAULT.promotions,
    }
  } catch {
    return { ...DEFAULT }
  }
}

export function saveNotificationPrefs(data: NotificationPrefs) {
  try {
    localStorage.setItem(LS_NOTIFICATIONS, JSON.stringify(data))
  } catch {
    /* ignore */
  }
}
