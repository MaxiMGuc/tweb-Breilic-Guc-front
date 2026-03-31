import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

export type TripMode = 'round' | 'oneway' | 'multi'

export type SelectedOffer = {
  ticketId: string
  routeLabel: string
  priceFrom: number
  currency: string
  airline?: string
}

type BookingContextValue = {
  selectedOffer: SelectedOffer | null
  setSelectedOffer: (offer: SelectedOffer | null) => void
  /** Path (+ optional search) to return from booking overview to results */
  searchResultsReturnPath: string
  setSearchResultsReturnPath: (path: string) => void
  baggageOption: 'standard' | 'plus'
  setBaggageOption: (v: 'standard' | 'plus') => void
  baggageExtraUsd: number
}

const BookingContext = createContext<BookingContextValue | null>(null)

const EXTRA_BAG_USD = 45

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedOffer, setSelectedOffer] = useState<SelectedOffer | null>(null)
  const [searchResultsReturnPath, setSearchResultsReturnPath] = useState('/search/results')
  const [baggageOption, setBaggageOption] = useState<'standard' | 'plus'>('standard')

  const baggageExtraUsd = baggageOption === 'plus' ? EXTRA_BAG_USD : 0

  const value = useMemo(
    () => ({
      selectedOffer,
      setSelectedOffer,
      searchResultsReturnPath,
      setSearchResultsReturnPath,
      baggageOption,
      setBaggageOption,
      baggageExtraUsd,
    }),
    [
      selectedOffer,
      searchResultsReturnPath,
      baggageOption,
      baggageExtraUsd,
    ],
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext)
  if (!ctx) {
    throw new Error('useBooking must be used within BookingProvider')
  }
  return ctx
}

export function useBookingOptional(): BookingContextValue | null {
  return useContext(BookingContext)
}
