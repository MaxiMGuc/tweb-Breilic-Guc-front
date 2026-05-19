// Admin: products in DB — list, create, update, delete (API).
import { useCallback, useEffect, useMemo, useState } from 'react'
import { productService, toApiError } from '../api/index.ts'
import type { ApiProductDto, ProductCreatePayload } from '../api/contracts.ts'
import { useAuth } from '../context/AuthContext.tsx'

const emptyDraft = (): ProductCreatePayload => ({
  name: '',
  description: '',
  price: 0.01,
  stock: 0,
  airline: '',
  airlineCode: '',
  route: '',
  flightDate: '',
  stops: 0,
  durationMin: 0,
})

function productToDraft(p: ApiProductDto): ProductCreatePayload {
  return {
    name: p.name,
    description: p.description ?? '',
    price: p.price,
    stock: p.stock,
    airline: p.airline ?? '',
    airlineCode: p.airlineCode ?? '',
    route: p.route ?? '',
    flightDate: p.flightDate ?? '',
    stops: p.stops ?? 0,
    durationMin: p.durationMin ?? 0,
  }
}

function AdminFlightsPage() {
  const { role } = useAuth()
  const canDeleteProduct = role === 'admin'
  const canToggleCatalog = role === 'admin'
  const [query, setQuery] = useState('')
  const [rows, setRows] = useState<ApiProductDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editorMode, setEditorMode] = useState<'idle' | 'new' | number>('idle')
  const [draft, setDraft] = useState<ProductCreatePayload>(emptyDraft)
  const [saving, setSaving] = useState(false)
  const [catalogBusyId, setCatalogBusyId] = useState<number | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const list = await productService.listAdmin()
      setRows(list)
    } catch (e) {
      setError(toApiError(e).message)
      setRows([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.route ?? '').toLowerCase().includes(q) ||
        (p.airline ?? '').toLowerCase().includes(q) ||
        String(p.id).includes(q),
    )
  }, [query, rows])

  const openNew = () => {
    setEditorMode('new')
    setDraft(emptyDraft())
  }

  const openEdit = (p: ApiProductDto) => {
    setEditorMode(p.id)
    setDraft(productToDraft(p))
  }

  const closeEditor = () => {
    setEditorMode('idle')
    setDraft(emptyDraft())
  }

  const save = async () => {
    if (!draft.name.trim()) {
      setError('Name is required.')
      return
    }
    if (draft.price < 0.01) {
      setError('Price must be at least 0.01.')
      return
    }
    setSaving(true)
    setError(null)
    try {
      if (editorMode === 'new') {
        await productService.create(draft)
      } else if (typeof editorMode === 'number') {
        const existing = rows.find((r) => r.id === editorMode)
        const payload: ApiProductDto = {
          id: editorMode,
          ...draft,
          inStock: existing?.inStock ?? draft.stock > 0,
          isActive: existing?.isActive ?? true,
        }
        await productService.update(editorMode, payload)
      }
      closeEditor()
      await load()
    } catch (e) {
      setError(toApiError(e).message)
    } finally {
      setSaving(false)
    }
  }

  const toggleCatalog = async (p: ApiProductDto, next: boolean) => {
    setError(null)
    setCatalogBusyId(p.id)
    try {
      await productService.setActive(p.id, next)
      if (editorMode === p.id) {
        const updated = rows.map((r) => (r.id === p.id ? { ...r, isActive: next } : r))
        const cur = updated.find((r) => r.id === p.id)
        if (cur) setDraft(productToDraft(cur))
      }
      await load()
    } catch (e) {
      setError(toApiError(e).message)
    } finally {
      setCatalogBusyId(null)
    }
  }

  const remove = async (p: ApiProductDto) => {
    if (!window.confirm(`Delete product #${p.id} “${p.name}”?`)) return
    setError(null)
    try {
      await productService.remove(p.id)
      if (editorMode === p.id) closeEditor()
      await load()
    } catch (e) {
      setError(toApiError(e).message)
    }
  }

  return (
    <>
      <header className="page-header">
        <h2 className="page-title" style={{ fontSize: '1.35rem' }}>
          Products (flights)
        </h2>
        <p className="page-lead">
          Manage catalog rows. “Hidden” flights do not appear in public search. Admin can hide/show or delete products.
        </p>
      </header>

      {error ? <p className="page-muted">{error}</p> : null}
      {loading ? <p className="page-muted">Loading…</p> : null}

      <div className="admin-toolbar">
        <input
          type="search"
          className="search-input-wide"
          placeholder="Search by name, route, airline, id…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Filter products"
        />
        <button type="button" className="primary-button" onClick={openNew} disabled={editorMode !== 'idle'}>
          Add product
        </button>
        <button type="button" className="ghost-button" onClick={() => void load()}>
          Refresh
        </button>
      </div>

      {editorMode !== 'idle' ? (
        <div className="admin-editor" style={{ marginBottom: 16 }}>
          <h3 className="page-title" style={{ fontSize: '1.1rem' }}>
            {editorMode === 'new' ? 'New product' : `Edit product #${editorMode}`}
          </h3>
          <div className="admin-form-grid">
            <label className="field-block">
              <span>Name</span>
              <input
                value={draft.name}
                onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
              />
            </label>
            <label className="field-block">
              <span>Route</span>
              <input
                value={draft.route}
                onChange={(e) => setDraft((d) => ({ ...d, route: e.target.value }))}
              />
            </label>
            <label className="field-block">
              <span>Airline</span>
              <input
                value={draft.airline}
                onChange={(e) => setDraft((d) => ({ ...d, airline: e.target.value }))}
              />
            </label>
            <label className="field-block">
              <span>Airline code</span>
              <input
                value={draft.airlineCode}
                onChange={(e) => setDraft((d) => ({ ...d, airlineCode: e.target.value }))}
              />
            </label>
            <label className="field-block">
              <span>Flight date (text)</span>
              <input
                value={draft.flightDate}
                onChange={(e) => setDraft((d) => ({ ...d, flightDate: e.target.value }))}
              />
            </label>
            <label className="field-block">
              <span>Price</span>
              <input
                type="number"
                step="0.01"
                min={0.01}
                value={draft.price}
                onChange={(e) => setDraft((d) => ({ ...d, price: Number(e.target.value) }))}
              />
            </label>
            <label className="field-block">
              <span>Stock</span>
              <input
                type="number"
                min={0}
                value={draft.stock}
                onChange={(e) => setDraft((d) => ({ ...d, stock: Number(e.target.value) }))}
              />
            </label>
            <label className="field-block">
              <span>Stops</span>
              <input
                type="number"
                min={0}
                value={draft.stops}
                onChange={(e) => setDraft((d) => ({ ...d, stops: Number(e.target.value) }))}
              />
            </label>
            <label className="field-block">
              <span>Duration (min)</span>
              <input
                type="number"
                min={0}
                value={draft.durationMin}
                onChange={(e) => setDraft((d) => ({ ...d, durationMin: Number(e.target.value) }))}
              />
            </label>
            <label className="field-block" style={{ gridColumn: '1 / -1' }}>
              <span>Description</span>
              <textarea
                rows={2}
                value={draft.description}
                onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
              />
            </label>
          </div>
          <div className="admin-toolbar" style={{ marginTop: 12 }}>
            <button type="button" className="primary-button" onClick={() => void save()} disabled={saving}>
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button type="button" className="text-button" onClick={closeEditor} disabled={saving}>
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Route</th>
              <th>Airline</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Catalog</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && !loading ? (
              <tr>
                <td colSpan={8} className="page-muted">
                  {query ? `No products match “${query}”.` : 'No products yet. Add one above.'}
                </td>
              </tr>
            ) : null}
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.route}</td>
                <td>{p.airline}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <span className={p.isActive ? 'badge success' : 'badge'}>
                    {p.isActive ? 'Active' : 'Hidden'}
                  </span>
                  {canToggleCatalog ? (
                    <>
                      {' '}
                      <button
                        type="button"
                        className="text-button"
                        disabled={catalogBusyId === p.id}
                        onClick={() => void toggleCatalog(p, !p.isActive)}
                      >
                        {p.isActive ? 'Hide' : 'Show'}
                      </button>
                    </>
                  ) : null}
                </td>
                <td>
                  <button
                    type="button"
                    className="text-button"
                    onClick={() => openEdit(p)}
                    disabled={editorMode !== 'idle'}
                  >
                    Edit
                  </button>
                  {canDeleteProduct ? (
                    <>
                      {' '}
                      <button type="button" className="text-button" onClick={() => void remove(p)}>
                        Delete
                      </button>
                    </>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AdminFlightsPage
