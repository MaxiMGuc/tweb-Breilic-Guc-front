import { LS_FAVORITES_ROUTES } from '../constants/storageKeys.ts'

export type FavoriteRoute = {
  id: string
  title: string
  subtitle: string
  from: string
  to: string
  addedAt: string
}

function load(): FavoriteRoute[] {
  try {
    const raw = localStorage.getItem(LS_FAVORITES_ROUTES)
    if (raw === null) return defaultFavorites()
    const p = JSON.parse(raw) as unknown
    if (!Array.isArray(p)) return defaultFavorites()
    if (p.length === 0) return []
    return p.filter(
      (x): x is FavoriteRoute =>
        typeof x === 'object' &&
        x !== null &&
        typeof (x as FavoriteRoute).id === 'string' &&
        typeof (x as FavoriteRoute).title === 'string',
    )
  } catch {
    return defaultFavorites()
  }
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
  try {
    localStorage.setItem(LS_FAVORITES_ROUTES, JSON.stringify(items))
  } catch {
    /* ignore */
  }
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
