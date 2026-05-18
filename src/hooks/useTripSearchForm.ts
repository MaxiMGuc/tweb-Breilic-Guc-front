import { useCallback, useEffect, useState } from 'react'
import { LS_SEARCH_PREFS } from '../constants/storageKeys.ts'
import { readVersionedStorage, writeVersionedStorage } from '../utils/storage.ts'

export type TripMode = 'round' | 'oneway' | 'multi'

type SearchPrefs = {
  currency: string
  sortBy: string
}

function loadPrefs(): SearchPrefs {
  const p = readVersionedStorage<Partial<SearchPrefs>>(LS_SEARCH_PREFS, {
    expectedVersion: 1,
    fallback: {},
  })
  return {
    currency: typeof p.currency === 'string' ? p.currency : 'USD',
    sortBy: typeof p.sortBy === 'string' ? p.sortBy : 'price',
  }
}

/** Shared flight search form state (home SearchCard + /search page). */
export function useTripSearchForm() {
  const [tripMode, setTripMode] = useState<TripMode>('round')
  const [from, setFrom] = useState('Moscow')
  const [to, setTo] = useState('Istanbul')
  const [dates, setDates] = useState('28 Mar — 2 Apr')

  const [flexible, setFlexible] = useState(false)
  const [nearbyAirports, setNearbyAirports] = useState(false)
  const [directOnly, setDirectOnly] = useState(false)
  const [hotelDeals, setHotelDeals] = useState(false)

  const [currency, setCurrency] = useState(() => loadPrefs().currency)
  const [sortBy, setSortBy] = useState(() => loadPrefs().sortBy)

  useEffect(() => {
    writeVersionedStorage(LS_SEARCH_PREFS, { currency, sortBy }, { version: 1 })
  }, [currency, sortBy])

  const swapEndpoints = useCallback(() => {
    setFrom(to)
    setTo(from)
  }, [from, to])

  const buildResultsPath = useCallback(
    (opts?: { includePageOptions?: boolean; includeHotel?: boolean }) => {
      const params = new URLSearchParams()
      params.set('from', from)
      params.set('to', to)
      params.set('mode', tripMode)
      params.set('cur', currency)
      params.set('sort', sortBy)
      if (opts?.includeHotel && hotelDeals) params.set('hotel', '1')
      if (opts?.includePageOptions) {
        if (flexible) params.set('flex', '1')
        if (nearbyAirports) params.set('nearby', '1')
        if (directOnly) params.set('direct', '1')
      } else if (nearbyAirports) {
        params.set('nearby', '1')
      }
      return `/search/results?${params.toString()}`
    },
    [currency, directOnly, flexible, from, hotelDeals, nearbyAirports, sortBy, to, tripMode],
  )

  return {
    tripMode,
    setTripMode,
    from,
    setFrom,
    to,
    setTo,
    dates,
    setDates,
    flexible,
    setFlexible,
    nearbyAirports,
    setNearbyAirports,
    directOnly,
    setDirectOnly,
    hotelDeals,
    setHotelDeals,
    currency,
    setCurrency,
    sortBy,
    setSortBy,
    swapEndpoints,
    buildResultsPath,
  }
}
