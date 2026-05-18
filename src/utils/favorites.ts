import { LS_FAVORITES_ROUTES } from '../constants/storageKeys.ts'
import { readStorageJson, writeStorageJson } from './storage.ts'

export type FavoriteRoute = {
  id: string
  title: string
  subtitle: string
  from: string
  to: string
  addedAt: string
}

function load(): FavoriteRoute[] {
  const p = readStorageJson<unknown>(LS_FAVORITES_ROUTES, { fallback: null })
  if (p === null) return defaultFavorites()
  if (!Array.isArray(p)) return defaultFavorites()
  if (p.length === 0) return []
  return p.filter(
    (x): x is FavoriteRoute =>
      typeof x === 'object' &&
      x !== null &&
      typeof (x as FavoriteRoute).id === 'string' &&
      typeof (x as FavoriteRoute).title === 'string',
  )
}

function defaultFavorites(): FavoriteRoute[] {
  return [
    {
      id: 'seed-1',
      title: 'Istanbul',
      subtitle: 'From Moscow · tracked',
      from: 'Moscow',
      to: 'Istanbul',
      addedAt: new Date().toISOString(),
    },
    {
      id: 'seed-2',
      title: 'Dubai',
      subtitle: 'From Saint Petersburg',
      from: 'Saint Petersburg',
      to: 'Dubai',
      addedAt: new Date().toISOString(),
    },
  ]
}

function save(items: FavoriteRoute[]) {
  writeStorageJson(LS_FAVORITES_ROUTES, items)
}

export function getFavorites(): FavoriteRoute[] {
  return load()
}

export function removeFavorite(id: string) {
  save(load().filter((x) => x.id !== id))
}

export function addFavorite(from: string, to: string) {
  const f = from.trim()
  const t = to.trim()
  if (!f || !t) return
  const list = load().filter((x) => x.from.toLowerCase() !== f.toLowerCase() || x.to.toLowerCase() !== t.toLowerCase())
  const item: FavoriteRoute = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    title: t,
    subtitle: `From ${f} · tracked`,
    from: f,
    to: t,
    addedAt: new Date().toISOString(),
  }
  save([item, ...list])
}
