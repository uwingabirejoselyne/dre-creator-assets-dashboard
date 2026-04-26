import { useMemo, useState } from 'react'
import type { Asset, AssetType, AssetStatus } from '../types/asset'

export type TypeFilter = AssetType | 'all'
export type StatusFilter = AssetStatus | 'all'

export function useAssetFilter(assets: Asset[]) {
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const filtered = useMemo(() => {
    return assets.filter((asset) => {
      const matchesQuery = asset.name.toLowerCase().includes(query.toLowerCase())
      const matchesType = typeFilter === 'all' || asset.type === typeFilter
      const matchesStatus = statusFilter === 'all' || asset.status === statusFilter
      return matchesQuery && matchesType && matchesStatus
    })
  }, [assets, query, typeFilter, statusFilter])

  return {
    filtered,
    query,
    setQuery,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
  }
}
