import { LS_SEARCH_HISTORY } from '../constants/storageKeys.ts'
import { readStorageJson, writeStorageJson } from './storage.ts'

export type SearchHistoryItem = {
  id: string
  label: string
  from: string
  to: string
  at: string
}

function load(): SearchHistoryItem[] {
  const p = readStorageJson<unknown>(LS_SEARCH_HISTORY, { fallback: [] })
  if (!Array.isArray(p)) return []
  return p.filter(
    (x): x is SearchHistoryItem =>
      typeof x === 'object' &&
      x !== null &&
      typeof (x as SearchHistoryItem).id === 'string' &&
      typeof (x as SearchHistoryItem).from === 'string' &&
      typeof (x as SearchHistoryItem).to === 'string',
  )
}

function save(items: SearchHistoryItem[]) {
  writeStorageJson(LS_SEARCH_HISTORY, items.slice(0, 20))
}

/** Append a search to local history (client-only, Executor B / T44). */
export function appendSearchHistory(from: string, to: string) {
  const f = from.trim()
  const t = to.trim()
  if (!f || !t) return
  const label = `${f} → ${t}`
  const item: SearchHistoryItem = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    label,
    from: f,
    to: t,
    at: new Date().toISOString(),
  }
  const prev = load().filter((x) => x.from !== f || x.to !== t)
  save([item, ...prev])
}

export function getSearchHistory(): SearchHistoryItem[] {
  return load()
}
