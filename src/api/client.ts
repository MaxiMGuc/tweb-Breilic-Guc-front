import { ApiError } from './errors.ts'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type RequestOptions<TBody> = {
  method?: HttpMethod
  body?: TBody
  headers?: Record<string, string>
  signal?: AbortSignal
  timeoutMs?: number
}

export type ApiClientConfig = {
  baseUrl?: string
  defaultTimeoutMs?: number
}

export class ApiClient {
  private readonly baseUrl: string
  private readonly defaultTimeoutMs: number

  constructor(config: ApiClientConfig = {}) {
    this.baseUrl = config.baseUrl ?? ''
    this.defaultTimeoutMs = config.defaultTimeoutMs ?? 10000
  }

  async request<TResponse, TBody = unknown>(
    path: string,
    options: RequestOptions<TBody> = {},
  ): Promise<TResponse> {
    const method = options.method ?? 'GET'
    const controller = new AbortController()
    const timeoutMs = options.timeoutMs ?? this.defaultTimeoutMs
    const timeout = window.setTimeout(() => controller.abort(), timeoutMs)
    const externalSignal = options.signal
    const signal = controller.signal
    const onExternalAbort = () => controller.abort()
    if (externalSignal) {
      if (externalSignal.aborted) {
        controller.abort()
      } else {
        externalSignal.addEventListener('abort', onExternalAbort, { once: true })
      }
    }

    try {
      const res = await fetch(`${this.baseUrl}${path}`, {
        method,
        signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      })

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new ApiError(`Request failed with status ${res.status}`, 'HTTP', {
          status: res.status,
          details: text,
        })
      }

      if (res.status === 204) {
        return undefined as TResponse
      }

      return (await res.json()) as TResponse
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new ApiError('Request timed out or was aborted', 'TIMEOUT')
      }
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError('Network request failed', 'NETWORK', { details: error })
    } finally {
      window.clearTimeout(timeout)
      if (externalSignal) {
        externalSignal.removeEventListener('abort', onExternalAbort)
      }
    }
  }
}

export const apiClient = new ApiClient()
