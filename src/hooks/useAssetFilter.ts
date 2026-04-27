import { useEffect, useMemo, useState } from 'react'
import type { Asset, AssetType, AssetStatus } from '../types/asset'

export type TypeFilter = AssetType | 'all'
export type StatusFilter = AssetStatus | 'all'
export type SortOption = 'name-asc' | 'name-desc' | 'date-new' | 'date-old'

const TYPE_VALUES: TypeFilter[] = ['all', 'image', 'video', 'audio', 'document']
const STATUS_VALUES: StatusFilter[] = ['all', 'active', 'draft', 'archived']
const SORT_VALUES: SortOption[] = ['name-asc', 'name-desc', 'date-new', 'date-old']

function readParam<T extends string>(key: string, allowed: T[], fallback: T): T {
  const val = new URLSearchParams(window.location.search).get(key)
  return val && (allowed as string[]).includes(val) ? (val as T) : fallback
}

export function useAssetFilter(assets: Asset[]) {
  const [query, setQuery] = useState(() => new URLSearchParams(window.location.search).get('q') ?? '')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>(() => readParam('type', TYPE_VALUES, 'all'))
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(() => readParam('status', STATUS_VALUES, 'all'))
  const [sort, setSort] = useState<SortOption>(() => readParam('sort', SORT_VALUES, 'date-new'))

  // Keep URL in sync whenever filter state changes
  useEffect(() => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (typeFilter !== 'all') params.set('type', typeFilter)
    if (statusFilter !== 'all') params.set('status', statusFilter)
    if (sort !== 'date-new') params.set('sort', sort)
    const qs = params.toString()
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname)
  }, [query, typeFilter, statusFilter, sort])

  const filtered = useMemo(() => {
    const result = assets.filter((asset) => {
      const matchesQuery = asset.name.toLowerCase().includes(query.toLowerCase())
      const matchesType = typeFilter === 'all' || asset.type === typeFilter
      const matchesStatus = statusFilter === 'all' || asset.status === statusFilter
      return matchesQuery && matchesType && matchesStatus
    })

    return result.sort((a, b) => {
      switch (sort) {
        case 'name-asc':  return a.name.localeCompare(b.name)
        case 'name-desc': return b.name.localeCompare(a.name)
        case 'date-new':  return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        case 'date-old':  return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
      }
    })
  }, [assets, query, typeFilter, statusFilter, sort])

  return {
    filtered,
    query,        setQuery,
    typeFilter,   setTypeFilter,
    statusFilter, setStatusFilter,
    sort,         setSort,
  }
}
