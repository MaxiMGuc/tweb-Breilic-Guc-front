export { ApiClient, apiClient } from './client.ts'
export { ApiError, toApiError, type ApiErrorCode } from './errors.ts'
export type {
  AdminBookingsQuery,
  AdminService,
  SearchService,
  SearchTicketsQuery,
  TripsQuery,
  TripsService,
} from './contracts.ts'
export { adminService, searchService, tripsService } from './services/index.ts'
